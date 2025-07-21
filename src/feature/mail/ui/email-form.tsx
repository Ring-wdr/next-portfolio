"use client";

import { useEffect, useActionState } from "react";
import { FormButton } from "@/shared/ui/form-button";
import { sendEmail } from "../action/send-mail";

export function EmailForm() {
  const [sendState, formAction, isPending] = useActionState(sendEmail, null);

  useEffect(() => {
    if (isPending) return;
    if (typeof sendState?.type === "boolean") {
      alert(sendState.message);
    }
  }, [sendState, isPending]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="userName" className="sr-only">
          Your Name
        </label>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="이름"
          required
          className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="content" className="sr-only">
          Message
        </label>
        <textarea
          name="content"
          id="content"
          placeholder="내용"
          required
          rows={5}
          className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <FormButton className="w-full" />
    </form>
  );
}
