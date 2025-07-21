"use server";

import { SendMailOptions, createTransport } from "nodemailer";
import { render } from "@react-email/components";
import { ContactEmail } from "../template/contact-email";
import { env } from "@/env";

const { NEXT_MAIL_ADDRESS: user, NEXT_APP_PASSWORD: pass } = env;

export type MailSendType = {
  type: boolean;
  message: string;
} | null;

export const sendEmail = async (
  _: MailSendType,
  data: FormData
): Promise<MailSendType> => {
  const { userName, content } = Object.fromEntries(data) as {
    userName: string;
    content: string;
  };
  if (!userName || !content)
    return { type: false, message: "이름과 내용을 입력해주세요." };
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions: SendMailOptions = {
      from: user,
      to: user,
      subject: "포트폴리오를 통해 보낸 메일입니다.",
      html: await render(ContactEmail({ userName, content })),
    };

    const result = await transporter.sendMail(mailOptions);
    if (result.accepted.length > 0) {
      return { type: true, message: "메일이 성공적으로 전송되었습니다." };
    }
    return {
      type: false,
      message: "메일 전송에 실패했습니다. 다시 시도해주세요.",
    };
  } catch (e) {
    const error = e as Error & { code?: string };
    console.error("Nodemailer error:", error);

    // EAUTH: Authentication error (e.g., wrong password)
    // ECONNECTION: Connection error (e.g., no internet)
    if (error.code === "EAUTH") {
      console.error(
        "Authentication failed. Please check your email credentials in the environment variables."
      );
    } else {
      console.error(`An error occurred with code: ${error.code}`);
    }

    return {
      type: false,
      message: "메일 전송에 실패했습니다. 다시 시도해주세요.",
    };
  }
};
