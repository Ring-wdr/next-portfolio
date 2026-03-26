"use server";

import {
  SendMailOptions,
  createTransport,
  getTestMessageUrl,
  type Transporter,
} from "nodemailer";
import { z } from "zod";
import { render } from "@react-email/components";
import { env } from "@/env";
import nodemailer from "nodemailer";
import { ContactEmail } from "../template/contact-email";

const { NEXT_MAIL_ADDRESS: user, NEXT_APP_PASSWORD: pass } = env;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 3;
const submissionTracker = new Map<string, number[]>();

const purposeLabels = {
  ko: {
    "job-opportunity": "채용 / 인터뷰 제안",
    "project-inquiry": "프로젝트 문의",
    collaboration: "협업 제안",
    other: "기타",
  },
  en: {
    "job-opportunity": "Job opportunity / interview",
    "project-inquiry": "Project inquiry",
    collaboration: "Collaboration",
    other: "Other",
  },
} as const;

const responseMessages = {
  ko: {
    required: "이름, 이메일, 문의 목적, 내용을 모두 입력해주세요.",
    invalid: "입력한 정보를 다시 확인해주세요.",
    rateLimited:
      "잠시 후 다시 시도해주세요. 짧은 시간에 너무 많은 요청이 접수되었습니다.",
    success: "메일이 성공적으로 전송되었습니다.",
    error: "메일 전송에 실패했습니다. 다시 시도해주세요.",
    authError:
      "메일 인증에 실패했습니다. 환경 변수에 등록한 메일 계정을 확인해주세요.",
  },
  en: {
    required: "Please provide your name, email, purpose, and message.",
    invalid: "Please review the form fields and try again.",
    rateLimited:
      "Please try again later. Too many submissions were received in a short time.",
    success: "Your message has been sent successfully.",
    error: "We couldn't send your message. Please try again.",
    authError:
      "Email authentication failed. Please check the configured mail account.",
  },
} as const;

const localeSchema = z.enum(["ko", "en"]).catch("ko");
const emailFormSchema = z.object({
  locale: localeSchema,
  userName: z.string().trim().min(2).max(60),
  userEmail: z.email(),
  company: z.string().trim().max(80).optional().or(z.literal("")),
  purpose: z.enum(["job-opportunity", "project-inquiry", "collaboration", "other"]),
  content: z.string().trim().min(10).max(2000),
  website: z.string().optional(),
});

export type MailSendType = {
  type: boolean;
  message: string;
} | null;

function isRateLimited(identifier: string) {
  const now = Date.now();
  const recentAttempts = (submissionTracker.get(identifier) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentAttempts.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    submissionTracker.set(identifier, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  submissionTracker.set(identifier, recentAttempts);
  return false;
}

export const sendEmail = async (
  _: MailSendType,
  data: FormData
): Promise<MailSendType> => {
  const rawData = Object.fromEntries(data);
  const locale = localeSchema.parse(rawData.locale);
  const messages = responseMessages[locale];

  if (typeof rawData.website === "string" && rawData.website.trim().length > 0) {
    return { type: true, message: messages.success };
  }

  const parsed = emailFormSchema.safeParse(rawData);

  if (!parsed.success) {
    const hasRequiredFieldIssue = parsed.error.issues.some(
      (issue) => issue.code === "invalid_type" || issue.code === "too_small"
    );

    return {
      type: false,
      message: hasRequiredFieldIssue ? messages.required : messages.invalid,
    };
  }

  const { userName, userEmail, company, purpose, content } = parsed.data;
  const normalizedEmail = userEmail.toLowerCase();

  if (isRateLimited(normalizedEmail)) {
    return { type: false, message: messages.rateLimited };
  }

  try {
    let transporter: Transporter;

    if (process.env.E2E_TESTING) {
      const testAccount = await nodemailer.createTestAccount();
      transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } else {
      transporter = createTransport({
        service: "gmail",
        auth: { user, pass },
      });
    }

    const mailOptions: SendMailOptions = {
      from: user,
      to: user,
      replyTo: userEmail,
      subject: `[Portfolio] ${purposeLabels[locale][purpose]} — ${userName}`,
      html: await render(
        ContactEmail({
          userName,
          userEmail,
          company: company || undefined,
          purpose: purposeLabels[locale][purpose],
          content,
        })
      ),
    };

    const result = await transporter.sendMail(mailOptions);

    if (process.env.E2E_TESTING) {
      console.log("✨ Preview URL: %s", getTestMessageUrl(result));
    }

    if (result.accepted.length > 0) {
      return { type: true, message: messages.success };
    }
    return {
      type: false,
      message: messages.error,
    };
  } catch (e) {
    const error = e as Error & { code?: string };
    console.error("Nodemailer error:", error);

    if (error.code === "EAUTH") {
      console.error(messages.authError);
    } else {
      console.error(`An error occurred with code: ${error.code}`);
    }

    return {
      type: false,
      message: messages.error,
    };
  }
};
