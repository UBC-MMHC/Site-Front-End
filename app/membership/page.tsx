"use client";
import "../globals.css";
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

export default function MembershipPage() {
	const router = useRouter();
	const { isLoggedIn, isLoading: authLoading } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [isCheckingStatus, setIsCheckingStatus] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [membershipType, setMembershipType] = useState<MembershipType>(MembershipType.UBC_STUDENT);
	const [existingMembership, setExistingMembership] = useState<MyMembershipStatus | null>(null);
	const [userEmail, setUserEmail] = useState<string>("");
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.STRIPE);
	const [registrationComplete, setRegistrationComplete] = useState(false);

	const isStudentType =
		membershipType === MembershipType.UBC_STUDENT ||
		membershipType === MembershipType.NON_UBC_STUDENT;

	useEffect(() => {
		const checkExistingMembership = async () => {
			if (authLoading) return;

			if (!isLoggedIn) {
				setIsCheckingStatus(false);
				return;
			}

			try {
				const meRes = await fetch("/api/auth/me", { credentials: "include" });
				if (meRes.ok) {
					const userData = await meRes.json();
					setUserEmail(userData.email || "");
				}
			} catch {
				// Could not fetch user email - ignore
			}

			try {
				const status = await getMyMembershipStatus();
				console.log("Membership status received:", status);
				setExistingMembership(status);

				if (status.isPaid) {
					router.push("/dashboard");
					return;
				}
			} catch (err) {
				console.error("Membership check error:", err);
			} finally {
				setIsCheckingStatus(false);
			}
		};

		checkExistingMembership();
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

	if (isCheckingStatus) {
		return (
			<div className="bg-primary-bg flex min-h-screen items-center justify-center">
				<div className="text-grey-text/60 animate-subtle-pulse">Loading...</div>
			</div>
		);
	}

	if (existingMembership?.hasMembership && !existingMembership.isPaid) {
		return (
			<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center px-6 pt-32 pb-12">
				<div className="animate-slide-up w-full max-w-md text-center">
					<h1 className="mb-3 text-4xl font-light tracking-tight">Complete your payment</h1>
					<p className="text-grey-text/70 mb-10 font-light">
						You&apos;re almost there. Finish setting up your{" "}
						<span className="text-primary-text">
							{existingMembership.membershipType?.replace(/_/g, " ").toLowerCase()}
						</span>{" "}
						membership.
					</p>

					<button
						onClick={handleRetryPayment}
						disabled={isLoading}
						className="bg-accent-2 w-full rounded-lg py-3.5 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
					>
						{isLoading ? "Redirecting..." : "Continue to Payment"}
					</button>

					{error && <p className="mt-4 text-sm text-red-400">{error}</p>}

					<p className="text-grey-text/50 mt-8 text-sm">
						Need help?{" "}
						<a href="mailto:ubcmmhc@gmail.com" className="text-accent-2 hover:underline">
							Contact us
						</a>
					</p>
				</div>
			</div>
		);
	}

	if (registrationComplete) {
		return (
			<div className="text-primary-text flex min-h-screen flex-col items-center px-6 pt-32 pb-12">
				<div className="animate-slide-up w-full max-w-md text-center">
					<div className="mb-6 flex justify-center">
						<div className="bg-accent-2/10 text-accent-2 flex h-20 w-20 items-center justify-center rounded-full text-4xl">
							✓
						</div>
					</div>
					<h1 className="mb-3 text-4xl font-light tracking-tight">Registration Received</h1>
					<p className="text-grey-text/70 mb-8 font-light">
						Thank you for registering! Since you selected{" "}
						<span className="text-primary-text font-medium">{paymentMethod}</span>, your membership
						will be activated once we verify your payment.
					</p>

					<div className="mb-8 rounded-lg p-6 text-left">
						<h3 className="mb-2 font-medium">Next Steps:</h3>
						<ul className="text-grey-text/80 space-y-2 text-sm font-light">
							{paymentMethod === PaymentMethod.ETRANSFER && (
								<li>
									• Please send an e-transfer to{" "}
									<span className="text-primary-text font-medium">narimanimatin5@gmail.com</span>
								</li>
							)}
							{paymentMethod === PaymentMethod.CASH && (
								<li>• Please provide the cash to an executive member at our next event.</li>
							)}
							{paymentMethod === PaymentMethod.OTHER && (
								<li>• An executive member will contact you to arrange payment.</li>
							)}
							<li>• Include your full name in the payment description/notes.</li>
							<li>• You will receive a confirmation email once your membership is approved.</li>
						</ul>
					</div>

					<button
						onClick={() => router.push("/")}
						className="bg-accent-2 w-full rounded-lg py-3.5 font-medium text-white transition hover:opacity-90"
					>
						Return to Home
					</button>

					<p className="text-grey-text/50 mt-8 text-sm">
						Questions?{" "}
						<a href="mailto:ubcmmhc@gmail.com" className="text-accent-2 hover:underline">
							Contact us
						</a>
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center px-6 pt-24 pb-12">
			<div className="animate-slide-up w-full max-w-md">
				<h1 className="mb-2 text-center text-4xl font-light tracking-tight">Become a Member</h1>
				<p className="text-grey-text/70 mb-10 text-center font-light">
					Join UBC Men&apos;s Mental Health Club
				</p>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Full Name */}
					<div>
						<label htmlFor="fullName" className="text-grey-text/80 mb-2 block text-sm">
							Full Name
						</label>
						<input
							id="fullName"
							name="fullName"
							type="text"
							required
							disabled={isLoading}
							className="border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:border-accent-2 w-full border-0 border-b bg-transparent px-0 py-3 focus:outline-none"
							placeholder="John Doe"
						/>
					</div>

					{/* Email */}
					<div>
						<label htmlFor="email" className="text-grey-text/80 mb-2 block text-sm">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							disabled={isLoading}
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
							className="border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:border-accent-2 w-full border-0 border-b bg-transparent px-0 py-3 focus:outline-none"
							placeholder="you@example.com"
						/>
					</div>

					{/* Membership Type */}
					<div>
						<label htmlFor="membershipType" className="text-grey-text/80 mb-2 block text-sm">
							Membership Type
						</label>
						<select
							id="membershipType"
							name="membershipType"
							required
							disabled={isLoading}
							value={membershipType}
							onChange={(e) => setMembershipType(e.target.value as MembershipType)}
							className="border-grey-text/30 text-primary-text focus:border-accent-2 w-full cursor-pointer border-0 border-b bg-transparent px-0 py-3 focus:outline-none"
						>
							<option value={MembershipType.UBC_STUDENT} className="bg-primary-bg">
								UBC Student
							</option>
							<option value={MembershipType.NON_UBC_STUDENT} className="bg-primary-bg">
								Non-UBC Student
							</option>
							<option value={MembershipType.NON_STUDENT} className="bg-primary-bg">
								Non-Student
							</option>
						</select>
					</div>

					{/* Student ID */}
					{isStudentType && (
						<div className="animate-slide-up">
							<label htmlFor="studentId" className="text-grey-text/80 mb-2 block text-sm">
								Student ID <span className="text-grey-text/50">(optional)</span>
							</label>
							<input
								id="studentId"
								name="studentId"
								type="text"
								disabled={isLoading}
								className="border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:border-accent-2 w-full border-0 border-b bg-transparent px-0 py-3 focus:outline-none"
								placeholder="12345678"
							/>
						</div>
					)}

					{/* Instagram */}
					<div>
						<label htmlFor="instagram" className="text-grey-text/80 mb-2 block text-sm">
							Instagram <span className="text-grey-text/50">(optional)</span>
						</label>
						<input
							id="instagram"
							name="instagram"
							type="text"
							disabled={isLoading}
							className="border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:border-accent-2 w-full border-0 border-b bg-transparent px-0 py-3 focus:outline-none"
							placeholder="@yourhandle"
						/>
					</div>

					{/* Checkboxes */}
					<div className="space-y-4 pt-4">
						<label className="group flex cursor-pointer items-center gap-3">
							<input
								type="checkbox"
								name="instagramGroupchat"
								disabled={isLoading}
								className="border-grey-text/30 accent-accent-2 h-5 w-5 rounded"
							/>
							<span className="text-grey-text/80 group-hover:text-grey-text text-sm transition">
								Add me to the Instagram group chat
							</span>
						</label>

						<label className="group flex cursor-pointer items-center gap-3">
							<input
								type="checkbox"
								name="newsletterOptIn"
								disabled={isLoading}
								className="border-grey-text/30 accent-accent-2 h-5 w-5 rounded"
							/>
							<span className="text-grey-text/80 group-hover:text-grey-text text-sm transition">
								Subscribe to our newsletter
							</span>
						</label>
					</div>

					{/* Payment Method */}
					<div>
						<label htmlFor="paymentMethod" className="text-grey-text/80 mb-2 block text-sm">
							Payment Method
						</label>
						<select
							id="paymentMethod"
							name="paymentMethod"
							required
							disabled={isLoading}
							value={paymentMethod}
							onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
							className="border-grey-text/30 text-primary-text focus:border-accent-2 w-full cursor-pointer border-0 border-b bg-transparent px-0 py-3 focus:outline-none"
						>
							<option value={PaymentMethod.STRIPE} className="bg-primary-bg">
								Credit Card
							</option>
							<option value={PaymentMethod.ETRANSFER} className="bg-primary-bg">
								E-Transfer
							</option>
							<option value={PaymentMethod.CASH} className="bg-primary-bg">
								Cash
							</option>
							<option value={PaymentMethod.OTHER} className="bg-primary-bg">
								Other
							</option>
						</select>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={isLoading}
						className="bg-accent-2 mt-6 w-full rounded-lg py-3.5 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
					>
						{isLoading ? "Processing..." : "Continue to Payment"}
					</button>

					{error && <p className="text-center text-sm text-red-400">{error}</p>}
				</form>
			</div>
		</div>
	);
}
