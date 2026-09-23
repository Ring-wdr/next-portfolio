import {
  APICallError,
  RetryError,
  type FinishReason,
  type UIMessageChunk,
} from "ai";
import { localizePath, type AppLocale } from "@/shared/constant/site";
import { buildLinkSpec, extractProjectLinks } from "./project-links";
import { WIKI } from "./wiki";

export const SYSTEM_PROMPT = `당신은 Kim Manjoong 포트폴리오의 AI 어시스턴트입니다.
반드시 아래 [지식 베이스]에 있는 정보만 바탕으로 답변하세요.
지식 베이스에 없는 내용은 추측하거나 만들어내지 말고, "해당 정보는 확인하기 어렵습니다"라고 솔직하게 답하세요.

[지식 베이스]
${WIKI}

[규칙]
- 커리어·기술·포트폴리오 사이트 외 주제(코드 작성 요청, 시사, 다른 사람에 대한 질문 등)는 "이 챗봇은 Kim Manjoong의 커리어와 기술 스택에 관한 질문만 답변할 수 있습니다"로 거절
- "이 페이지는 어떻게 만들어졌어?", "이 사이트 어떻게 만든 거야?" 같은 포트폴리오 사이트 제작 방식 질문은 [지식 베이스]의 "포트폴리오 웹사이트" 섹션을 바탕으로 친절하게 답변
- CSS 프레임워크 선호를 설명할 때는 한 프로젝트에서 여러 CSS 프레임워크를 조합한다고 권장하거나 암시하지 말고, 프로젝트 성격에 맞는 하나의 주 스타일링 체계를 선택하는 선호로 답변
- 질문이 한국어면 한국어로, 영어면 영어로 답변
- **bold**, *italic*, # 제목, \`코드\` 등 마크다운 문법 사용 금지. 일반 텍스트로만 작성.`;

// Free model IDs churn on OpenRouter; override with OPENROUTER_FREE_MODELS
// (comma-separated, first = primary). OpenRouter tries them in order.
export const DEFAULT_FREE_MODELS = [
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "google/gemma-4-31b-it:free",
] as const;

const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 2000;

export const NO_TEXT_CONTENT_ERROR = "No text content generated.";
const STREAM_FAILED_ERROR = "Failed to stream response.";

export function resolveFreeModels(raw: string | undefined): string[] {
  const models = (raw ?? "")
    .split(",")
    .map((m) => m.trim())
    .filter((m) => m.length > 0);
  return models.length > 0 ? models : [...DEFAULT_FREE_MODELS];
}

type UIMessagePartLike = { type: string; text?: string };
export type UIMessageLike = {
  role: string;
  parts?: UIMessagePartLike[];
  content?: string;
};
export type CoreMessage = {
  role: "user" | "assistant";
  content: string;
};

export function toCoreMessages(messages: UIMessageLike[]): CoreMessage[] {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => {
      let content = "";
      if (typeof m.content === "string") {
        content = m.content;
      } else if (Array.isArray(m.parts)) {
        content = m.parts
          .filter((p) => p.type === "text" && typeof p.text === "string")
          .map((p) => p.text ?? "")
          .join("\n\n")
          .trim();
      }
      return {
        role: m.role as "user" | "assistant",
        content: content.slice(0, MAX_MESSAGE_LENGTH),
      };
    })
    .filter((m) => m.content.length > 0)
    .slice(-MAX_HISTORY_MESSAGES);
}

export function detectLocale(text: string): AppLocale {
  return /[ㄱ-ㆎ가-힣]/.test(text) ? "ko" : "en";
}

// Rate limit (429) plus provider-side failures a visitor can't fix:
// expired key, no credits, retired free model, upstream outage.
const UNAVAILABLE_STATUS_CODES = new Set([401, 402, 403, 404, 429, 502, 503]);

/** True when no model can answer right now, so the static fallback should be served. */
export function isProviderUnavailable(error: unknown): boolean {
  if (RetryError.isInstance(error)) {
    return isProviderUnavailable(error.lastError);
  }
  if (APICallError.isInstance(error)) {
    return (
      error.statusCode != null && UNAVAILABLE_STATUS_CODES.has(error.statusCode)
    );
  }
  return error instanceof Error && /rate limit/i.test(error.message);
}

