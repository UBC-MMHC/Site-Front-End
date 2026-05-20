"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import {
	FormButton,
	FormCard,
	FormHeader,
	FormPageShell,
} from "@/components/ui/form";
import { loadingPulse } from "@/lib/theme";

function SuccessContent() {
	const [isVerifying, setIsVerifying] = useState(true);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVerifying(false);
			setTimeout(() => setShowContent(true), 100);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	if (isVerifying) {
		return <p className={loadingPulse}>Confirming payment…</p>;
	}

	return (
		<div
			className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}
		>
			<div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-theme-accent">
				<svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
				</svg>
			</div>

			<FormHeader
				title="Welcome to the Club"
				description="Your membership is now active. Thank you for joining us."
			/>

			<Link href="/dashboard" className="mt-8 block">
				<FormButton variant="primary">Go to Dashboard</FormButton>
			</Link>
		</div>
	);
}

export default function MembershipSuccessPage() {
	return (
		<FormPageShell>
			<FormCard className="text-center">
				<Suspense fallback={<p className={loadingPulse}>Loading…</p>}>
					<SuccessContent />
				</Suspense>
			</FormCard>
		</FormPageShell>
	);
}
