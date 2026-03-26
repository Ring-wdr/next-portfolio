import { EmailForm } from "@/feature/mail/ui/email-form";
import { useTranslations } from "next-intl";

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
          <div className="mt-6">
            <EmailForm />
          </div>
        </section>
      </div>
    </main>
  );
}
