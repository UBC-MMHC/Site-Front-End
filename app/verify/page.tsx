"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {checkToken} from "@/components/api/auth";

export default function Verify() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const [message, setMessage] = useState("Verifying...");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const text = await checkToken(email, token);
                setMessage("Verified successfully!");
                setSuccess(true);
                router.push(text.redirectUrl);
                setError(false);
            }catch(err){
                setMessage("Server error");
                setError(true);
            }
        };

        verifyToken();
    }, [token, email, router]);

    return (
        <div className="flex min-h-screen flex-col items-center pt-24 bg-background text-foreground">
            <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">
                    {success ? "Success!" : error ? "Verification Failed" : "Verifying..."}
                </h1>
                <p className={`text-center ${error ? "text-destructive" : "text-accent"}`}>
                    {message}
                </p>
            </div>
        </div>
    );
}
