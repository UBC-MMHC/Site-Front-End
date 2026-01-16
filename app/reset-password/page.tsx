"use client";
import "../globals.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { reset_password } from "@/components/api/auth";
import { validatePassword } from "@/utils/validatePassword";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const token = searchParams.get("token");

    if (!token) {
      setError("Error: Token is missing from the URL.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      await reset_password(token, password);
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center pt-24 bg-primary-bg text-primary-text">
      <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font text-center mb-8">Reset Password</h1>

        {/* Password */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            name="password"
            type="password"
            placeholder="********"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition disabled:opacity-50"
          >
            Reset Password
          </button>

          {error && <p className="text-sm mt-2 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-24 bg-primary-bg text-primary-text">
      <Suspense fallback={<div className="text-center">Loading reset form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
