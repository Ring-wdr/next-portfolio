import { expect, test } from "@playwright/test";

type LongTaskEntry = {
	name: string;
	startTime: number;
	duration: number;
};

type PlaywrightPerfWindow = Window & {
	__playwrightPerf?: BrowserPerfState;
};

type BrowserPerfState = {
	longTasks: LongTaskEntry[];
	lcp: number;
	cls: number;
	inp: number;
};

declare const window: PlaywrightPerfWindow;

test.describe("Performance Metrics", () => {
	test("Navigation Timing and Long Tasks", async ({ page }) => {
		await page.addInitScript(() => {
			const state = {
				longTasks: [] as Array<{
					name: string;
					startTime: number;
					duration: number;
				}>,
				lcp: 0,
				cls: 0,
				inp: 0,
			};
			const observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					state.longTasks.push({
						name: entry.name,
						startTime: entry.startTime,
						duration: entry.duration,
					});
				}
			});

			observer.observe({ entryTypes: ["longtask"] });
			window.__playwrightPerf = state;
		});

		await page.goto("/");

		const navigationTiming = await page.evaluate(() => {
			const [timing] = performance.getEntriesByType("navigation") as [
				PerformanceNavigationTiming,
			];
			return {
				dns: timing.domainLookupEnd - timing.domainLookupStart,
				tcp: timing.connectEnd - timing.connectStart,
				ttfb: timing.responseStart - timing.requestStart,
				domInteractive: timing.domInteractive,
				domContentLoaded: timing.domContentLoadedEventEnd,
				load: timing.loadEventEnd,
			};
		});

		const longTasks = await page.evaluate<BrowserPerfState["longTasks"]>(() => {
			const state = window.__playwrightPerf as BrowserPerfState | undefined;
			return state?.longTasks ?? [];
		});

		console.log("Navigation Timing (ms):", navigationTiming);
		console.log(`Found ${longTasks.length} Long Tasks:`, longTasks);

		expect(navigationTiming.ttfb).toBeLessThan(500);
		expect(longTasks.length).toBeLessThan(5);
	});

	test("CPU and Network Profiling (CDP)", async ({ page }) => {
		const client = await page.context().newCDPSession(page);

		await client.send("Profiler.enable");
		await client.send("Profiler.start");

		await client.send("Network.enable");
		const networkEvents: Array<unknown> = [];
		client.on("Network.requestWillBeSent", (event) =>
			networkEvents.push(event),
		);

		await page.goto("/");
		await page.waitForLoadState("networkidle");

		const profile = await client.send("Profiler.stop");
		await client.send("Profiler.disable");

		console.log(`CPU Profile Nodes: ${profile.profile.nodes.length}`);
		console.log(`Network Requests: ${networkEvents.length}`);

		expect(networkEvents.length).toBeLessThan(50);
	});

	function injectPerfObserver(): string {
		return `
	(() => {
		const state = {
			lcp: 0,
			cls: 0,
			inp: 0,
			longTasks: [],
		};

		const observe = (entryType, handler) => {
			if (!window.PerformanceObserver) return;
			try {
				const observer = new PerformanceObserver((list) => {
					handler(list.getEntries());
				});
				observer.observe({ entryTypes: [entryType], buffered: true });
			} catch {
				// Some entry types may be unavailable in certain runs.
			}
		};

		observe("longtask", (entries) => {
			for (const entry of entries) {
				state.longTasks.push({
					name: entry.name,
					startTime: entry.startTime,
					duration: entry.duration,
				});
			}
		});

		observe("largest-contentful-paint", (entries) => {
			const last = entries.at(-1);
			if (last && typeof last.startTime === "number") {
				state.lcp = last.startTime;
			}
		});

		observe("layout-shift", (entries) => {
			for (const entry of entries) {
				if (!entry.hadRecentInput) {
					state.cls += entry.value;
				}
			}
		});

		observe("event", (entries) => {
			for (const entry of entries) {
				const delay = entry.processingStart - entry.startTime;
				if (Number.isFinite(delay) && delay > state.inp) {
					state.inp = delay;
				}
			}
		});

		window.__playwrightPerf = state;
	})();
		`.trim();
	}

	test("Low-end Device Simulation (Throttling)", async ({ page }) => {
		test.slow();

		await page.addInitScript({ content: injectPerfObserver() });
		const client = await page.context().newCDPSession(page);

		await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
		await client.send("Network.emulateNetworkConditions", {
			offline: false,
			downloadThroughput: (500 * 1024) / 8,
			uploadThroughput: (500 * 1024) / 8,
			latency: 400,
		});

		await page.goto("/", { waitUntil: "domcontentloaded" });
		await page.waitForLoadState("load");
		await page.waitForSelector("h1");

		const metrics = await page.evaluate(() => {
			const state = window.__playwrightPerf as BrowserPerfState;
			return {
				lcp: state?.lcp ?? 0,
				cls: state?.cls ?? 0,
				inp: state?.inp ?? 0,
				longTasks: state?.longTasks ?? [],
			};
		});

		await page.screenshot({
			path: "test-results/slow-loading.png",
			fullPage: true,
		});

		console.log(`Throttled LCP: ${metrics.lcp}ms`);
		console.log(`Throttled CLS: ${metrics.cls}`);
		console.log(`Throttled INP: ${metrics.inp}ms`);
		console.log(`Throttled Long Tasks: ${metrics.longTasks.length}`);

		expect(metrics.lcp).toBeGreaterThan(0);
		expect(metrics.lcp).toBeLessThan(18000);
		expect(metrics.cls).toBeLessThan(0.1);
		expect(metrics.inp).toBeLessThan(200);
		expect(metrics.longTasks.length).toBeLessThan(25);
	});
});
