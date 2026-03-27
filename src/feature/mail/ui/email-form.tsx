"use client";

import { useActionState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FormButton } from "@/shared/ui/form-button";
import { sendEmail } from "../action/send-mail";

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
          <label htmlFor="userName" className="text-sm font-medium">
            {t("name")}
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="userEmail" className="text-sm font-medium">
            {t("email")}
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            {t("company")}
          </label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder={t("companyPlaceholder")}
            autoComplete="organization"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="purpose" className="text-sm font-medium">
            {t("purpose")}
          </label>
          <select
            name="purpose"
            id="purpose"
            defaultValue="job-opportunity"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="job-opportunity">{t("purposeOptions.jobOpportunity")}</option>
            <option value="project-inquiry">{t("purposeOptions.projectInquiry")}</option>
            <option value="collaboration">{t("purposeOptions.collaboration")}</option>
            <option value="other">{t("purposeOptions.other")}</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          name="content"
          id="content"
          placeholder={t("messagePlaceholder")}
          required
          rows={7}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <p className="text-xs text-muted-foreground">{t("privacyNote")}</p>
      <FormButton className="w-full" />
    </form>
  );
}
