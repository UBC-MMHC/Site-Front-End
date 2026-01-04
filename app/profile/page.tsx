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
            <div className="flex min-h-screen items-center justify-center bg-primary-bg">
                <div className="w-8 h-8 border-2 border-accent-2/30 border-t-accent-2 rounded-full animate-spin" />
            </div>
        );
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-primary-bg text-primary-text">
            <div className="max-w-xl w-full text-center">

                <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-primary-text">
                    Your profile.
                    <br />
                    Updated.
                </h1>

                <p className="text-xl text-grey-text/80 font-light max-w-md mx-auto leading-relaxed">
                    An updated experience is on the way.
                </p>
            </div>
        </div>
    );
}
