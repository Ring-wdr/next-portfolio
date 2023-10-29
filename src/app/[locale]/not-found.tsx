import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("not-found");
  return (
    <div className="d-flex flex-column justify-cc align-ic mt-3">
      <h2 className="mb-3 font-20">{t("title")}</h2>
      <i
        className="ri-error-warning-fill mb-2"
        style={{ fontSize: "10rem" }}
      ></i>
      <p>{t("content")}</p>
    </div>
  );
}
