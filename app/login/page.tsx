"use client"
import "../globals.css";
import {useState} from "react";
import {login, loginWithGoogle} from "@/components/api/auth";
import {useCsrfInit} from "@/hooks/csrfInit";
import { useRouter } from 'next/navigation';

export default function LoginPage(){
    useCsrfInit();

    const router = useRouter();

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

            router.push('/dashboard');

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
        <div className="flex min-h-screen flex-col items-center pt-24 bg-background text-foreground">
            <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font text-center mb-8">Login</h1>

                {/* Email & Password */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="********"
                        required
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
                    />

                    <div className="flex justify-end mt-1">
                        <button
                            type="button"
                            onClick={() => router.push('/forgot-password')}
                            className="text-xs text-muted-foreground hover:text-primary transition hover:cursor-pointer"
                            disabled={isLoading}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition disabled:opacity-50"
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    {error && (
                        <p className="text-sm mt-2 text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        onClick={() => router.push('/register')}
                        disabled={isLoading}
                        className="w-full py-3 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground text-foreground font-medium rounded-md transition disabled:opacity-50"                    >
                        {isLoading ? "Redirecting..." : "Sign Up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-8">
                    <div className="flex-grow h-px bg-border" />
                    <span className="mx-3 text-muted-foreground text-sm">or</span>
                    <div className="flex-grow h-px bg-border" />
                </div>

                {/* Google */}
                <button
                    onClick={() => loginWithGoogle()}
                    disabled={isLoading}
                    className="flex items-center justify-center w-full py-3 border border-border rounded-md hover:bg-accent transition"
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        className="w-6 h-6 mr-3"
                    />
                    <span className="text-foreground font-medium">
            Continue with Google
          </span>
                </button>
            </div>
        </div>
    );
}