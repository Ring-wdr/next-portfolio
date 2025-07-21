"use server";

import { SendMailOptions, createTransport } from "nodemailer";
import { env } from "@/env";

const { NEXT_MAIL_ADDRESS: user, NEXT_APP_PASSWORD: pass } = env;

type MailSendType = {
  type: boolean;
  message: string;
} | null;

export const sendEmail = async (
  _: MailSendType,
  data: FormData
): Promise<MailSendType> => {
  const { userName, content } = Object.fromEntries(data);
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
      html: `
    <div style="display: flex; background: #f0ece4; width: 15rem; height: 10rem; padding: 1rem; border-radius: 5px; border: 1px solid black; 
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);">
      ${userName}님이 보낸 메일입니다.<br/><br/>
      ${content}
    </div>`,
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
