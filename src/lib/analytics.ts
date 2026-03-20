/**
 * HealthyWhooo Analytics Service
 * 
 * Lightweight, modular analytics wrapper.
 * - Logs events locally in development
 * - Optionally forwards to PostHog when VITE_POSTHOG_KEY is set
 * - GDPR-friendly: respects consent before sending data
 * - No PII collected — only anonymous behavioral data
 *
 * SETUP:
 *   PostHog: set VITE_POSTHOG_KEY and optionally VITE_POSTHOG_HOST in .env
 *   Built-in: Lovable project analytics handles page views automatically
 */

// ── Types ──

export type AnalyticsEvent =
  | "app_opened"
  | "guide_selected"
  | "guide_switched"
  | "scan_started"
  | "scan_completed"
  | "ingredient_searched"
  | "ingredient_found"
  | "ingredient_not_found"
  | "result_viewed"
  | "ingredient_saved"
  | "ingredient_removed"
  | "ingredient_reported"
  | "retry_clicked"
  | "coming_soon_viewed"
  | "library_opened"
  | "reported_list_viewed";

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

// ── Consent ──

const CONSENT_KEY = "healthywhooo_analytics_consent";

export const getConsent = (): boolean | null => {
  const val = localStorage.getItem(CONSENT_KEY);
  if (val === null) return null; // not yet decided
  return val === "true";
};

export const setConsent = (granted: boolean) => {
  localStorage.setItem(CONSENT_KEY, String(granted));
};

/** For prototype: auto-grant consent (no PII collected). Replace with a banner for production. */
export const ensureConsent = (): boolean => {
  const current = getConsent();
  if (current === null) {
    // Auto-grant for prototype — swap with a real consent UI later
    setConsent(true);
    return true;
  }
  return current;
};

// ── Device / context helpers ──

const getDeviceType = (): string => {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
};

const getBaseProperties = (): EventProperties => ({
  timestamp: Date.now(),
  page: window.location.pathname,
  device_type: getDeviceType(),
  browser: navigator.userAgent.split(" ").pop() ?? "unknown",
  language: navigator.language,
  referrer: document.referrer || undefined,
  screen_width: window.innerWidth,
  screen_height: window.innerHeight,
});

// ── PostHog integration (optional) ──

let posthogLoaded = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let posthogInstance: any = null;

const loadPostHog = async () => {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key || posthogLoaded) return;

  try {
    // Dynamic import — only works if posthog-js is installed
    const mod = await import(/* @vite-ignore */ "posthog-js");
    const posthog = mod.default || mod;
    posthog.init(key, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
      loaded: () => { posthogLoaded = true; posthogInstance = posthog; },
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      persistence: "localStorage",
      respect_dnt: true,
    });
    posthogInstance = posthog;
  } catch {
    if (import.meta.env.DEV) {
      console.log("[Analytics] PostHog not installed. Using local logging only.");
    }
  }
};

// ── Core tracking functions ──

/**
 * Track a product analytics event.
 * Events are logged locally in dev and forwarded to PostHog if configured.
 */
export const trackEvent = async (
  event: AnalyticsEvent,
  properties?: EventProperties
) => {
  if (!ensureConsent()) return;

  const merged = { ...getBaseProperties(), ...properties };

  // Always log in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, merged);
  }

  // Forward to PostHog if available
  if (posthogLoaded && posthogInstance) {
    try {
      posthogInstance.capture(event, merged);
    } catch {
      // silently degrade
    }
  }
};

/**
 * Track a page view. Called from the route-level analytics hook.
 */
export const trackPageView = (path: string) => {
  trackEvent("app_opened", { page: path });
};

// ── Session tracking ──

const SESSION_KEY = "healthywhooo_session_start";
const SESSION_COUNT_KEY = "healthywhooo_session_count";

export const startSession = () => {
  if (!ensureConsent()) return;

  const now = Date.now();
  sessionStorage.setItem(SESSION_KEY, String(now));

  // Increment session count
  const count = parseInt(localStorage.getItem(SESSION_COUNT_KEY) || "0", 10);
  localStorage.setItem(SESSION_COUNT_KEY, String(count + 1));

  trackEvent("app_opened", { session_number: count + 1 });
};

export const getSessionDuration = (): number => {
  const start = sessionStorage.getItem(SESSION_KEY);
  if (!start) return 0;
  return Math.round((Date.now() - parseInt(start, 10)) / 1000);
};

// ── Initialize ──

export const initAnalytics = () => {
  if (!ensureConsent()) return;
  loadPostHog();
  startSession();
};
