"use client";

import { API_ROUTES_URL } from "@/app/constants";
import { useState } from "react";

type NewsletterLayout = "inline" | "stacked" | "pill";

interface NewsletterSignupProps {
	layout?: NewsletterLayout;
}

const NewsletterSignup = ({ layout = "inline" }: NewsletterSignupProps) => {
	const [emailInput, setEmailInput] = useState<string>("");
	const [didSignup, setDidSignup] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isWaiting, setIsWaiting] = useState<boolean>(false);

	const handleOnSignup = async () => {
		if (didSignup || !emailInput.trim()) return;

		setErrorMessage("");
		setSuccessMessage("");
		setIsWaiting(true);

		try {
			const res = await fetch(API_ROUTES_URL.subscribe_email_to_newsletter, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: emailInput }),
			});

			if (!res.ok) {
				setErrorMessage("Error subscribing. Please try again later.");
				return;
			}

			setSuccessMessage("Successfully subscribed!");
			setDidSignup(true);
		} catch {
			setErrorMessage("Network error. Please try again later.");
		} finally {
			setIsWaiting(false);
		}
	};

	if (layout === "pill") {
		return (
			<div className="w-full min-w-0">
				<form
					data-inline
					onSubmit={(e) => {
						e.preventDefault();
						void handleOnSignup();
					}}
					className="newsletter-pill-form relative w-full max-w-[28rem]"
				>
					<input
						type="email"
						value={emailInput}
						onChange={(e) => setEmailInput(e.target.value)}
						placeholder="Your email"
						disabled={didSignup}
						className="newsletter-pill-input block w-full rounded-full border border-border bg-surface py-3 pl-5 pr-[6.75rem] text-sm text-page-fg outline-none placeholder:text-zinc-400 focus:border-theme-focus focus:bg-surface-elevated disabled:opacity-60 dark:placeholder:text-fg-muted"
					/>
					<button
						type="submit"
						disabled={isWaiting || didSignup}
						className="newsletter-pill-button absolute right-1 top-1 bottom-1 rounded-full bg-pill px-4 text-xs font-semibold text-pill-fg hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-200 dark:hover:text-[var(--theme-pill-fg)]"
					>
						{isWaiting ? "…" : "Subscribe"}
					</button>
				</form>
				{successMessage && <p className="mt-3 text-sm text-emerald-400">{successMessage}</p>}
				{errorMessage && <p className="mt-3 text-sm text-red-400">{errorMessage}</p>}
			</div>
		);
	}

	const isInline = layout === "inline";

	return (
		<div className="w-full max-w-md min-w-0">
			<form
				data-inline
				onSubmit={(e) => {
					e.preventDefault();
					void handleOnSignup();
				}}
				className={
					isInline
						? "flex flex-col gap-3 sm:flex-row sm:items-center"
						: "flex flex-col gap-3"
				}
			>
				<input
					type="email"
					value={emailInput}
					onChange={(e) => setEmailInput(e.target.value)}
					placeholder="Enter your email"
					disabled={didSignup}
					className="min-h-11 flex-1 rounded-full border border-hairline bg-white px-5 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
				/>
				<button
					type="submit"
					disabled={isWaiting || didSignup}
					className="min-h-11 shrink-0 rounded-full bg-primary px-7 py-2.5 text-[15px] font-semibold text-on-primary transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isWaiting ? "Subscribing…" : "Subscribe"}
				</button>
			</form>

			{successMessage && <p className="mt-3 text-sm text-semantic-success">{successMessage}</p>}
			{errorMessage && <p className="mt-3 text-sm text-semantic-urgent">{errorMessage}</p>}
		</div>
	);
};

export default NewsletterSignup;