const FALLBACK_TEXT: Record<AppLocale, string> = {
  ko: "지금은 AI 답변을 드릴 수 없어요. 무료 모델의 일일 한도를 모두 사용했거나 일시적으로 제한된 상태예요. 아래 링크에서 프로젝트와 소개를 바로 확인하실 수 있어요.",
  en: "AI answers are unavailable right now — the free model quota is used up or temporarily limited. You can browse the projects and profile directly from the links below.",
};

const FALLBACK_PAGE_LABELS: Record<AppLocale, { project: string; about: string }> = {
  ko: { project: "프로젝트", about: "소개" },
  en: { project: "Projects", about: "About" },
};

/** Static answer used when no model can respond, so the chat never dead-ends. */
export function* fallbackChunks(
  question: string,
  textId: string,
): Generator<UIMessageChunk> {
  const locale = detectLocale(question);
  const projectLinks = extractProjectLinks(question);
  const labels = FALLBACK_PAGE_LABELS[locale];
  const links =
    projectLinks.length > 0
      ? projectLinks
      : [
          { label: labels.project, url: localizePath(locale, "/project") },
          { label: labels.about, url: localizePath(locale, "/about") },
        ];

  yield { type: "start" };
  yield { type: "text-start", id: textId };
  yield { type: "text-delta", id: textId, delta: FALLBACK_TEXT[locale] };
  yield { type: "text-end", id: textId };
  yield {
    type: "data-spec",
    data: { type: "flat", spec: buildLinkSpec(links) },
  };
  yield { type: "finish", finishReason: "other" };
}

type FullStreamPart = { type: string; [key: string]: unknown };
export type StreamTextResultLike = {
  fullStream: AsyncIterable<FullStreamPart>;
};

function toErrorText(error: unknown): string {
  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }
  if (typeof error === "string" && error.length > 0) {
    return error;
  }
  return STREAM_FAILED_ERROR;
}

export async function* streamResultToUiChunks(
  result: StreamTextResultLike,
  textId: string,
  question: string,
): AsyncGenerator<UIMessageChunk> {
  let hasVisibleText = false;
  let textPartOpen = false;
  let fullText = "";
  let finishReason: FinishReason | undefined;

  try {
    for await (const chunk of result.fullStream) {
      switch (chunk.type) {
        case "text-delta": {
          const delta = typeof chunk.text === "string" ? chunk.text : "";
          if (delta.length === 0) break;

          if (!textPartOpen) {
            textPartOpen = true;
            yield { type: "start" };
            yield { type: "text-start", id: textId };
          }

          hasVisibleText = true;
          fullText += delta;
          yield { type: "text-delta", id: textId, delta };
          break;
        }
        case "finish": {
          if (typeof chunk.finishReason === "string") {
            finishReason = chunk.finishReason as FinishReason;
          }
          break;
        }
        case "abort": {
          const reason =
            typeof chunk.reason === "string" && chunk.reason.length > 0
              ? chunk.reason
              : STREAM_FAILED_ERROR;
          throw new Error(reason);
        }
        case "error": {
          throw chunk.error;
        }
        default:
          break;
      }
    }

    if (!hasVisibleText) {
      throw new Error(NO_TEXT_CONTENT_ERROR);
    }

    yield { type: "text-end", id: textId };

    const links = extractProjectLinks(fullText);
    if (links.length > 0) {
      yield {
        type: "data-spec",
        data: { type: "flat", spec: buildLinkSpec(links) },
      };
    }

    yield finishReason == null
      ? { type: "finish" }
      : { type: "finish", finishReason };
  } catch (error) {
    if (!hasVisibleText && isProviderUnavailable(error)) {
      console.error("[chat] provider unavailable, serving fallback:", error);
      yield* fallbackChunks(question, textId);
      return;
    }

    if (textPartOpen) {
      yield { type: "text-end", id: textId };
    }
    yield { type: "error", errorText: toErrorText(error) };
  }
}
