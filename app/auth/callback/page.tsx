"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallbackPage() {
    const router = useRouter();
    const { checkAuthStatus } = useAuth(); 

    useEffect(() => {
        checkAuthStatus()
            .then(() => {
                router.push("/dashboard");
            })
            .catch(() => {
                router.push("/login?error=unauthorized");
            });
    }, [router, checkAuthStatus]);

    return <div>Completing login...</div>;
}