"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { MyMembershipStatus } from "@/components/api/membership";
import { getMyMembershipStatus } from "@/components/api/membership";
import Link from "next/link";

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
		return (
			<div className="bg-primary-bg flex min-h-screen items-center justify-center">
				<div className="text-grey-text/60 animate-subtle-pulse">Loading...</div>
			</div>
		);
	}

	if (!membershipStatus?.hasMembership) {
		return null;
	}

	return (
		<>
			{!membershipStatus.isPaid && (
				<div className="animate-slide-up fixed top-16 right-0 left-0 z-40 border-b border-amber-500/20 bg-amber-500/10 px-4 py-3 backdrop-blur-sm">
					<div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
						<p className="text-sm text-amber-200/90">
							Complete your payment to unlock full access
						</p>
						<Link
							href="/membership"
							className="rounded-md bg-amber-500 px-4 py-1.5 text-sm font-medium text-black transition hover:bg-amber-400"
						>
							Complete
						</Link>
					</div>
				</div>
			)}
			<div className={!membershipStatus.isPaid ? "pt-12" : ""}>{children}</div>
		</>
	);
}
