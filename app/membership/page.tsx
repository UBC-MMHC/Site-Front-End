"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { MembershipRegistrationData, MyMembershipStatus } from "@/components/api/membership";
import {
	registerMembership,
	retryPayment,
	getMyMembershipStatus,
	MembershipType,
	PaymentMethod,
} from "@/components/api/membership";
import {
	FormCard,
	FormCheckbox,
	FormField,
	FormHeader,
	FormInput,
	FormPageShell,
	FormSelect,
	FormSubmitButton,
} from "@/components/ui/form";

const benefits = [
	{
		title: "Access to Core Events",
		description: "Discussions, journaling sessions, and book talks",
	},
	{
		title: "Free Journal",
		description: "Receives a free journal (retails for >$15).",
	},
	{
		title: "Discord Community Access",
		description: "Verify your membership on our Discord community server to gain access!",
	},
	{
		title: "Discounts on Paid Events",
		description: "Enjoy exclusive member pricing on all events.",
	},
] as const;

function MembershipBenefits({ className = "" }: { className?: string }) {
	return (
		<div className={className}>
			<div className="mb-5 h-px w-8 rounded-full bg-zinc-600" />
			<h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Benefits</h2>
			<p className="mt-1 mb-5 text-sm font-light text-fg-muted">Your membership pays for itself.</p>
			<div className="space-y-4">
				{benefits.map((benefit) => (
					<div key={benefit.title}>
						<div className="flex items-center gap-2">
							<span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-400" />
							<h3 className="text-sm font-medium text-page-fg">{benefit.title}</h3>
						</div>
						<p className="mt-0.5 pl-3.5 text-xs leading-relaxed text-fg-muted">{benefit.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function MobileBenefitsDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	if (!isOpen) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden
			/>
			<div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-page px-6 pt-4 pb-10 shadow-2xl">
				<div className="mb-4 flex justify-center">
					<div className="h-1 w-10 rounded-full bg-zinc-700" />
				</div>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-fg-muted transition hover:bg-zinc-300 hover:text-page-fg dark:bg-surface-elevated dark:hover:bg-theme-accent-muted/25"
					aria-label="Close benefits"
				>
					✕
				</button>
				<MembershipBenefits />
			</div>
		</>
	);
}

export default function MembershipPage() {
	const router = useRouter();
	const { isLoggedIn, isLoading: authLoading } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [isCheckingStatus, setIsCheckingStatus] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [membershipType, setMembershipType] = useState<MembershipType>(MembershipType.UBC_STUDENT);
	const [existingMembership, setExistingMembership] = useState<MyMembershipStatus | null>(null);
	const [userEmail, setUserEmail] = useState("");
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.STRIPE);
	const [registrationComplete, setRegistrationComplete] = useState(false);
	const [showBenefits, setShowBenefits] = useState(false);

	const isStudentType =
		membershipType === MembershipType.UBC_STUDENT ||
		membershipType === MembershipType.NON_UBC_STUDENT;

	useEffect(() => {
		if (authLoading) return;

		if (!isLoggedIn) {
			setIsCheckingStatus(false);
			return;
		}

		let cancelled = false;
		setIsCheckingStatus(true);

		const timeout = window.setTimeout(() => {
			if (!cancelled) setIsCheckingStatus(false);
		}, 8000);

		const checkExistingMembership = async () => {
			try {
				const meRes = await fetch("/api/auth/me", { credentials: "include" });
				if (!cancelled && meRes.ok) {
					const userData = await meRes.json();
					setUserEmail(userData.email || "");
				}
			} catch {
				// Could not fetch user email
			}

			try {
				const status = await getMyMembershipStatus();
				if (cancelled) return;

				setExistingMembership(status);

				if (status.isPaid) {
					router.push("/dashboard");
					return;
				}
			} catch (err) {
				console.error("Membership check error:", err);
			} finally {
				if (!cancelled) setIsCheckingStatus(false);
				window.clearTimeout(timeout);
			}
		};

		checkExistingMembership();

		return () => {
			cancelled = true;
			window.clearTimeout(timeout);
		};
	}, [isLoggedIn, authLoading, router]);

	const handleRetryPayment = async () => {
		if (isLoading) return;
		setError(null);
		setIsLoading(true);

		try {
			const response = await retryPayment();
			if (response.sessionUrl) {
				window.location.href = response.sessionUrl;
			}
		} catch (err: unknown) {
			setIsLoading(false);
			setError(err instanceof Error ? err.message : "An error occurred");
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLoading) return;

		setError(null);
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const data: MembershipRegistrationData = {
			fullName: formData.get("fullName") as string,
			email: formData.get("email") as string,
			membershipType: formData.get("membershipType") as MembershipType,
			studentId: isStudentType ? (formData.get("studentId") as string) || undefined : undefined,
			instagram: (formData.get("instagram") as string) || undefined,
			instagramGroupchat: formData.get("instagramGroupchat") === "on",
			newsletterOptIn: formData.get("newsletterOptIn") === "on",
			paymentMethod: paymentMethod,
		};

		try {
			const response = await registerMembership(data);
			if (paymentMethod === PaymentMethod.STRIPE && response.sessionUrl) {
				window.location.href = response.sessionUrl;
			} else {
				setIsLoading(false);
				setRegistrationComplete(true);
			}
		} catch (err: unknown) {
			setIsLoading(false);
			setError(err instanceof Error ? err.message : "An error occurred");
		}
	};

	const showAuthLoading = authLoading && isLoggedIn;
	const showStatusLoading = isLoggedIn && isCheckingStatus;

	if (showAuthLoading || showStatusLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-page">
				<p className="animate-subtle-pulse text-fg-muted">Loading…</p>
			</div>
		);
	}

	if (existingMembership?.hasMembership && !existingMembership.isPaid) {
		return (
			<FormPageShell>
				<FormCard className="text-center">
					<h1 className="mb-3 text-3xl font-semibold tracking-tight text-page-fg">Complete your payment</h1>
					<p className="mb-10 text-fg-muted">
						You&apos;re almost there. Finish setting up your{" "}
						<span className="font-medium text-page-fg">
							{existingMembership.membershipType?.replace(/_/g, " ").toLowerCase()}
						</span>{" "}
						membership.
					</p>
					<button
						type="button"
						onClick={handleRetryPayment}
						disabled={isLoading}
						className="w-full rounded-full bg-pill py-3.5 text-sm font-semibold text-pill-fg transition hover:opacity-90 disabled:opacity-50"
					>
						{isLoading ? "Redirecting…" : "Continue to Payment"}
					</button>
					{error && <p className="mt-4 text-sm text-red-400">{error}</p>}
					<p className="mt-8 text-sm text-fg-muted">
						Need help?{" "}
						<a href="mailto:ubcmmhc@gmail.com" className="text-fg-muted hover:underline">
							Contact us
						</a>
					</p>
				</FormCard>
			</FormPageShell>
		);
	}

	if (registrationComplete) {
		return (
			<FormPageShell>
				<FormCard className="text-center">
					<div className="mb-6 flex justify-center">
						<div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200 text-4xl text-emerald-600 dark:bg-surface-elevated dark:text-emerald-400">
							✓
						</div>
					</div>
					<h1 className="mb-3 text-3xl font-semibold tracking-tight text-page-fg">Registration received</h1>
					<p className="mb-6 text-fg-muted">
						Thank you for registering. Since you selected{" "}
						<span className="font-medium text-page-fg">{paymentMethod}</span>, your membership will be
						activated once we verify your payment.
					</p>
					<div className="mb-8 rounded-xl border border-border bg-surface p-4 text-left text-sm text-fg-muted">
						<h3 className="mb-2 font-medium text-page-fg">Next steps</h3>
						<ul className="space-y-2">
							{paymentMethod === PaymentMethod.ETRANSFER && (
								<>
									<li>Send an e-transfer to narimanimatin5@gmail.com</li>
									<li>Include your full name and student ID in the notes.</li>
								</>
							)}
							{paymentMethod === PaymentMethod.CASH && (
								<li>Provide cash to an executive member at our next event.</li>
							)}
							{paymentMethod === PaymentMethod.OTHER && (
								<li>An executive member will contact you to arrange payment.</li>
							)}
						</ul>
					</div>
					<button
						type="button"
						onClick={() => router.push("/")}
						className="w-full rounded-full bg-pill py-3.5 text-sm font-semibold text-pill-fg transition hover:opacity-90"
					>
						Return to Home
					</button>
				</FormCard>
			</FormPageShell>
		);
	}

	return (
		<div className="min-h-screen w-full bg-page px-4 pt-28 pb-32">
			<div className="mx-auto w-full max-w-5xl">
				<div className="xl:grid xl:grid-cols-2 xl:items-start xl:gap-16">
					<FormCard>
						<FormHeader
							title="Become a Member"
							description="Join UBC Men's Mental Health Club"
						/>

						<form data-form-ui onSubmit={handleSubmit} className="space-y-5">
							<FormField label="Full Name" htmlFor="fullName">
								<FormInput
									id="fullName"
									name="fullName"
									type="text"
									required
									disabled={isLoading}
									placeholder="John Doe"
								/>
							</FormField>

							<FormField label="Email" htmlFor="email">
								<FormInput
									id="email"
									name="email"
									type="email"
									required
									disabled={isLoading}
									value={userEmail}
									onChange={(e) => setUserEmail(e.target.value)}
									placeholder="you@example.com"
								/>
							</FormField>

							<FormField label="Membership Type" htmlFor="membershipType">
								<FormSelect
									id="membershipType"
									name="membershipType"
									required
									disabled={isLoading}
									value={membershipType}
									onChange={(e) => setMembershipType(e.target.value as MembershipType)}
								>
									<option value={MembershipType.UBC_STUDENT}>UBC Student</option>
									<option value={MembershipType.NON_UBC_STUDENT}>Non-UBC Student</option>
									<option value={MembershipType.NON_STUDENT}>Non-Student</option>
								</FormSelect>
							</FormField>

							{isStudentType && (
								<FormField label="Student ID" htmlFor="studentId" optional>
									<FormInput
										id="studentId"
										name="studentId"
										type="text"
										disabled={isLoading}
										placeholder="12345678"
									/>
								</FormField>
							)}

							<FormField label="Instagram" htmlFor="instagram" optional>
								<FormInput
									id="instagram"
									name="instagram"
									type="text"
									disabled={isLoading}
									placeholder="@yourhandle"
								/>
							</FormField>

							<div className="space-y-3 pt-2">
								<FormCheckbox
									name="instagramGroupchat"
									disabled={isLoading}
									label="Add me to the Instagram group chat"
								/>
								<FormCheckbox
									name="newsletterOptIn"
									disabled={isLoading}
									label="Subscribe to our newsletter"
								/>
							</div>

							<FormField label="Payment Method" htmlFor="paymentMethod">
								<FormSelect
									id="paymentMethod"
									name="paymentMethod"
									required
									disabled={isLoading}
									value={paymentMethod}
									onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
								>
									<option value={PaymentMethod.STRIPE}>Credit Card</option>
									<option value={PaymentMethod.ETRANSFER}>E-Transfer</option>
									<option value={PaymentMethod.CASH}>Cash</option>
									<option value={PaymentMethod.OTHER}>Other</option>
								</FormSelect>
							</FormField>

							<FormSubmitButton disabled={isLoading} className="mt-2">
								{isLoading ? "Processing…" : "Continue to Payment"}
							</FormSubmitButton>

							{error && <p className="text-center text-sm text-red-400">{error}</p>}
						</form>
					</FormCard>

					<MembershipBenefits className="mt-10 hidden xl:block" />
				</div>
			</div>

			<button
				type="button"
				onClick={() => setShowBenefits(true)}
				className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-pill px-5 py-3 text-sm font-medium text-pill-fg shadow-lg transition hover:opacity-90 active:scale-95 xl:hidden"
			>
				<span aria-hidden>✦</span>
				View Benefits
			</button>

			<MobileBenefitsDrawer isOpen={showBenefits} onClose={() => setShowBenefits(false)} />
		</div>
	);
}
