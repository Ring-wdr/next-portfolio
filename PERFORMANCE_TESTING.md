# Performance Testing with Playwright

This guide explains how to use the performance scripts in `tests/performance.spec.ts` to locate slow rendering paths and measure performance budgets in this Next.js application.

## 🚀 Running the Tests

To run the performance tests, use the following command:

```bash
npx playwright test tests/performance.spec.ts --project=chromium
```

> **Note:** CDP-based profiling and throttling are most reliable in Chromium-based browsers.

## 📊 Test Scenarios

### 1. Navigation Timing and Long Tasks

- **What it measures:** DNS lookup, TCP connection, TTFB, DOM Interactive, and Load events.
- **Long Tasks:** Detects any JavaScript execution that blocks the main thread for more than 50ms.
- **Interpretation:** High TTFB indicates server-side rendering (SSR) or network issues. Many long tasks during load suggest heavy hydration or expensive client-side scripts.

### 2. CPU and Network Profiling (CDP)

- **What it measures:** Detailed CPU profile nodes and network request counts.
- **Interpretation:** A high number of CPU profile nodes indicates complex component trees or expensive computations. High network request counts can lead to waterfall delays.

### 3. Low-end Device Simulation (Throttling)

- **What it measures:** Largest Contentful Paint (LCP) under 4x CPU throttling and Slow 3G network conditions.
- **Evidence:** Saves a screenshot to `test-results/slow-loading.png` to visualize what the user sees during the slow load.
- **Interpretation:** If LCP exceeds 5 seconds on Slow 3G, consider optimizing image sizes, reducing bundle size, or using streaming SSR.

## 🛠️ Customizing Budgets

You can adjust the performance budgets in `tests/performance.spec.ts` by modifying the `expect` statements:

```typescript
expect(navigationTiming.ttfb).toBeLessThan(500); // 500ms TTFB budget
expect(longTasks.length).toBeLessThan(5); // Max 5 long tasks during load
expect(Number(lcp)).toBeLessThan(5000); // 5s LCP budget for slow 3G
```

## 🔍 Locating Slow Paths

1. **Check Console Output:** The tests log detailed timing and task data to the console.
2. **Review Screenshots:** Look at `test-results/slow-loading.png` to identify which elements are slow to appear.
3. **Analyze CPU Profiles:** For deep dives, you can save the `profile` object to a JSON file and load it into Chrome DevTools (Performance tab -> Load profile).
