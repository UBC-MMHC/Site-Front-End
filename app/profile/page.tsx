"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage(): React.ReactElement | null {
    const { isLoggedIn, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, isLoading, router]);

    if (isLoading) {
        return (
            <div className="bg-primary-bg flex min-h-screen items-center justify-center">
                <div className="border-accent-2/30 border-t-accent-2 h-8 w-8 animate-spin rounded-full border-2" />
            </div>
        );
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center justify-center px-6">
            <div className="w-full max-w-xl text-center">
                <h1 className="text-primary-text mb-6 text-5xl font-semibold tracking-tight md:text-6xl">
                    Your profile.
                    <br />
                    Updated.
                </h1>

                <p className="text-grey-text/80 mx-auto max-w-md text-xl leading-relaxed font-light">
                    An updated experience is on the way.
                </p>
            </div>
        </div>
    );
}
