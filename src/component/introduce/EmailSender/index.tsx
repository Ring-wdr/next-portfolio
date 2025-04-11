import { useEffect, useActionState } from "react";
import { useTranslations } from "next-intl";
import { FormButton } from "@/component/common/Button/FormButton";
import { sendEmail } from "./action";
import styles from "./index.module.css";

export default function EmailSender({ onClose }: { onClose?: () => void }) {
  const t = useTranslations("mailSend");
  const [sendState, formAction] = useActionState(sendEmail, false);
  useEffect(() => {
    sendState && onClose && onClose();
  }, [sendState, onClose]);

  return (
    <div className="d-flex flex-column justify-cc mr-3 ml-3 mb-3 w-20">
      <div className={styles["email-form-container"]}>
        <h2 className="mb-1">{t("title")}</h2>
        <p>{t("title")}</p>
        <form action={formAction} className={styles["email-form"]}>
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
