"use client";
import "../globals.css";
import { useState } from "react";
import { forgot_password } from "@/components/api/auth";
import { useCsrfInit } from "@/hooks/csrfInit";

export default function ForgotPasswordPage() {
  useCsrfInit();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      await forgot_password(email);
      setMessage("If you have an account, an email to reset your password has been sent.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center pt-24 bg-primary-bg text-primary-text">
      <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font text-center mb-8">Forgot Password</h1>

        {/* Password */}
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition"
          >
            {isLoading ? "Email Sent" : "Forgot Password"}
          </button>
          {message && <p className={`text-sm mt-2 ${error ? "text-red-500" : "text-green-500"}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
}
