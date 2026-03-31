"use client";

import {
	layoutWithLines,
	prepareWithSegments,
	setLocale,
	walkLineRanges,
} from "@chenglou/pretext";
import { startTransition, useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/utils/classnames";

type PretextStatementProps = {
	as?: "h1" | "h2" | "p";
	className?: string;
	locale: string;
	text: string;
};

type StatementLayout = {
	lines: string[];
	width: number;
};

type PreparedSegments = ReturnType<typeof prepareWithSegments>;

function normalizeText(value: string) {
	return value.replace(/\s+/g, " ").trim();
}

function parseLineHeight(value: string, fontSize: number) {
	if (value === "normal") {
		return Math.round(fontSize * 1.08);
	}

	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : Math.round(fontSize * 1.08);
}

function measureLineCount(prepared: PreparedSegments, width: number) {
	let lineCount = 0;

	walkLineRanges(prepared, width, () => {
		lineCount += 1;
	});

	return lineCount;
}

function scoreLayout(
	width: number,
	maxWidth: number,
	lineWidths: number[],
	targetLines: number,
) {
	const widestLine = Math.max(...lineWidths);
	const shortestLine = Math.min(...lineWidths);
	const balancePenalty = lineWidths.reduce((total, lineWidth) => {
		return total + Math.abs(widestLine - lineWidth);
	}, 0);
	const lastLine = lineWidths.at(-1) ?? widestLine;
	const widowPenalty = lastLine < widestLine * 0.48 ? widestLine * 1.4 : 0;
	const widthPenalty = (maxWidth - width) * 0.18;

	return (
		balancePenalty +
		widowPenalty +
		Math.abs(lineWidths.length - targetLines) * widestLine * 0.35 +
		widthPenalty +
		(widestLine - shortestLine) * 0.4
	);
}

export function PretextStatement({
	as = "p",
	className,
	locale,
	text,
}: PretextStatementProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
	const [layout, setLayout] = useState<StatementLayout | null>(null);
	const Component = as;

	useEffect(() => {
		setLocale(locale);
	}, [locale]);

	useEffect(() => {
		let frame = 0;
		let cancelled = false;
		let observer: ResizeObserver | null = null;

		const syncLayout = async () => {
			const container = containerRef.current;
			const element = ref.current;

			if (!container || !element) {
				return;
			}

			await document.fonts.ready;

			if (cancelled || !ref.current) {
				return;
			}

			const computed = window.getComputedStyle(element);
			const maxWidth = Math.floor(container.clientWidth);
			const fontSize = Number.parseFloat(computed.fontSize);

			if (!maxWidth || !Number.isFinite(fontSize)) {
				return;
			}

			const font = computed.font;
			const lineHeight = parseLineHeight(computed.lineHeight, fontSize);
			const targetLines = maxWidth < 560 ? 4 : 3;
			const prepared = prepareWithSegments(text, font);

			const minimumWidth = Math.max(Math.round(maxWidth * 0.54), 220);
			const widths = new Set<number>([
				maxWidth,
				Math.round(maxWidth * 0.94),
				Math.round(maxWidth * 0.88),
				Math.round(maxWidth * 0.82),
				minimumWidth,
			]);

			let low = minimumWidth;
			let high = maxWidth;
			let tightWidth = maxWidth;

			while (low <= high) {
				const mid = Math.floor((low + high) / 2);
				const lineCount = measureLineCount(prepared, mid);

				if (lineCount > targetLines) {
					low = mid + 1;
				} else {
					tightWidth = mid;
					high = mid - 1;
				}
			}

			widths.add(tightWidth);
			widths.add(Math.min(maxWidth, tightWidth + 36));

			let bestLayout: StatementLayout | null = null;
			let bestScore = Number.POSITIVE_INFINITY;

			for (const candidateWidth of widths) {
				const result = layoutWithLines(prepared, candidateWidth, lineHeight);

				if (result.lineCount < 2 || result.lineCount > 5) {
					continue;
				}

				const lineWidths = result.lines.map((line) => line.width);
				const score = scoreLayout(
					candidateWidth,
					maxWidth,
					lineWidths,
					targetLines,
				);

				if (score < bestScore) {
					bestScore = score;
					bestLayout = {
						lines: result.lines.map((line) => line.text),
						width: Math.ceil(Math.max(...lineWidths)),
					};
				}
			}

			if (
				bestLayout &&
				normalizeText(bestLayout.lines.join("")) !== normalizeText(text)
			) {
				bestLayout = null;
			}

			startTransition(() => {
				setLayout(bestLayout);
			});
		};

		const schedule = () => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(() => {
				void syncLayout();
			});
		};

		schedule();

		if (containerRef.current) {
			observer = new ResizeObserver(schedule);
			observer.observe(containerRef.current);
		}

		return () => {
			cancelled = true;
			window.cancelAnimationFrame(frame);
			observer?.disconnect();
		};
	}, [locale, text]);

	return (
		<div ref={containerRef} className="max-w-full">
			<Component
				ref={ref}
				className={classNames(
					"max-w-full text-[clamp(1.85rem,4.7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-balance text-foreground",
					className,
				)}
				style={layout ? { maxWidth: `${layout.width}px` } : undefined}
			>
				{layout ? (
					layout.lines.map((line, index) => (
						<span key={`${line}-${index}`} className="block">
							{line}
						</span>
					))
				) : (
					text
				)}
			</Component>
		</div>
	);
}
