"use client";
import "../globals.css";
import { useState } from "react";
import Image from "next/image";
import { login, loginWithGoogle } from "@/components/api/auth";
import { useCsrfInit } from "@/hooks/csrfInit";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    useCsrfInit();

    const router = useRouter();
    const { setIsLoggedIn } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await login(email, password);

            setIsLoggedIn(true);
            router.push("/dashboard");
        } catch (err: unknown) {
            setIsLoading(false);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center px-4 pt-24">
            <div className="bg-card text-card-foreground w-full max-w-md rounded-2xl p-8 text-center shadow-lg">
                <h1 className="font mb-8 text-center text-3xl">Login</h1>

                {/* Email & Password */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        disabled={isLoading}
                        className="border-input bg-background text-foreground focus:ring-ring w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="********"
                        required
                        disabled={isLoading}
                        className="border-input bg-background text-foreground focus:ring-ring w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
                    />

                    <div className="mt-1 flex justify-end">
                        <button
                            type="button"
                            onClick={() => router.push("/forgot-password")}
                            className="text-muted-foreground hover:text-primary text-xs transition hover:cursor-pointer"
                            disabled={isLoading}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-primary-foreground w-full rounded-md py-3 font-medium transition hover:opacity-90 disabled:opacity-50"
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        onClick={() => router.push("/register")}
                        disabled={isLoading}
                        className="border-input hover:bg-accent hover:text-accent-foreground text-foreground w-full rounded-md border bg-transparent py-3 font-medium transition disabled:opacity-50"
                    >
                        {isLoading ? "Redirecting..." : "Sign Up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                    <div className="bg-border h-px flex-grow" />
                    <span className="text-muted-foreground mx-3 text-sm">or</span>
                    <div className="bg-border h-px flex-grow" />
                </div>

                {/* Google */}
                <button
                    onClick={() => loginWithGoogle()}
                    disabled={isLoading}
                    className="border-border hover:bg-accent flex w-full items-center justify-center rounded-md border py-3 transition"
                >
                    <Image
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        width={24}
                        height={24}
                        className="mr-3"
                    />
                    <span className="text-foreground font-medium">Continue with Google</span>
                </button>
            </div>
        </div>
    );
}
