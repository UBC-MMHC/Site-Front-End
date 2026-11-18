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
					<div className="bg-theme-accent-muted h-1.5 w-1.5 rounded-full" />
					<span className={`text-xs font-medium tracking-wide uppercase ${textMuted}`}>
						{eyebrow}
					</span>
				</div>
			)}
			<h1 className={`text-3xl font-semibold tracking-tight md:text-5xl ${textHeading}`}>
				{title}
			</h1>
			{description && (
				<p className={`max-w-copy mt-4 text-base leading-relaxed md:text-lg ${textMuted}`}>
					{description}
				</p>
			)}
		</header>
	);
}
