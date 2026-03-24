/**
 * Quick Performance Benchmark Script
 *
 * A simplified, practical benchmark for quick performance checks.
 * Run with: pnpm test:perf:quick
 */

import { expect, type Page, test } from "@playwright/test";
import {
	PERFORMANCE_BUDGETS,
	ROUTES,
	THROTTLING_PRESETS,
} from "./performance.config";

// ==================== UTILITIES ====================

type PerfSnapshot = {
	lcp: number[];
	cls: number[];
	inp: number[];
	longTasks: number[];
};

type PerfWindow = Window &
	typeof globalThis & {
		__perfData: PerfSnapshot;
	};

type LayoutShiftEntry = PerformanceEntry & {
	hadRecentInput: boolean;
	value: number;
};

type NavigationMetrics = {
	ttfb: number | null;
	fcp: number | null;
	domInteractive: number | null;
	loadComplete: number | null;
};

type CollectedMetrics = {
	lcp: number | null;
	cls: number;
	inp: number;
	longTasks: number;
	navTiming: NavigationMetrics;
	resources: number;
};

async function setupPerfObserver(page: Page) {
	await page.addInitScript(() => {
		const perfWindow = window as PerfWindow;
		perfWindow.__perfData = {
			lcp: [],
			cls: [],
			inp: [],
			longTasks: [],
		};

		// LCP Observer
		new PerformanceObserver((list) => {
			const entries = list.getEntries();
			const lastEntry = entries[entries.length - 1];
			if (lastEntry) {
				perfWindow.__perfData.lcp.push(lastEntry.startTime);
			}
		}).observe({ entryTypes: ["largest-contentful-paint"], buffered: true });

		// CLS Observer
		let clsValue = 0;
		new PerformanceObserver((list) => {
			for (const entry of list.getEntries() as LayoutShiftEntry[]) {
				if (!entry.hadRecentInput) {
					clsValue += entry.value;
				}
			}
			perfWindow.__perfData.cls.push(clsValue);
		}).observe({ entryTypes: ["layout-shift"], buffered: true });

		// Long Task Observer
		new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				perfWindow.__perfData.longTasks.push(entry.duration);
			}
		}).observe({ entryTypes: ["longtask"], buffered: true });

		// INP approximation - track click latency
		const measureInp = () => {
			const start = performance.now();
			// Measure until next frame
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					perfWindow.__perfData.inp.push(performance.now() - start);
				});
			});
		};

		document.addEventListener("click", () => measureInp(), {
			passive: true,
		});
		document.addEventListener("keydown", () => measureInp(), {
			passive: true,
		});
	});
}

async function collectMetrics(page: Page): Promise<CollectedMetrics> {
	const perfData = await page.evaluate(() => (window as PerfWindow).__perfData);

	// Navigation timing
	const navTiming = await page.evaluate<NavigationMetrics>(() => {
		const [nav] = performance.getEntriesByType(
			"navigation",
		) as PerformanceNavigationTiming[];
		const fcp = performance
			.getEntriesByType("paint")
			.find((entry) => entry.name === "first-contentful-paint");
		return {
			ttfb: nav ? nav.responseStart - nav.requestStart : null,
			fcp: fcp?.startTime ?? null,
			domInteractive: nav?.domInteractive ?? null,
			loadComplete: nav?.loadEventEnd ?? null,
		};
	});

	// Resource count
	const resources = await page.evaluate(() => {
		return performance.getEntriesByType("resource").length;
	});

	// Calculate metrics
	const lcp =
		perfData.lcp.length > 0
			? Math.round(perfData.lcp[perfData.lcp.length - 1])
			: null;
	const cls =
		perfData.cls.length > 0
			? Math.round(Math.max(...perfData.cls) * 1000) / 1000
			: 0;
	const inp =
		perfData.inp.length > 0 ? Math.round(Math.max(...perfData.inp)) : 0;
	const longTasks = perfData.longTasks.length;

	return { lcp, cls, inp, longTasks, navTiming, resources };
}

