/** Shared theme-aware Tailwind class groups (light default, dark via .dark on html). */

export const pageShell =
	"min-h-screen bg-page font-sans text-page-fg antialiased selection:bg-[var(--theme-selection)] selection:text-page-fg dark:selection:text-white";

export const surfaceCard =
	"rounded-2xl border border-border bg-surface shadow-sm dark:shadow-none";

export const surfaceCardHover =
	"transition-all hover:border-theme-accent-muted/40 hover:bg-surface-elevated dark:hover:border-theme-accent-muted/50 dark:hover:bg-surface-elevated";

/** Alternating section band (pillars, etc.) */
export const sectionBand = "border-y border-border bg-surface-alt";

export const textHeading = "text-page-fg";

export const textMuted = "text-fg-muted";

export const textSubtle = "text-zinc-500 dark:text-slate-400";

export const accentLine = "bg-theme-line";

export const accentIcon = "text-theme-accent";

export const pillPrimary =
	"rounded-full bg-pill px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-pill-fg transition-colors hover:bg-theme-accent-hover hover:text-pill-fg dark:hover:bg-slate-200 dark:hover:text-[var(--theme-pill-fg)]";

export const pillOutline =
	"rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-page-fg transition-colors hover:border-theme-accent-muted hover:bg-surface-elevated dark:hover:border-theme-accent-muted dark:hover:bg-surface-elevated";

export const navSolid = "bg-nav/95 backdrop-blur-sm";

export const eyebrowBadge =
	"inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1";

export const dashedEmpty =
	"rounded-2xl border border-dashed border-border px-8 py-16 text-center";

/** Centered full-viewport content (dashboard, profile, loading states). */
export const centerPage =
	"flex min-h-screen w-full flex-col items-center justify-center px-6";

/** Readable text column — uses --max-width-content, not max-w-xl (48px spacing token). */
export const contentColumn = "mx-auto w-full min-w-0 max-w-content text-center";

/** Subcopy / forms — uses --max-width-copy / --max-width-form */
export const copyColumn = "mx-auto w-full min-w-0 max-w-copy";
export const formColumn = "mx-auto w-full min-w-0 max-w-form";

export const loadingPulse = `animate-subtle-pulse ${textMuted}`;

export const authSpinner =
	"mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-border border-t-theme-accent";

export const paymentBanner =
	"border-b border-amber-500/30 bg-amber-500/10 px-4 py-3 backdrop-blur-sm";
