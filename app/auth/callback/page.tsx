"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { API_ROUTES_URL } from "@/app/constants";

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

	return (
		<div className="bg-primary-bg flex min-h-screen items-center justify-center">
			<div className="text-center">
				<div className="border-accent-2/30 border-t-accent-2 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2" />
				<p className="text-grey-text">Completing sign in...</p>
			</div>
		</div>
	);
}

export default function AuthCallbackPage() {
	return (
		<Suspense
			fallback={
				<div className="bg-primary-bg flex min-h-screen items-center justify-center">
					<div className="text-center">
						<div className="border-accent-2/30 border-t-accent-2 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2" />
						<p className="text-grey-text">Completing sign in...</p>
					</div>
				</div>
			}
		>
			<AuthCallbackContent />
		</Suspense>
	);
}
