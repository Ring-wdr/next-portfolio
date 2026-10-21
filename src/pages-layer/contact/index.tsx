import { EmailForm } from "@/feature/mail/ui/email-form";
import { useTranslations } from "next-intl";
import { contactEmail, resumeHref } from "@/shared/constant/contact";
import { CopyEmailButton } from "./copy-email";

export function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <main className="flex flex-1 justify-center py-6 md:py-10">
      <div className="section-shell flex w-full flex-col gap-6">
        <section className="glass-panel rounded-3xl p-6 md:p-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              {t("title")}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("description")}
            </p>
          </div>
          <div
            className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/70 pt-5"
            data-testid="contact-email"
          >
            <p className="text-sm text-muted-foreground">{t("emailLabel")}</p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-base font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {contactEmail}
            </a>
            <CopyEmailButton email={contactEmail} />
            {resumeHref && (
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-foreground px-4 text-sm font-semibold text-background"
              >
                {t("resume")}
              </a>
            )}
          </div>
          <div className="mt-6">
            <EmailForm />
          </div>
        </section>
      </div>
    </main>
  );
}
