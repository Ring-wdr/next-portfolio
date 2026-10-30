"use client";

import { useActionState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FormButton } from "@/shared/ui/form-button";
import { sendEmail } from "../action/send-mail";

function RequiredMark({ label }: { label: string }) {
  return (
    <span className="ml-0.5 text-destructive">
      <span aria-hidden="true">*</span>
      <span className="sr-only">({label})</span>
    </span>
  );
}

export function EmailForm() {
  const t = useTranslations("ContactPage");
  const locale = useLocale();
  const [sendState, formAction, isPending] = useActionState(sendEmail, null);

  useEffect(() => {
    if (isPending) return;
    if (typeof sendState?.type === "boolean") {
      alert(sendState.message);
    }
  }, [sendState, isPending]);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <p className="text-xs text-muted-foreground">{t("requiredHint")}</p>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">{t("website")}</label>
        <input
          type="text"
          name="website"
          id="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="userName" className="text-sm font-bold">
            {t("name")}
            <RequiredMark label={t("required")} />
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            required
            className="w-full rounded-2xl border-2 border-transparent bg-background px-4 py-3 text-base transition-colors focus:border-primary focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="userEmail" className="text-sm font-bold">
            {t("email")}
            <RequiredMark label={t("required")} />
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            required
            className="w-full rounded-2xl border-2 border-transparent bg-background px-4 py-3 text-base transition-colors focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-bold">
            {t("company")}
          </label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder={t("companyPlaceholder")}
            autoComplete="organization"
            className="w-full rounded-2xl border-2 border-transparent bg-background px-4 py-3 text-base transition-colors focus:border-primary focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="purpose" className="text-sm font-bold">
            {t("purpose")}
          </label>
          <select
            name="purpose"
            id="purpose"
            defaultValue="job-opportunity"
            className="w-full rounded-2xl border-2 border-transparent bg-background px-4 py-3 text-base transition-colors focus:border-primary focus:outline-none"
          >
            <option value="job-opportunity">{t("purposeOptions.jobOpportunity")}</option>
            <option value="project-inquiry">{t("purposeOptions.projectInquiry")}</option>
            <option value="collaboration">{t("purposeOptions.collaboration")}</option>
            <option value="other">{t("purposeOptions.other")}</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-bold">
          {t("message")}
          <RequiredMark label={t("required")} />
        </label>
        <textarea
          name="content"
          id="content"
          placeholder={t("messagePlaceholder")}
          required
          rows={7}
          className="w-full rounded-2xl border-2 border-transparent bg-background px-4 py-3 text-base transition-colors focus:border-primary focus:outline-none"
        />
      </div>

      <p className="text-xs text-muted-foreground">{t("privacyNote")}</p>
      <FormButton className="w-full" />
    </form>
  );
}
