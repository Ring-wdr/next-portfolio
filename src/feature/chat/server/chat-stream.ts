import {
  APICallError,
  RetryError,
  type FinishReason,
  type UIMessageChunk,
} from "ai";
import { localizePath, type AppLocale } from "@/shared/constant/site";
import {
  buildLinkSpec,
  buildSourceLinks,
  findMentionedProjects,
  type ProjectIndexEntry,
} from "./knowledge";

const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 2000;

export const NO_TEXT_CONTENT_ERROR = "No text content generated.";
const STREAM_FAILED_ERROR = "Failed to stream response.";

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

export type StreamOptions = {
  textId: string;
  question: string;
  locale: AppLocale;
  projectIndex: ProjectIndexEntry[];
};

/** Static answer used when no model can respond, so the chat never dead-ends. */
export function* fallbackChunks({
  question,
  textId,
  locale,
  projectIndex,
}: StreamOptions): Generator<UIMessageChunk> {
  const projects = findMentionedProjects(projectIndex, question);
  const labels = FALLBACK_PAGE_LABELS[locale];
  const links =
    projects.length > 0
      ? buildSourceLinks(projects, locale)
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
  options: StreamOptions,
): AsyncGenerator<UIMessageChunk> {
  const { textId, locale, projectIndex } = options;
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

    const projects = findMentionedProjects(projectIndex, fullText);
    if (projects.length > 0) {
      yield {
        type: "data-spec",
        data: {
          type: "flat",
          spec: buildLinkSpec(buildSourceLinks(projects, locale)),
        },
      };
    }

    yield finishReason == null
      ? { type: "finish" }
      : { type: "finish", finishReason };
  } catch (error) {
    if (!hasVisibleText && isProviderUnavailable(error)) {
      console.error("[chat] provider unavailable, serving fallback:", error);
      yield* fallbackChunks(options);
      return;
    }

    if (textPartOpen) {
      yield { type: "text-end", id: textId };
    }
    yield { type: "error", errorText: toErrorText(error) };
  }
}
