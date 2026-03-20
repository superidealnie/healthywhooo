# Analytics

## Overview

HealthyWhooo uses a lightweight, modular analytics system located in `src/lib/analytics.ts`.

## What's tracked

### Automatic (page-level)
| Metric | How |
|---|---|
| Page views | Route changes via `useAnalytics` hook |
| Session count | Incremented per browser session, stored in localStorage |
| Session duration | Calculated from sessionStorage timestamp |

### Product events
| Event | Trigger | Properties |
|---|---|---|
| `app_opened` | App load / route change | page, session_number |
| `guide_selected` | First guide pick on home | guide |
| `guide_switched` | Guide changed via modal | from, to |
| `scan_started` | Scan button tapped | mode |
| `scan_completed` | Scan finishes | mode, processing_time_ms |
| `ingredient_searched` | Search submitted | query, mode |
| `ingredient_found` | Search matched DB | ingredient, mode |
| `ingredient_not_found` | Search had no match | query, mode |
| `result_viewed` | Ingredient detail opened | ingredient, level, mode |
| `ingredient_saved` | Saved to library | ingredient, mode |
| `retry_clicked` | "Scan Another" tapped | mode |

### Context properties (added to every event)
- `timestamp`, `page`, `device_type`, `browser`, `language`, `referrer`, `screen_width`, `screen_height`

## Where to see data

### Development
All events are logged to the browser console as `[Analytics] event_name { ... }`.

### Lovable built-in analytics
Use the Lovable dashboard to see traffic, visitors, and page views for the published app.

### PostHog (optional)
1. Install: `npm install posthog-js`
2. Set env vars: `VITE_POSTHOG_KEY=phc_xxx` and optionally `VITE_POSTHOG_HOST`
3. Events will automatically forward to your PostHog project

## Privacy & GDPR
- No PII is collected (no names, emails, or IP logging)
- `respect_dnt: true` is enabled for PostHog
- Consent is managed via localStorage (`healthywhooo_analytics_consent`)
- For production: replace auto-consent with a proper cookie banner

## Adding new events
1. Add the event name to the `AnalyticsEvent` type in `src/lib/analytics.ts`
2. Call `trackEvent("your_event", { ...properties })` where needed
