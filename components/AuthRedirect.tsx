"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn && window.location.pathname === "/") {
      router.push("/dashboard");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
