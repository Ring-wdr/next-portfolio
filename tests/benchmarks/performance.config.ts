/**
 * Performance Benchmark Configuration
 * 
 * Centralized configuration for route-level performance testing.
 * Includes route definitions, throttling presets, and performance budgets.
 */

export interface RouteConfig {
  path: string;
  name: string;
  interactions?: InteractionConfig[];
}

export interface InteractionConfig {
  selector: string;
  name: string;
  action: 'click' | 'hover' | 'focus' | 'scroll';
}

export interface ThrottlingPreset {
  name: string;
  cpuThrottlingRate: number;
  network: {
    offline: boolean;
    downloadThroughput: number; // bytes per second
    uploadThroughput: number;   // bytes per second
    latency: number;            // ms
  };
}

export interface PerformanceBudget {
  metric: string;
  warningThreshold: number;
  criticalThreshold: number;
}

// ==================== ROUTE CONFIGURATIONS ====================

export const ROUTES: RouteConfig[] = [
  { path: '/en', name: 'Home (English)' },
  { path: '/ko', name: 'Home (Korean)' },
  { path: '/en/about', name: 'About' },
  { path: '/en/project', name: 'Projects List' },
  { 
    path: '/en/project/pocaz', 
    name: 'Project Detail: POCAZ',
    interactions: [
      { selector: '[data-gallery]', name: 'Open Gallery', action: 'click' },
    ]
  },
  { path: '/en/tech-stack', name: 'Tech Stack' },
  { path: '/en/contact', name: 'Contact' },
];

// ==================== THROTTLING PRESETS ====================

export const THROTTLING_PRESETS: Record<string, ThrottlingPreset> = {
  // Fast 3G - Emerging markets / Poor connections
  'fast-3g': {
    name: 'Fast 3G',
    cpuThrottlingRate: 1,
    network: {
      offline: false,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,  // 1.6 Mbps
      uploadThroughput: (768 * 1024) / 8,            // 768 kbps
      latency: 150,                                  // 150ms RTT
    },
  },
  // Slow 3G - Basic mobile connections
  'slow-3g': {
    name: 'Slow 3G',
    cpuThrottlingRate: 2,
    network: {
      offline: false,
      downloadThroughput: (400 * 1024) / 8,        // 400 kbps
      uploadThroughput: (400 * 1024) / 8,            // 400 kbps
      latency: 400,                                  // 400ms RTT
    },
  },
  // Very Slow 3G - Edge of connectivity
  'very-slow-3g': {
    name: 'Very Slow 3G',
    cpuThrottlingRate: 4,
    network: {
      offline: false,
      downloadThroughput: (50 * 1024) / 8,          // 50 kbps
      uploadThroughput: (30 * 1024) / 8,            // 30 kbps
      latency: 1000,                                 // 1s RTT
    },
  },
  // Low-end mobile (4x CPU throttling + Slow 3G)
  'low-end-mobile': {
    name: 'Low-end Mobile',
    cpuThrottlingRate: 4,
    network: {
      offline: false,
      downloadThroughput: (500 * 1024) / 8,         // 500 kbps
      uploadThroughput: (250 * 1024) / 8,           // 250 kbps
      latency: 300,                                  // 300ms RTT
    },
  },
  // High-end desktop (baseline)
  'desktop-baseline': {
    name: 'Desktop Baseline',
    cpuThrottlingRate: 1,
    network: {
      offline: false,
      downloadThroughput: -1,                         // Unlimited
      uploadThroughput: -1,                           // Unlimited
      latency: 0,                                     // No latency
    },
  },
};

// ==================== PERFORMANCE BUDGETS ====================

// Web Vitals thresholds (in milliseconds unless specified)
export const PERFORMANCE_BUDGETS: Record<string, PerformanceBudget> = {
  // Core Web Vitals
  'lcp': { metric: 'Largest Contentful Paint', warningThreshold: 2500, criticalThreshold: 4000 },
  'fid': { metric: 'First Input Delay', warningThreshold: 100, criticalThreshold: 300 },
  'cls': { metric: 'Cumulative Layout Shift', warningThreshold: 0.1, criticalThreshold: 0.25 },
  
  // Navigation Timing
  'ttfb': { metric: 'Time to First Byte', warningThreshold: 800, criticalThreshold: 1800 },
  'fcp': { metric: 'First Contentful Paint', warningThreshold: 1800, criticalThreshold: 3000 },
  'domInteractive': { metric: 'DOM Interactive', warningThreshold: 3500, criticalThreshold: 5500 },
  'loadComplete': { metric: 'Page Load Complete', warningThreshold: 5000, criticalThreshold: 8000 },
  
  // Interaction Timing
  'inp': { metric: 'Interaction to Next Paint', warningThreshold: 200, criticalThreshold: 500 },
  'tti': { metric: 'Time to Interactive', warningThreshold: 3800, criticalThreshold: 7300 },
  
  // Resource Timing
  'totalResources': { metric: 'Total Resource Count', warningThreshold: 50, criticalThreshold: 80 },
  'totalResourceSize': { metric: 'Total Resource Size (KB)', warningThreshold: 1000, criticalThreshold: 2000 },
};

// ==================== TEST CONFIGURATION ====================

export const BENCHMARK_CONFIG = {
  // Number of runs per route for averaging
  runsPerRoute: 3,
  
  // Wait times between interactions (ms)
  interactionDelay: 1000,
  
  // Screenshot capture on throttled tests
  captureScreenshots: true,
  
  // Output directory for results
  outputDir: 'test-results/benchmarks',
  
  // Enable detailed console logging
  verbose: true,
};

export default BENCHMARK_CONFIG;
