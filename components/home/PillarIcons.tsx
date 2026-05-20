import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Three people — reads clearly as a group */
export function CommunityIcon({ className, ...props }: IconProps) {
	return (
		<svg
			viewBox="0 0 32 32"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden
			{...props}
		>
			<circle cx="8" cy="11" r="3" />
			<path d="M4 21 Q8 17 12 21" />
			<circle cx="16" cy="9" r="3.5" />
			<path d="M11 21 Q16 16 21 21" />
			<circle cx="24" cy="11" r="3" />
			<path d="M20 21 Q24 17 28 21" />
		</svg>
	);
}

/** Water waves — cold plunges and pushing through discomfort */
export function GritIcon({ className, ...props }: IconProps) {
	return (
		<svg
			viewBox="0 0 32 32"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden
			{...props}
		>
			<path d="M3 12c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7.5 0 5 2 7.5 0" />
			<path d="M3 18c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7.5 0 5 2 7.5 0" />
			<path d="M3 24c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7.5 0 5 2 7.5 0" />
		</svg>
	);
}

/** Journal — reflection and accountability, not a sprout */
export function GrowthIcon({ className, ...props }: IconProps) {
	return (
		<svg
			viewBox="0 0 32 32"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden
			{...props}
		>
			<path d="M9 6h11a2 2 0 0 1 2 2v18H9a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
			<path d="M11 6v20" />
			<path d="M14 12h8M14 16h6M14 20h8" />
		</svg>
	);
}
