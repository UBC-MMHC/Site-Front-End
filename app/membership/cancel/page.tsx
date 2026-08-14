"use client";

import Link from "next/link";
import {
	FormButton,
	FormCard,
	FormFooterLink,
	FormHeader,
	FormPageShell,
} from "@/components/ui/form";
import { textMuted } from "@/lib/theme";

export default function MembershipCancelPage() {
	return (
		<FormPageShell>
			<FormCard className="animate-slide-up text-center">
				<div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-surface-elevated">
					<svg
						className={`h-7 w-7 ${textMuted}`}
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

				<FormHeader
					title="Payment cancelled"
					description="No charges were made. You can try again whenever you're ready."
				/>

				<div className="mt-8 space-y-3">
					<Link href="/membership" className="block">
						<FormButton variant="primary">Try Again</FormButton>
					</Link>
					<FormFooterLink href="/">Return Home</FormFooterLink>
				</div>
			</FormCard>
		</FormPageShell>
	);
}
