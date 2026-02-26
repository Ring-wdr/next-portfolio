import { type BrowserContext, expect, test } from "@playwright/test";

import {
	PERFORMANCE_BUDGETS,
	ROUTES,
	THROTTLING_PRESETS,
	type ThrottlingPreset,
} from "./performance.config";

async function setupPerformanceObserver(page: any): Promise<void> {
	await page.addInitScript(() => {
		(window as any).__routePerf = {
			lcp: [] as number[],
			cls: [] as number[],
			inp: [] as number[],
			longTasks: [] as Array<{ name: string; duration: number }>,
		};

		new PerformanceObserver((list) => {
			const entries = list.getEntries();
			const lastEntry = entries[entries.length - 1];
			if (lastEntry) {
				(window as any).__routePerf.lcp.push(lastEntry.startTime);
			}
		}).observe({ entryTypes: ["largest-contentful-paint"], buffered: true });

		let clsValue = 0;
		new PerformanceObserver((list) => {
			for (const entry of list.getEntries() as unknown as Array<{
				hadRecentInput: boolean;
				value: number;
			}>) {
				if (!entry.hadRecentInput) {
					clsValue += entry.value;
					(window as any).__routePerf.cls.push(clsValue);
				}
			}
		}).observe({ entryTypes: ["layout-shift"], buffered: true });

		new PerformanceObserver((list) => {
			for (const entry of list.getEntries() as Array<{
				name: string;
				duration: number;
			}>) {
				(window as any).__routePerf.longTasks.push(entry);
			}
		}).observe({ entryTypes: ["longtask"], buffered: true });

		const measureInteraction = () => {
			const start = performance.now();
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					(window as any).__routePerf.inp.push(performance.now() - start);
				});
			});
		};

		["click", "keydown", "mousedown", "touchstart"].forEach((type) => {
			document.addEventListener(
				type,
				() => {
					measureInteraction();
				},
				{ passive: true },
			);
		});
	});
}

async function applyThrottling(
	context: BrowserContext,
	preset: ThrottlingPreset,
): Promise<void> {
	const client = await context.newCDPSession(
		context.pages()[0] || (await context.newPage()),
	);
	await client.send("Emulation.setCPUThrottlingRate", {
		rate: preset.cpuThrottlingRate,
	});
	await client.send("Network.emulateNetworkConditions", preset.network);
}

async function resetThrottling(context: BrowserContext): Promise<void> {
	const client = await context.newCDPSession(
		context.pages()[0] || (await context.newPage()),
	);
	await client.send("Emulation.setCPUThrottlingRate", { rate: 1 });
	await client.send("Network.emulateNetworkConditions", {
		offline: false,
		downloadThroughput: -1,
		uploadThroughput: -1,
		latency: 0,
	});
}

async function collectMetrics(page: any) {
	const perfData = await page.evaluate(() => (window as any).__routePerf);

	const navigation = await page.evaluate(() => {
		const [entry] = performance.getEntriesByType(
			"navigation",
		) as Array<PerformanceNavigationTiming>;
		const paint = performance
			.getEntriesByType("paint")
			.find((item) => item.name === "first-contentful-paint");

		if (!entry) {
			return null;
		}

		return {
			ttfb: entry.responseStart - entry.requestStart,
			domInteractive: entry.domInteractive,
			fcp: paint ? paint.startTime : 0,
			loadComplete: entry.loadEventEnd,
		};
	});

	const lcp =
		perfData?.lcp?.length > 0
			? Math.round(perfData.lcp[perfData.lcp.length - 1])
			: null;
	const cls =
		perfData?.cls?.length > 0
			? Math.round(Math.max(...perfData.cls) * 1000) / 1000
			: 0;
	const inp = perfData?.inp?.length > 0 ? Math.max(...perfData.inp) : 0;

	return {
		lcp,
		cls,
		inp,
		navigation,
		longTaskCount: perfData?.longTasks?.length ?? 0,
	};
}

test.describe("Route benchmark", () => {
	test("collect route metrics", async ({ page }) => {
		const route = ROUTES[0];
		await setupPerformanceObserver(page);

		await page.goto(route.path, { waitUntil: "networkidle" });
		await page.waitForTimeout(1200);

		const metrics = await collectMetrics(page);

		expect(metrics.lcp).toBeTruthy();
		expect(metrics.cls).toBeLessThan(PERFORMANCE_BUDGETS.cls.criticalThreshold);
		expect(metrics.navigation).not.toBeNull();
		if (metrics.navigation) {
			expect(metrics.navigation.ttfb).toBeLessThan(
				PERFORMANCE_BUDGETS.ttfb.criticalThreshold,
			);
		}
	});

	test("low-end route simulation", async ({ browser }) => {
		const context = await browser.newContext();
		const preset = THROTTLING_PRESETS["low-end-mobile"];

		const page = await context.newPage();
		await applyThrottling(context, preset);
		await setupPerformanceObserver(page);

		await page.goto(ROUTES[0].path, { waitUntil: "domcontentloaded" });
		await page.waitForTimeout(1200);

		const metrics = await collectMetrics(page);

		expect(metrics.lcp).toBeTruthy();
		expect(metrics.lcp).toBeLessThan(10000);

		await resetThrottling(context);
		await context.close();
	});
});
