"use client";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

type GalleryImage = {
	src: string | StaticImageData;
	alt: string;
	caption?: string;
};

type ImageGalleryProps = {
	images: GalleryImage[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
	const t = useTranslations("Common");
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

	// Keyboard navigation
	useEffect(() => {
		if (selectedIndex === null) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeModal();
			} else if (e.key === "ArrowLeft") {
				goToPrevious();
			} else if (e.key === "ArrowRight") {
				goToNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, goToNext, goToPrevious, selectedIndex]);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (selectedIndex !== null) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [selectedIndex]);

	return (
		<>
			{/* Thumbnail Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{images.map((image, index) => (
					<button
						type="button"
						key={`${image.alt}-${index}`}
						onClick={() => openModal(index)}
						className="relative aspect-video rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer group"
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
						{image.caption && (
							<div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-sm text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
								{image.caption}
							</div>
						)}
					</button>
				))}
			</div>

			{selectedIndex !== null && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
					onClick={closeModal}
				>
					{/* Close Button */}
					<button
						type="button"
						onClick={closeModal}
						className="absolute top-4 right-4 z-10 rounded-full border border-border/70 bg-background/70 p-1.5 text-foreground transition-colors hover:bg-secondary"
						aria-label={t("close")}
					>
						<XIcon />
					</button>

					{images.length > 1 && (
						<>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									goToPrevious();
								}}
								className="absolute left-4 z-10 rounded-full border border-border/70 bg-background/70 p-1.5 text-foreground transition-colors hover:bg-secondary"
								aria-label={t("previous")}
							>
								<ChevronLeftIcon />
							</button>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									goToNext();
								}}
								className="absolute right-4 z-10 rounded-full border border-border/70 bg-background/70 p-1.5 text-foreground transition-colors hover:bg-secondary"
								aria-label={t("next")}
							>
								<ChevronRightIcon />
							</button>
						</>
					)}

					<div
						className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="relative w-full h-full">
							<Image
								src={images[selectedIndex].src}
								alt={images[selectedIndex].alt}
								fill
								sizes="100vw"
								className="object-contain"
								priority
							/>
						</div>

						{images[selectedIndex].caption && (
							<div className="absolute bottom-0 left-0 right-0 bg-background/80 p-4 text-center text-foreground backdrop-blur-sm">
								{images[selectedIndex].caption}
							</div>
						)}

						{images.length > 1 && (
							<div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm text-foreground backdrop-blur-sm">
								{selectedIndex + 1} / {images.length}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
