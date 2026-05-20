import { eyebrowBadge, textHeading, textMuted } from "@/lib/theme";

export default function PageHeader({
	eyebrow,
	title,
	description,
}: {
	eyebrow?: string;
	title: string;
	description?: string;
}) {
	return (
		<header className="mb-12 md:mb-16">
			{eyebrow && (
				<div className={`mb-6 ${eyebrowBadge}`}>
					<div className="h-1.5 w-1.5 rounded-full bg-theme-accent-muted" />
					<span className={`text-xs font-medium uppercase tracking-wide ${textMuted}`}>{eyebrow}</span>
				</div>
			)}
			<h1 className={`text-3xl font-semibold tracking-tight md:text-5xl ${textHeading}`}>{title}</h1>
			{description && (
				<p className={`mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${textMuted}`}>{description}</p>
			)}
		</header>
	);
}
