"use client";

import { prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useRef } from "react";
import { classNames } from "@/shared/utils/classnames";

type HeroCanvasProps = {
	className?: string;
};

const FONT_SIZE = 14;
const LINE_HEIGHT = 16;
const TARGET_CELL_W = 8.8;
const MAX_COLS = 80;
const MAX_ROWS = 50;
const FONT_FAMILY = "Space Grotesk";
const FIELD_DECAY = 0.82;
const CHARSET =
	" .,:;!+-=*#@%&abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const WEIGHTS = [300, 500, 800] as const;
const STYLES = ["normal", "italic"] as const;
const SPRITE_R = 14;
const ATTRACTOR_R = 12;
const LARGE_ATTRACTOR_R = 30;
const ATTRACTOR_FORCE_1 = 0.22;
const ATTRACTOR_FORCE_2 = 0.05;
const BRIGHTNESS_THRESHOLD = 0.03;

type FontStyleVariant = (typeof STYLES)[number];

type PaletteEntry = {
	char: string;
	weight: number;
	style: FontStyleVariant;
	width: number;
	brightness: number;
};

type Particle = {
	x: number;
	y: number;
	vx: number;
	vy: number;
};

type FieldStamp = {
	radiusX: number;
	radiusY: number;
	sizeX: number;
	sizeY: number;
	values: Float32Array;
};

function esc(ch: string): string {
	if (ch === "<") return "&lt;";
	if (ch === ">") return "&gt;";
	if (ch === "&") return "&amp;";
	if (ch === '"') return "&quot;";
	return ch;
}

function wCls(weight: number, style: FontStyleVariant): string {
	const weightClass = weight === 300 ? "hero-w3" : weight === 500 ? "hero-w5" : "hero-w8";
	return style === "italic" ? `${weightClass} hero-it` : weightClass;
}

function spriteAlphaAt(normalizedDistance: number): number {
	if (normalizedDistance >= 1) return 0;
	if (normalizedDistance <= 0.35) return 0.45 + (0.15 - 0.45) * (normalizedDistance / 0.35);
	return 0.15 * (1 - (normalizedDistance - 0.35) / 0.65);
}

function estimateBrightness(
	ch: string,
	font: string,
	ctx: CanvasRenderingContext2D,
): number {
	const size = 28;
	ctx.clearRect(0, 0, size, size);
	ctx.font = font;
	ctx.fillStyle = "#fff";
	ctx.textBaseline = "middle";
	ctx.fillText(ch, 1, size / 2);
	const data = ctx.getImageData(0, 0, size, size).data;
	let sum = 0;
	for (let index = 3; index < data.length; index += 4) sum += data[index]!;
	return sum / (255 * size * size);
}

