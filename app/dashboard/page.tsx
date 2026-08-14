"use client";

import React, { useState, useEffect } from "react";
import { API_ROUTES_URL } from "@/app/constants";
import MembershipGate from "@/components/MembershipGate";
import DarkPageShell from "@/components/layout/DarkPageShell";
import { FormInput, FormMessage, FormSubmitButton } from "@/components/ui/form";
import { centerPage, contentColumn, copyColumn, formColumn, textHeading, textMuted } from "@/lib/theme";

export default function DashboardPage(): React.ReactElement {
	const [email, setEmail] = useState("");
	const [isSubscribing, setIsSubscribing] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error" | "already_subscribed">("idle");

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
				// Could not check subscription status - ignore
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
		<MembershipGate>
			<DarkPageShell className={centerPage}>
				<div className={contentColumn}>
					<h1 className={`mb-6 text-5xl font-semibold tracking-tight md:text-6xl ${textHeading}`}>
						Something new
						<br />
						is coming.
					</h1>

					<p className={`text-xl leading-relaxed font-light ${textMuted} ${copyColumn}`}>
						We&apos;re crafting an experience worth waiting for.
					</p>

					<div className="mt-12">
						{status === "success" || status === "already_subscribed" ? (
							<p className={textMuted}>
								{status === "already_subscribed"
									? "You're already subscribed to our newsletter."
									: "Thank you. We'll be in touch."}
							</p>
						) : (
							<>
								<p className={`mb-4 text-sm ${textMuted}`}>Get notified when we launch.</p>
								<form
									data-form-ui
									onSubmit={handleSubmit}
									className={`space-y-3 text-left ${formColumn}`}
								>
									<FormInput
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Email address"
										required
										disabled={isSubscribing}
									/>
									<FormSubmitButton disabled={isSubscribing || !email}>
										{isSubscribing ? "Subscribing…" : "Notify me"}
									</FormSubmitButton>
								</form>
								{status === "error" && (
									<div className="mt-3">
										<FormMessage type="error">Please try again.</FormMessage>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</DarkPageShell>
		</MembershipGate>
	);
}
