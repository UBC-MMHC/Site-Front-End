import Link from "next/link";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { pageShell, surfaceCard, textHeading, textMuted } from "@/lib/theme";

/** Shared form control styles (light default, dark via .dark). Use on forms with data-form-ui. */
export const formInputClass =
	"block w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 focus:border-theme-focus focus:ring-2 focus:ring-theme-focus/25 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border dark:bg-surface-elevated dark:text-page-fg dark:placeholder:text-fg-muted";

export const formSelectClass = `${formInputClass} cursor-pointer appearance-none`;

export const formLabelClass = "mb-2 block text-sm font-medium text-zinc-700 dark:text-page-fg";

export const formHintClass = "mt-1.5 text-xs text-zinc-500 dark:text-fg-muted";

export function FormPageShell({ children }: { children: ReactNode }) {
	return (
		<div className={`w-full px-4 py-24 pt-28 ${pageShell}`}>
			<div className="mx-auto w-full min-w-0 max-w-form">{children}</div>
		</div>
	);
}

export function FormCard({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={`w-full min-w-0 p-8 shadow-lg backdrop-blur-sm ${surfaceCard} ${className}`}>
			{children}
		</div>
	);
}

export function FormHeader({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className="mb-6 text-center">
			<h1 className={`text-2xl font-semibold tracking-tight ${textHeading}`}>{title}</h1>
			{description && <p className={`mt-2 text-sm ${textMuted}`}>{description}</p>}
		</div>
	);
}

export function FormField({
	label,
	htmlFor,
	hint,
	optional,
	children,
}: {
	label: string;
	htmlFor?: string;
	hint?: string;
	optional?: boolean;
	children: ReactNode;
}) {
	return (
		<div>
			<label htmlFor={htmlFor} className={formLabelClass}>
				{label}
				{optional && <span className="font-normal text-zinc-500"> (optional)</span>}
			</label>
			{children}
			{hint && <p className={formHintClass}>{hint}</p>}
		</div>
	);
}

export function FormInput({
	className = "",
	...props
}: InputHTMLAttributes<HTMLInputElement>) {
	return <input className={`${formInputClass} ${className}`} {...props} />;
}

export function FormSelect({
	className = "",
	children,
	...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
	return (
		<select className={`${formSelectClass} ${className}`} {...props}>
			{children}
		</select>
	);
}

export function FormCheckbox({
	label,
	className = "",
	...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
	return (
		<label className={`flex cursor-pointer items-start gap-3 ${className}`}>
			<input
				type="checkbox"
				className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-400 bg-white accent-zinc-900 dark:border-border dark:bg-surface-elevated dark:accent-page-fg"
				{...props}
			/>
			<span className={`text-sm leading-relaxed ${textMuted}`}>{label}</span>
		</label>
	);
}

type FormButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariants: Record<FormButtonVariant, string> = {
	primary:
		"rounded-full bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-pill dark:text-pill-fg dark:hover:bg-slate-200",
	secondary:
		"rounded-full border border-zinc-300 bg-transparent text-zinc-700 hover:border-theme-focus hover:bg-zinc-100 disabled:opacity-50 dark:border-border dark:text-page-fg dark:hover:border-theme-focus dark:hover:bg-surface-elevated",
	ghost: "rounded-lg text-zinc-600 hover:text-zinc-900 disabled:opacity-50 dark:text-fg-muted dark:hover:text-theme-accent-hover",
};

export function FormButton({
	variant = "primary",
	className = "",
	children,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: FormButtonVariant }) {
	return (
		<button
			type="button"
			className={`w-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${buttonVariants[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}

export function FormSubmitButton({
	children,
	className = "",
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type="submit"
			className={`w-full rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-pill dark:text-pill-fg dark:hover:bg-slate-200 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}

export function FormMessage({ type, children }: { type: "error" | "success"; children: ReactNode }) {
	const classes =
		type === "error"
			? "text-center text-sm text-red-600 dark:text-red-400"
			: "text-center text-sm text-emerald-600 dark:text-emerald-400";
	return <p className={classes}>{children}</p>;
}

export function FormDivider() {
	return (
		<div className="my-6 flex items-center">
			<div className="h-px flex-grow bg-zinc-200 dark:bg-border" />
			<span className="mx-3 text-sm text-zinc-500">or</span>
			<div className="h-px flex-grow bg-zinc-200 dark:bg-border" />
		</div>
	);
}

export function FormFooterLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	return (
		<p className="mt-6 text-center text-sm text-zinc-500">
			<Link href={href} className="text-zinc-700 underline-offset-4 hover:text-theme-accent hover:underline dark:text-theme-accent-muted dark:hover:text-theme-accent-hover">
				{children}
			</Link>
		</p>
	);
}
