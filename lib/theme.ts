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
