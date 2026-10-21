"use client";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { isSvgSource } from "@/shared/utils/image";

type GalleryImage = {
	src: string | StaticImageData;
	alt: string;
	caption?: string;
	source?: { label: string; url: string };
};

type ImageGalleryProps = {
	images: GalleryImage[];
};

const controlClassName =
	"flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-foreground transition-colors hover:bg-secondary";

export function ImageGallery({ images }: ImageGalleryProps) {
	const t = useTranslations("Common");
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const selected = selectedIndex === null ? null : images[selectedIndex];

	// showModal() puts the lightbox in the top layer, so ancestors with
	// transform/filter/backdrop-filter can't trap it; it also makes the page
	// inert, closes on Escape, and returns focus to the trigger on close.
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (selectedIndex !== null && !dialog.open) dialog.showModal();
		if (selectedIndex === null && dialog.open) dialog.close();
	}, [selectedIndex]);

	const step = (delta: number) =>
		setSelectedIndex((index) =>
			index === null ? index : (index + delta + images.length) % images.length,
		);

	return (
		<>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{images.map((image, index) => (
					<figure key={`${image.alt}-${index}`} className="space-y-2">
						<button
							type="button"
							onClick={() => setSelectedIndex(index)}
							aria-haspopup="dialog"
							className="group relative block aspect-16/10 w-full cursor-zoom-in overflow-hidden rounded-lg border border-border transition-colors hover:border-primary"
						>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
								unoptimized={isSvgSource(image.src)}
							/>
						</button>
						{(image.caption || image.source) && (
							<figcaption className="text-sm leading-relaxed text-muted-foreground">
								{image.caption}
								{image.source && (
									<>
										{" "}
										<a
											href={image.source.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary underline underline-offset-4"
										>
											{image.source.label}
										</a>
									</>
								)}
							</figcaption>
						)}
					</figure>
				))}
			</div>

			<dialog
				ref={dialogRef}
				aria-label={selected?.alt}
				data-testid="image-lightbox"
				onClose={() => setSelectedIndex(null)}
				onKeyDown={(event) => {
					if (images.length < 2) return;
					if (event.key === "ArrowLeft") step(-1);
					if (event.key === "ArrowRight") step(1);
				}}
				className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-background p-0 text-foreground"
			>
				{selected && (
					<div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-3 p-3 md:p-5">
						<div className="flex items-center justify-between gap-3">
							<p className="text-sm text-muted-foreground" aria-live="polite">
								{images.length > 1 && `${(selectedIndex ?? 0) + 1} / ${images.length}`}
							</p>
							<button
								type="button"
								autoFocus
								onClick={() => setSelectedIndex(null)}
								className={controlClassName}
								aria-label={t("close")}
							>
								<XIcon aria-hidden />
							</button>
						</div>

						<div className="flex min-h-0 items-center gap-2 md:gap-4">
							{images.length > 1 && (
								<button
									type="button"
									onClick={() => step(-1)}
									className={controlClassName}
									aria-label={t("previous")}
								>
									<ChevronLeftIcon aria-hidden />
								</button>
							)}
							<div className="relative h-full min-w-0 flex-1">
								<Image
									src={selected.src}
									alt={selected.alt}
									fill
									sizes="100vw"
									className="object-contain"
									unoptimized={isSvgSource(selected.src)}
								/>
							</div>
							{images.length > 1 && (
								<button
									type="button"
									onClick={() => step(1)}
									className={controlClassName}
									aria-label={t("next")}
								>
									<ChevronRightIcon aria-hidden />
								</button>
							)}
						</div>

						{(selected.caption || selected.source) && (
							<p className="mx-auto max-w-3xl text-center text-sm leading-relaxed">
								{selected.caption}
								{selected.source && (
									<>
										{" "}
										<a
											href={selected.source.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary underline underline-offset-4"
										>
											{selected.source.label}
										</a>
									</>
								)}
							</p>
						)}
					</div>
				)}
			</dialog>
		</>
	);
}
