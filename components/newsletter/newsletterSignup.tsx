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
						className="newsletter-pill-input border-border bg-surface text-page-fg focus:border-theme-focus focus:bg-surface-elevated dark:placeholder:text-fg-muted block w-full rounded-full border py-3 pr-[6.75rem] pl-5 text-sm outline-none placeholder:text-zinc-400 disabled:opacity-60"
					/>
					<button
						type="submit"
						disabled={isWaiting || didSignup}
						className="newsletter-pill-button bg-pill text-pill-fg absolute top-1 right-1 bottom-1 rounded-full px-4 text-xs font-semibold hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-200 dark:hover:text-[var(--theme-pill-fg)]"
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
		<div className="max-w-form w-full min-w-0">
			<form
				data-inline
				onSubmit={(e) => {
					e.preventDefault();
					void handleOnSignup();
				}}
				className={
					isInline ? "flex flex-col gap-3 sm:flex-row sm:items-center" : "flex flex-col gap-3"
				}
			>
				<input
					type="email"
					value={emailInput}
					onChange={(e) => setEmailInput(e.target.value)}
					placeholder="Enter your email"
					disabled={didSignup}
					className="border-hairline text-ink placeholder:text-muted focus:border-primary focus:ring-primary/20 min-h-11 flex-1 rounded-full border bg-white px-5 py-2.5 text-[15px] transition-colors outline-none focus:ring-2"
				/>
				<button
					type="submit"
					disabled={isWaiting || didSignup}
					className="bg-primary text-on-primary hover:bg-primary-hover min-h-11 shrink-0 rounded-full px-7 py-2.5 text-[15px] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isWaiting ? "Subscribing…" : "Subscribe"}
				</button>
			</form>

			{successMessage && <p className="text-semantic-success mt-3 text-sm">{successMessage}</p>}
			{errorMessage && <p className="text-semantic-urgent mt-3 text-sm">{errorMessage}</p>}
		</div>
	);
};

export default NewsletterSignup;
