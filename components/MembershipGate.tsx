"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { MyMembershipStatus } from "@/components/api/membership";
import { getMyMembershipStatus } from "@/components/api/membership";
import Link from "next/link";
import { AuthLoading } from "@/components/layout/AuthLoading";
import { paymentBanner, pillPrimary, textMuted } from "@/lib/theme";

interface MembershipGateProps {
	children: React.ReactNode;
}

export default function MembershipGate({ children }: MembershipGateProps) {
	const { isLoggedIn, isLoading: authLoading, logout } = useAuth();
	const router = useRouter();
	const [membershipStatus, setMembershipStatus] = useState<MyMembershipStatus | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (authLoading) return;

		if (!isLoggedIn) {
			router.push("/login");
			return;
		}

		const checkMembership = async () => {
			try {
				const status = await getMyMembershipStatus();
				setMembershipStatus(status);

				if (!status.hasMembership) {
					router.push("/membership");
				}
			} catch (err) {
				console.error("Membership check failed:", err);
				logout();
				router.push("/login");
			} finally {
				setIsLoading(false);
			}
		};

		checkMembership();
	}, [isLoggedIn, authLoading, router, logout]);

	if (!authLoading && !isLoggedIn) {
		return null;
	}

	if (authLoading || isLoading) {
		return <AuthLoading />;
	}

	if (!membershipStatus?.hasMembership) {
		return null;
	}

	return (
		<>
			{!membershipStatus.isPaid && (
				<div className={`animate-slide-up fixed top-16 right-0 left-0 z-40 ${paymentBanner}`}>
					<div className="mx-auto flex w-full max-w-blog items-center justify-between gap-4 px-4">
						<p className={`text-sm ${textMuted}`}>
							Complete your payment to unlock full access
						</p>
						<Link href="/membership" className={`${pillPrimary} shrink-0 !py-1.5 !text-[0.7rem]`}>
							Complete
						</Link>
					</div>
				</div>
			)}
			<div className={!membershipStatus.isPaid ? "pt-12" : ""}>{children}</div>
		</>
	);
}
