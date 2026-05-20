import Link from "next/link";

type LinkButtonSize = "sm" | "md" | "lg" | "xl";
type LinkButtonVariant = "primary" | "secondary" | "pill" | "pill-dark" | "ghost-light";

interface LinkButtonProps {
	link: string;
	text: string;
	variant?: LinkButtonVariant;
	size?: LinkButtonSize;
	className?: string;
}

const sizeClasses: Record<LinkButtonSize, string> = {
	sm: "px-5 py-2 text-sm",
	md: "px-7 py-3 text-sm",
	lg: "px-9 py-3.5 text-[15px]",
	xl: "px-10 py-4 text-base",
};

const variantClasses: Record<LinkButtonVariant, string> = {
	primary:
		"rounded-md bg-primary text-on-primary hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(45,90,74,0.3)]",
	secondary:
		"rounded-md border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-on-primary",
	pill: "rounded-full bg-white font-semibold text-ink hover:bg-white/90 hover:shadow-lg",
	"pill-dark":
		"rounded-full bg-primary font-semibold text-on-primary hover:bg-primary-hover hover:shadow-lg",
	"ghost-light":
		"rounded-full border border-white/35 bg-transparent text-white hover:bg-white/10",
};

const LinkButton = ({
	link,
	text,
	size = "md",
	variant = "primary",
	className = "",
}: LinkButtonProps) => {
	const baseClasses =
		"inline-flex w-full items-center justify-center font-medium transition-all duration-200 sm:w-auto";

	return (
		<Link
			href={link}
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
		>
			{text}
		</Link>
	);
};

export default LinkButton;
