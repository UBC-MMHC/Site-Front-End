"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getMyMembershipStatus, MyMembershipStatus } from "@/components/api/membership";
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

  // Not logged in - return null while redirect happens
  if (!authLoading && !isLoggedIn) {
    return null;
  }

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-bg">
        <div className="text-grey-text/60 animate-subtle-pulse">Loading...</div>
      </div>
    );
  }

  // No membership - will redirect
  if (!membershipStatus?.hasMembership) {
    return null;
  }

  return (
    <>
      {/* Subtle payment reminder banner */}
      {!membershipStatus.isPaid && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-amber-500/10 backdrop-blur-sm border-b border-amber-500/20 px-4 py-3 animate-slide-up">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <p className="text-sm text-amber-200/90">Complete your payment to unlock full access</p>
            <Link
              href="/membership"
              className="px-4 py-1.5 bg-amber-500 text-black text-sm font-medium rounded-md hover:bg-amber-400 transition"
            >
              Complete
            </Link>
          </div>
        </div>
      )}

      {/* Content with padding when banner is shown */}
      <div className={!membershipStatus.isPaid ? "pt-12" : ""}>{children}</div>
    </>
  );
}
