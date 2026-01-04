"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallbackPage() {
    const router = useRouter();
    const { setIsLoggedIn } = useAuth();

    useEffect(() => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");

        router.push("/dashboard");
    }, [router, setIsLoggedIn]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-primary-bg">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-accent-2/30 border-t-accent-2 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-grey-text">Completing sign in...</p>
            </div>
        </div>
    );
}
