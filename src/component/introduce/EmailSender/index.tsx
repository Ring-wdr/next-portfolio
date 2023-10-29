import { FormButton } from "@/component/common/Button/FormButton";
import { useTranslations } from "next-intl";
import styles from "./index.module.css";

export default function EmailSender({ onClose }: { onClose: () => void }) {
  const t = useTranslations("mailSend");
  const sendEmail = async (data: FormData) => {
    const { userName, content } = Object.fromEntries(data);
    if (!userName || !content) return;
    const result = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        from: userName,
        content: content,
      }),
    });
    if (result.status === 200) {
      alert("전송되었습니다.");
      onClose();
    }
  };
  return (
    <div className="d-flex flex-column justify-cc mr-3 ml-3 mb-3 w-20">
      <div className={styles["email-form-container"]}>
        <h2 className="mb-1">{t("title")}</h2>
        <p>{t("title")}</p>
        <form action={sendEmail} className={styles["email-form"]}>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder={t("placeholder.userName")}
            required
          />
          <textarea
            name="content"
            id="content"
            placeholder={t("placeholder.content")}
            required
          />
          <FormButton />
        </form>
      </div>
    </div>
  );
}