// ==================== TESTS ====================

test.describe("Quick Performance Benchmark", () => {
	test("all routes - core metrics", async ({ page }) => {
		await setupPerfObserver(page);

		const results: Record<string, CollectedMetrics> = {};

		for (const route of ROUTES) {
			console.log(`\n📍 Testing: ${route.name} (${route.path})`);

			// Navigate
			const navStart = Date.now();
			await page.goto(route.path, { waitUntil: "networkidle" });
			const navTime = Date.now() - navStart;

			// Wait for page stabilization
			await page.waitForTimeout(1500);

			const metrics = await collectMetrics(page);
			results[route.path] = metrics;

			// Log results
			console.log(`   ⏱️  Navigation: ${navTime}ms`);
			console.log(`   🔵 TTFB: ${metrics.navTiming.ttfb}ms`);
			console.log(
				`   📦 LCP: ${metrics.lcp}ms | CLS: ${metrics.cls} | INP: ${metrics.inp}ms`,
			);
			console.log(
				`   📚 Resources: ${metrics.resources} | Long Tasks: ${metrics.longTasks}`,
			);

			// Quick assertions
			expect(metrics.navTiming.ttfb).toBeLessThan(2000);
			expect(metrics.lcp).toBeLessThan(5000);
			expect(metrics.cls).toBeLessThan(0.3);
		}

		// Summary
		console.log("\n" + "=".repeat(50));
		console.log("📊 BENCHMARK SUMMARY");
		console.log("=".repeat(50));

		for (const [path, metrics] of Object.entries(results)) {
			const r = metrics as CollectedMetrics;
			const lcpStatus =
				r.lcp !== null && r.lcp < PERFORMANCE_BUDGETS.lcp.warningThreshold
					? "✅"
					: r.lcp !== null &&
						  r.lcp < PERFORMANCE_BUDGETS.lcp.criticalThreshold
						? "⚠️"
						: "❌";
			const clsStatus =
				r.cls < PERFORMANCE_BUDGETS.cls.warningThreshold
					? "✅"
					: r.cls < PERFORMANCE_BUDGETS.cls.criticalThreshold
						? "⚠️"
						: "❌";

			console.log(
				`${path}: LCP ${r.lcp}ms ${lcpStatus} | CLS ${r.cls} ${clsStatus}`,
			);
		}
	});

	test("low-end device simulation", async ({ browser }) => {
		const context = await browser.newContext();
		const page = await context.newPage();
		const client = await context.newCDPSession(page);

		// Apply low-end mobile throttling
		const preset = THROTTLING_PRESETS["low-end-mobile"];
		await client.send("Emulation.setCPUThrottlingRate", {
			rate: preset.cpuThrottlingRate,
		});
		await client.send("Network.emulateNetworkConditions", preset.network);

		console.log(`\n📱 Testing with throttling: ${preset.name}`);
		console.log(`   CPU: ${preset.cpuThrottlingRate}x throttling`);
		console.log(
			`   Network: ${preset.network.downloadThroughput / 1024}KB/s down, ${preset.network.latency}ms latency`,
		);

		await setupPerfObserver(page);

		// Test critical routes
		const criticalRoutes = ["/en", "/en/about", "/en/project"];

		for (const route of criticalRoutes) {
			const start = Date.now();
			await page.goto(route, { waitUntil: "domcontentloaded" });
			const navTime = Date.now() - start;

			await page.waitForTimeout(2000);

			const metrics = await collectMetrics(page);

			console.log(
				`   ${route}: Nav ${navTime}ms | LCP ${metrics.lcp}ms | CLS ${metrics.cls}`,
			);

			// Lenient assertions for throttled
			expect(metrics.lcp).toBeLessThan(15000);
		}

		// Cleanup
		await client.send("Emulation.setCPUThrottlingRate", { rate: 1 });
		await client.send("Network.emulateNetworkConditions", {
			offline: false,
			downloadThroughput: -1,
			uploadThroughput: -1,
			latency: 0,
		});
		await context.close();
	});
});
