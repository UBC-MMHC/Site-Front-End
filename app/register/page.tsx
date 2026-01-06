"use client";
import "../globals.css";
import { useState } from "react";
import { register } from "@/components/api/auth";
// import {useCsrfInit} from "@/hooks/csrfInit";
import { useRouter } from "next/navigation";
import { validatePassword } from "@/utils/validatePassword";

export default function RegisterPage() {
  // useCsrfInit();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);

    try {
      register(email, password);

      router.push("/login");
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
    <div className="flex min-h-screen flex-col items-center pt-24 bg-primary-bg text-primary-text">
      <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font text-center mb-8">Register</h1>

        {/* Email & Password */}
        <form onSubmit={handleRegister} className="space-y-4">
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? "Registering User..." : "Register"}
          </button>

          {error && <p className="text-sm mt-2 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
