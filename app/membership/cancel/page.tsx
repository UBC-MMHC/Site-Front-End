"use client";
import "../../globals.css";
import Link from "next/link";

export default function MembershipCancelPage() {
	return (
		<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center justify-center px-6">
			<div className="animate-slide-up w-full max-w-sm text-center">
				<div className="bg-grey-text/20 mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full">
					<svg
						className="text-grey-text/60 h-7 w-7"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>

				<h1 className="mb-3 text-3xl font-light tracking-tight">Payment cancelled</h1>
				<p className="text-grey-text/70 mb-10 font-light">
					No charges were made.
					<br />
					You can try again whenever you&apos;re ready.
				</p>

				<div className="space-y-3">
					<Link
						href="/membership"
						className="bg-accent-2 inline-block w-full rounded-lg py-3.5 font-medium text-white transition hover:opacity-90"
					>
						Try Again
					</Link>

					<Link
						href="/"
						className="text-grey-text/70 hover:text-grey-text inline-block w-full py-3.5 font-medium transition"
					>
						Return Home
					</Link>
				</div>
			</div>
		</div>
	);
}
