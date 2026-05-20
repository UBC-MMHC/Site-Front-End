"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeIcon({ isDark }: { isDark: boolean }) {
	return isDark ? (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
	) : (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	);
}

export default function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <span className="inline-block h-9 w-9" aria-hidden />;
	}

	const isDark = resolvedTheme === "dark";
	const label = isDark ? "Light mode" : "Dark mode";

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className={
				showLabel
					? "flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-page-fg transition-colors hover:border-theme-accent-muted hover:bg-surface-elevated"
					: "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-page-fg transition-colors hover:border-theme-accent-muted hover:bg-surface-elevated"
			}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
		>
			<ThemeIcon isDark={isDark} />
			{showLabel && <span>{label}</span>}
		</button>
	);
}
