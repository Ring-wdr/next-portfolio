"use server";

import { SendMailOptions, createTransport } from "nodemailer";
const { NEXT_MAIL_ADDRESS: user, NEXT_APP_PASSWORD: pass } = process.env;

export const sendEmail = async (_: boolean, data: FormData) => {
  const { userName, content } = Object.fromEntries(data);
  if (!userName || !content) return false;
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
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
