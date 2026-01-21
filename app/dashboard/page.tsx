"use client";

import React, { useState, useEffect } from "react";
import { API_ROUTES_URL } from "@/app/constants";

export default function DashboardPage(): React.ReactElement {
	const [email, setEmail] = useState("");
	const [isSubscribing, setIsSubscribing] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error" | "already_subscribed">(
		"idle"
	);

	useEffect(() => {
		const checkSubscription = async () => {
			try {
				const res = await fetch("/api/auth/me", { credentials: "include" });
				if (res.ok) {
					const userData = await res.json();
					if (userData.newsletterSubscription) {
						setStatus("already_subscribed");
					}
				}
			} catch {
				console.log("Could not check subscription status");
			}
		};
		checkSubscription();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || isSubscribing) return;

		setIsSubscribing(true);
		try {
			const res = await fetch(API_ROUTES_URL.subscribe_email_to_newsletter, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
				credentials: "include",
			});
			if (!res.ok) throw new Error();
			setStatus("success");
			setEmail("");
		} catch {
			setStatus("error");
		} finally {
			setIsSubscribing(false);
		}
	};

	return (
		<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center justify-center px-6">
			<div className="w-full max-w-xl text-center">
				<h1 className="text-primary-text mb-6 text-5xl font-semibold tracking-tight md:text-6xl">
					Something new
					<br />
					is coming.
				</h1>

				<p className="text-grey-text/80 mx-auto max-w-md text-xl leading-relaxed font-light">
					We&apos;re crafting an experience worth waiting for.
				</p>

				<div className="mt-12">
					{status === "success" || status === "already_subscribed" ? (
						<p className="text-grey-text font-light">
							{status === "already_subscribed"
								? "You're already subscribed, we'll let you know when something new comes!"
								: "Thank you. We'll be in touch."}
						</p>
					) : (
						<>
							<p className="text-grey-text/60 mb-4 text-sm">
								Get notified when we launch.
							</p>
							<form
								onSubmit={handleSubmit}
								className="mx-auto flex max-w-xs items-center justify-center gap-2"
							>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Email address"
									required
									disabled={isSubscribing}
									className="border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:border-accent-2 flex-1 border-b bg-transparent px-0 py-2 text-center transition-colors focus:outline-none"
								/>
								<button
									type="submit"
									disabled={isSubscribing || !email}
									className="text-grey-text hover:text-accent-2 p-2 transition-colors disabled:opacity-30"
								>
									<svg
										className="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M14 5l7 7m0 0l-7 7m7-7H3"
										/>
									</svg>
								</button>
							</form>
							{status === "error" && (
								<p className="text-grey-text/60 mt-3 text-xs">Please try again.</p>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
