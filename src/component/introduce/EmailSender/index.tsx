import { FormEvent, useRef, useState } from "react";
import styles from "./index.module.css";

export default function EmailSender({ onClose }: { onClose: () => void }) {
  const [isLoading, setLoading] = useState(false);
  const writerRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!writerRef.current || !contentRef.current) return;
    e.preventDefault();
    setLoading(true);
    const result = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        from: writerRef.current?.value,
        content: contentRef.current?.value,
      }),
    });
    if (result.status === 200) {
      writerRef.current.value = "";
      contentRef.current.value = "";
      alert("전송되었습니다.");
      setLoading(false);
      onClose();
    }
  };
  return (
    <div className="d-flex flex-column justify-cc mr-3 ml-3 w-20">
      <div className={styles["email-form-container"]}>
        <h2 className="mb-1">Inquire Form</h2>
        <p>Asked me whatever you want to</p>
        <form onSubmit={onSubmit} className={styles["email-form"]}>
          <input
            type="text"
            name="userName"
            id="userName"
            ref={writerRef}
            placeholder="Your name or organization"
            required
          />
          <textarea
            name="content"
            id="content"
            ref={contentRef}
            placeholder="Input question about me"
            required
          />
          <button type="submit">{isLoading ? "Sending..." : "Send"}</button>
        </form>
      </div>
    </div>
  );
}
