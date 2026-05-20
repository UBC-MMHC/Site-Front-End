"use client";
import "../../globals.css";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
	const _searchParams = useSearchParams();
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
		return <div className="text-grey-text/60 animate-subtle-pulse">Confirming payment...</div>;
	}

	return (
		<div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
			<div className="bg-accent-2 mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full">
				<svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
				</svg>
			</div>

			<h1 className="mb-3 text-3xl font-light tracking-tight">Welcome to the Club</h1>
			<p className="text-grey-text/70 mb-10 font-light">
				Your membership is now active.
				<br />
				Thank you for joining us.
			</p>

			<Link
				href="/dashboard"
				className="bg-primary-text text-primary-bg inline-block w-full rounded-lg py-3.5 font-medium transition hover:opacity-90"
			>
				Go to Dashboard
			</Link>
		</div>
	);
}

function LoadingFallback() {
	return <div className="text-grey-text/60 animate-subtle-pulse">Loading...</div>;
}

export default function MembershipSuccessPage() {
	return (
		<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center justify-center px-6">
			<div className="w-full max-w-sm text-center">
				<Suspense fallback={<LoadingFallback />}>
					<SuccessContent />
				</Suspense>
			</div>
		</div>
	);
}
