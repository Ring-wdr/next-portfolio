import { EmailForm } from "@/feature/mail/ui/email-form";
import { useTranslations } from "next-intl";

export function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          {t("title")}
        </h2>
        <p className="text-base font-normal leading-normal pb-3 pt-1 px-4">
          {t("description")}
        </p>
        <EmailForm />
      </div>
    </div>
  );
}