export function HeroCanvas({ className }: HeroCanvasProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let cancelled = false;
		let rafId = 0;
		let observer: ResizeObserver | null = null;

		const run = async () => {
			await document.fonts.ready;
			if (cancelled) return;

			// Performance gates
			const cores = navigator.hardwareConcurrency ?? 2;
			const reducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			const isMobile = container.clientWidth < 640;

			if (isMobile) {
				container.style.background = "oklch(0.10 0.014 258)";
				return;
			}

			const particleCount = cores < 4 ? 40 : 80;
			const fieldOversample = cores < 4 ? 1 : 2;

			// Compute grid dimensions
			let cols = Math.min(
				MAX_COLS,
				Math.floor(container.clientWidth / TARGET_CELL_W),
			);
			let rows = Math.min(
				MAX_ROWS,
				Math.floor(container.clientHeight / LINE_HEIGHT),
			);
			if (cols < 10 || rows < 5) return;

			const targetRowW = cols * TARGET_CELL_W;
			let fieldCols = cols * fieldOversample;
			let fieldRows = rows * fieldOversample;
			const canvasW = Math.round(targetRowW / 2);
			const canvasH = Math.round(
				canvasW * ((rows * LINE_HEIGHT) / targetRowW),
			);
			let fieldScaleX = fieldCols / canvasW;
			let fieldScaleY = fieldRows / canvasH;

			// Build brightness measurement canvas
			const brightnessCanvas = document.createElement("canvas");
			brightnessCanvas.width = 28;
			brightnessCanvas.height = 28;
			const bCtx = brightnessCanvas.getContext("2d", {
				willReadFrequently: true,
			});
			if (!bCtx) return;

			// Build palette
			const palette: PaletteEntry[] = [];
			for (const style of STYLES) {
				for (const weight of WEIGHTS) {
					const font = `${style === "italic" ? "italic " : ""}${weight} ${FONT_SIZE}px ${FONT_FAMILY}`;
					for (const ch of CHARSET) {
						if (ch === " ") continue;
						const prepared = prepareWithSegments(ch, font);
						const width =
							prepared.widths.length > 0 ? prepared.widths[0]! : 0;
						if (width <= 0) continue;
						const brightness = estimateBrightness(ch, font, bCtx);
						palette.push({ char: ch, weight, style, width, brightness });
					}
				}
			}

			const maxBrightness = Math.max(
				...palette.map((entry) => entry.brightness),
			);
			if (maxBrightness > 0) {
				for (const entry of palette) {
					entry.brightness /= maxBrightness;
				}
			}
			palette.sort((a, b) => a.brightness - b.brightness);
			const targetCellW = targetRowW / cols;

			function findBest(targetBrightness: number): PaletteEntry {
				let lo = 0;
				let hi = palette.length - 1;
				while (lo < hi) {
					const mid = (lo + hi) >> 1;
					if (palette[mid]!.brightness < targetBrightness) lo = mid + 1;
					else hi = mid;
				}
				let bestScore = Infinity;
				let best = palette[lo]!;
				const start = Math.max(0, lo - 15);
				const end = Math.min(palette.length, lo + 15);
				for (let index = start; index < end; index++) {
					const entry = palette[index]!;
					const brightnessError =
						Math.abs(entry.brightness - targetBrightness) * 2.5;
					const widthError =
						Math.abs(entry.width - targetCellW) / targetCellW;
					const score = brightnessError + widthError;
					if (score < bestScore) {
						bestScore = score;
						best = entry;
					}
				}
				return best;
			}

			// Build brightness lookup table (256 entries)
			type BrightnessEntry = { propHtml: string };
			const brightnessLookup: BrightnessEntry[] = [];
			for (let b = 0; b < 256; b++) {
				const brightness = b / 255;
				if (brightness < BRIGHTNESS_THRESHOLD) {
					brightnessLookup.push({ propHtml: " " });
					continue;
				}
				const match = findBest(brightness);
				const alphaIndex = Math.max(
					1,
					Math.min(10, Math.round(brightness * 10)),
				);
				brightnessLookup.push({
					propHtml: `<span class="${wCls(match.weight, match.style)} hero-a${alphaIndex}">${esc(match.char)}</span>`,
				});
			}

			// Create simulation canvas (hidden)
			const simCanvas = document.createElement("canvas");
			simCanvas.width = canvasW;
			simCanvas.height = canvasH;
			const sCtxMaybe = simCanvas.getContext("2d", {
				willReadFrequently: true,
			});
			if (!sCtxMaybe) return;
			const sCtx = sCtxMaybe;

			// Brightness field
			let brightnessField = new Float32Array(fieldCols * fieldRows);

			// Field stamps
			function createFieldStamp(radiusPx: number): FieldStamp {
				const fieldRadiusX = radiusPx * fieldScaleX;
				const fieldRadiusY = radiusPx * fieldScaleY;
				const radiusX = Math.ceil(fieldRadiusX);
				const radiusY = Math.ceil(fieldRadiusY);
				const sizeX = radiusX * 2 + 1;
				const sizeY = radiusY * 2 + 1;
				const values = new Float32Array(sizeX * sizeY);
				for (let y = -radiusY; y <= radiusY; y++) {
					for (let x = -radiusX; x <= radiusX; x++) {
						const normalizedDistance = Math.sqrt(
							(x / fieldRadiusX) ** 2 + (y / fieldRadiusY) ** 2,
						);
						values[(y + radiusY) * sizeX + x + radiusX] =
							spriteAlphaAt(normalizedDistance);
					}
				}
				return { radiusX, radiusY, sizeX, sizeY, values };
			}

			function splatFieldStamp(
				centerX: number,
				centerY: number,
				stamp: FieldStamp,
			): void {
				const gridCenterX = Math.round(centerX * fieldScaleX);
				const gridCenterY = Math.round(centerY * fieldScaleY);
				for (let y = -stamp.radiusY; y <= stamp.radiusY; y++) {
					const gridY = gridCenterY + y;
					if (gridY < 0 || gridY >= fieldRows) continue;
					const fieldRowOffset = gridY * fieldCols;
					const stampRowOffset = (y + stamp.radiusY) * stamp.sizeX;
					for (let x = -stamp.radiusX; x <= stamp.radiusX; x++) {
						const gridX = gridCenterX + x;
						if (gridX < 0 || gridX >= fieldCols) continue;
						const stampValue =
							stamp.values[stampRowOffset + x + stamp.radiusX]!;
						if (stampValue === 0) continue;
						const fieldIndex = fieldRowOffset + gridX;
						brightnessField[fieldIndex] = Math.min(
							1,
							brightnessField[fieldIndex]! + stampValue,
						);
					}
				}
			}

			let particleStamp = createFieldStamp(SPRITE_R);
			let largeAttractorStamp = createFieldStamp(LARGE_ATTRACTOR_R);
			let smallAttractorStamp = createFieldStamp(ATTRACTOR_R);

			// Sprite canvases for simulation
			const spriteCache = new Map<number, HTMLCanvasElement>();
			function getSpriteCanvas(radius: number): HTMLCanvasElement {
				const cached = spriteCache.get(radius);
				if (cached) return cached;
				const canvas = document.createElement("canvas");
				canvas.width = radius * 2;
				canvas.height = radius * 2;
				const ctx = canvas.getContext("2d");
				if (!ctx) return canvas;
				const gradient = ctx.createRadialGradient(
					radius, radius, 0,
					radius, radius, radius,
				);
				gradient.addColorStop(0, "rgba(255,255,255,0.45)");
				gradient.addColorStop(0.35, "rgba(255,255,255,0.15)");
				gradient.addColorStop(1, "rgba(255,255,255,0)");
				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, radius * 2, radius * 2);
				spriteCache.set(radius, canvas);
				return canvas;
			}

			// Initialize particles
			const particles: Particle[] = [];
			for (let i = 0; i < particleCount; i++) {
				const angle = Math.random() * Math.PI * 2;
				const radius = Math.random() * 40 + 20;
				particles.push({
					x: canvasW / 2 + Math.cos(angle) * radius,
					y: canvasH / 2 + Math.sin(angle) * radius,
					vx: (Math.random() - 0.5) * 0.8,
					vy: (Math.random() - 0.5) * 0.8,
				});
			}

			// Create row DOM elements
			const el = container; // narrowed reference for closures
			const rowEls: HTMLDivElement[] = [];
			function buildRows() {
				el.innerHTML = "";
				rowEls.length = 0;
				for (let row = 0; row < rows; row++) {
					const rowDiv = document.createElement("div");
					rowDiv.className = "hero-ascii-row";
					rowDiv.style.height = `${LINE_HEIGHT}px`;
					rowDiv.style.lineHeight = `${LINE_HEIGHT}px`;
					el.appendChild(rowDiv);
				}
				for (let i = 0; i < el.children.length; i++) {
					rowEls.push(el.children[i] as HTMLDivElement);
				}
			}
			buildRows();

			// Render function
			function render(now: number): void {
				if (cancelled) return;

				// Update attractor positions (orbital motion)
				const a1x = Math.cos(now * 0.0007) * canvasW * 0.25 + canvasW / 2;
				const a1y = Math.sin(now * 0.0011) * canvasH * 0.3 + canvasH / 2;
				const a2x =
					Math.cos(now * 0.0013 + Math.PI) * canvasW * 0.2 + canvasW / 2;
				const a2y =
					Math.sin(now * 0.0009 + Math.PI) * canvasH * 0.25 +
					canvasH / 2;

				// Update particle physics
				for (const particle of particles) {
					const d1x = a1x - particle.x;
					const d1y = a1y - particle.y;
					const d2x = a2x - particle.x;
					const d2y = a2y - particle.y;
					const dist1 = d1x * d1x + d1y * d1y;
					const dist2 = d2x * d2x + d2y * d2y;
					const ax = dist1 < dist2 ? d1x : d2x;
					const ay = dist1 < dist2 ? d1y : d2y;
					const dist = Math.sqrt(Math.min(dist1, dist2)) + 1;
					const force =
						dist1 < dist2 ? ATTRACTOR_FORCE_1 : ATTRACTOR_FORCE_2;

					particle.vx += (ax / dist) * force;
					particle.vy += (ay / dist) * force;
					particle.vx += (Math.random() - 0.5) * 0.25;
					particle.vy += (Math.random() - 0.5) * 0.25;
					particle.vx *= 0.97;
					particle.vy *= 0.97;
					particle.x += particle.vx;
					particle.y += particle.vy;

					if (particle.x < -SPRITE_R)
						particle.x += canvasW + SPRITE_R * 2;
					if (particle.x > canvasW + SPRITE_R)
						particle.x -= canvasW + SPRITE_R * 2;
					if (particle.y < -SPRITE_R)
						particle.y += canvasH + SPRITE_R * 2;
					if (particle.y > canvasH + SPRITE_R)
						particle.y -= canvasH + SPRITE_R * 2;
				}

				// Draw to simulation canvas
				sCtx.fillStyle = "rgba(0,0,0,0.18)";
				sCtx.fillRect(0, 0, canvasW, canvasH);
				sCtx.globalCompositeOperation = "lighter";
				const particleSprite = getSpriteCanvas(SPRITE_R);
				for (const particle of particles) {
					sCtx.drawImage(
						particleSprite,
						particle.x - SPRITE_R,
						particle.y - SPRITE_R,
					);
				}
				sCtx.drawImage(
					getSpriteCanvas(LARGE_ATTRACTOR_R),
					a1x - LARGE_ATTRACTOR_R,
					a1y - LARGE_ATTRACTOR_R,
				);
				sCtx.drawImage(
					getSpriteCanvas(ATTRACTOR_R),
					a2x - ATTRACTOR_R,
					a2y - ATTRACTOR_R,
				);
				sCtx.globalCompositeOperation = "source-over";

				// Update brightness field
				for (let i = 0; i < brightnessField.length; i++) {
					brightnessField[i] = brightnessField[i]! * FIELD_DECAY;
				}
				for (const particle of particles) {
					splatFieldStamp(particle.x, particle.y, particleStamp);
				}
				splatFieldStamp(a1x, a1y, largeAttractorStamp);
				splatFieldStamp(a2x, a2y, smallAttractorStamp);

				// Render rows
				for (let row = 0; row < rows; row++) {
					let propHtml = "";
					const fieldRowStart =
						row * fieldOversample * fieldCols;
					for (let col = 0; col < cols; col++) {
						const fieldColStart = col * fieldOversample;
						let brightness = 0;
						for (
							let sampleY = 0;
							sampleY < fieldOversample;
							sampleY++
						) {
							const sampleRowOffset =
								fieldRowStart + sampleY * fieldCols + fieldColStart;
							for (
								let sampleX = 0;
								sampleX < fieldOversample;
								sampleX++
							) {
								brightness +=
									brightnessField[sampleRowOffset + sampleX]!;
							}
						}
						const brightnessByte = Math.min(
							255,
							((brightness / (fieldOversample * fieldOversample)) *
								255) |
								0,
						);
						propHtml += brightnessLookup[brightnessByte]!.propHtml;
					}
					const rowEl = rowEls[row];
					if (rowEl) rowEl.innerHTML = propHtml;
				}

				if (!reducedMotion) {
					rafId = requestAnimationFrame(render);
				}
			}

			// Handle resize
			observer = new ResizeObserver(() => {
				if (cancelled) return;

				const newCols = Math.min(
					MAX_COLS,
					Math.floor(el.clientWidth / TARGET_CELL_W),
				);
				const newRows = Math.min(
					MAX_ROWS,
					Math.floor(el.clientHeight / LINE_HEIGHT),
				);

				if (newCols === cols && newRows === rows) return;
				if (newCols < 10 || newRows < 5) return;

				cols = newCols;
				rows = newRows;
				fieldCols = cols * fieldOversample;
				fieldRows = rows * fieldOversample;
				fieldScaleX = fieldCols / canvasW;
				fieldScaleY = fieldRows / canvasH;
				brightnessField = new Float32Array(fieldCols * fieldRows);

				particleStamp = createFieldStamp(SPRITE_R);
				largeAttractorStamp = createFieldStamp(LARGE_ATTRACTOR_R);
				smallAttractorStamp = createFieldStamp(ATTRACTOR_R);

				buildRows();
			});
			observer.observe(el);

			// Start animation
			if (reducedMotion) {
				render(performance.now());
			} else {
				rafId = requestAnimationFrame(render);
			}
		};

		void run();

		return () => {
			cancelled = true;
			cancelAnimationFrame(rafId);
			observer?.disconnect();
			if (containerRef.current) {
				containerRef.current.innerHTML = "";
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={classNames(
				"hero-ascii-container flex flex-col items-center justify-center overflow-hidden",
				className,
			)}
			aria-hidden="true"
			role="presentation"
			style={{ background: "oklch(0.10 0.014 258)" }}
		/>
	);
}
