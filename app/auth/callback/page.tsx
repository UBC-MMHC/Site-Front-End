"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { API_ROUTES_URL } from "@/app/constants";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setIsLoggedIn } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");

        async function setTokenCookie() {
            if (token) {
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
                    }
                } catch (error) {
                    console.error("Failed to set token:", error);
                }
            }

            router.push("/dashboard");
        }

        setTokenCookie();
    }, [router, searchParams, setIsLoggedIn]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-primary-bg">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-accent-2/30 border-t-accent-2 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-grey-text">Completing sign in...</p>
            </div>
        </div>
    );
}

