"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { API_ROUTES_URL } from "@/app/constants";
import { AuthSpinner } from "@/components/layout/AuthLoading";

function AuthCallbackContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { setIsLoggedIn } = useAuth();

	useEffect(() => {
		const token = searchParams.get("token");

		async function setTokenCookie() {
			if (!token) {
				console.error("No token provided in callback");
				router.push("/login?error=missing_token");
				return;
			}

			try {
				const res = await fetch(API_ROUTES_URL.set_token, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token }),
					credentials: "include",
				});

				if (res.ok) {
					setIsLoggedIn(true);
					localStorage.setItem("isLoggedIn", "true");
					router.push("/dashboard");
				} else {
					console.error("Failed to set token: server returned", res.status);
					router.push("/login?error=auth_failed");
				}
			} catch (error) {
				console.error("Failed to set token:", error);
				router.push("/login?error=auth_failed");
			}
		}

		setTokenCookie();
	}, [router, searchParams, setIsLoggedIn]);

	return <AuthSpinner message="Completing sign in…" />;
}

export default function AuthCallbackPage() {
	return (
		<Suspense fallback={<AuthSpinner message="Completing sign in…" />}>
			<AuthCallbackContent />
		</Suspense>
	);
}
