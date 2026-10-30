import { ArrowUpRight, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmailForm } from "@/feature/mail/ui/email-form";
import { contactEmail, resumeHref } from "@/shared/constant/contact";
import { siteConfig } from "@/shared/constant/site";
import { CopyEmailButton } from "@/shared/ui/copy-email-button";
import { GithubIcon, LinkedinIcon } from "@/shared/ui/icon/brand";

const channelClassName =
	"inline-flex min-h-11 items-center gap-2 font-bold hover:underline";

export function ContactPage() {
	const t = useTranslations("ContactPage");

	return (
		<main className="flex flex-1 flex-col">
			<section className="bg-hero-bg text-hero-fg">
				<div className="section-shell @container flex flex-col gap-6 pt-10 pb-10 md:pt-14 md:pb-14">
					<h1 className="type-display display-fit-xl">{t("title")}</h1>
					<p className="max-w-3xl text-sm leading-6 text-on-cobalt/84 md:text-base md:leading-7">
						{t("description")}
					</p>
				</div>
			</section>

			<div className="section-shell grid grid-cols-1 gap-3 pt-3 pb-14 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
				<aside
					className="flex h-fit flex-col gap-6 rounded-[2rem] bg-butter p-6 text-on-block md:p-8"
					data-testid="contact-email"
				>
					<div className="flex flex-col gap-1">
						<p className="text-sm font-bold text-on-block/64">{t("emailLabel")}</p>
						<a
							href={`mailto:${contactEmail}`}
							className="text-2xl font-extrabold tracking-[-0.03em] break-all underline-offset-4 hover:underline"
						>
							{contactEmail}
						</a>
					</div>
					<div className="flex flex-wrap gap-2">
						<CopyEmailButton email={contactEmail} />
						{resumeHref && (
							<a
								href={resumeHref}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white"
							>
								<FileText size={16} aria-hidden />
								{t("resume")}
							</a>
						)}
					</div>
					<ul className="flex flex-col border-t border-on-block/14 pt-3 text-sm">
						<li>
							<a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={channelClassName}>
								<LinkedinIcon width={16} height={16} aria-hidden />
								LinkedIn
								<ArrowUpRight size={14} aria-hidden />
							</a>
						</li>
						<li>
							<a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={channelClassName}>
								<GithubIcon width={16} height={16} aria-hidden />
								GitHub
								<ArrowUpRight size={14} aria-hidden />
							</a>
						</li>
					</ul>
				</aside>

				<section className="rounded-[2rem] bg-card p-6 md:p-8">
					<EmailForm />
				</section>
			</div>
		</main>
	);
}
