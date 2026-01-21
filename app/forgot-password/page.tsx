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
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center pt-24">
			<div className="bg-card text-card-foreground w-full max-w-md rounded-2xl p-8 text-center shadow-lg">
				<h1 className="font mb-8 text-center text-3xl">Forgot Password</h1>

				{/* Password */}
				<form onSubmit={handleForgotPassword} className="space-y-4">
					<input
						name="email"
						type="email"
						placeholder="you@example.com"
						required
						disabled={isLoading}
						className="border-input bg-background text-foreground focus:ring-ring w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
					/>

					<button
						type="submit"
						disabled={isLoading}
						className="bg-primary text-primary-foreground w-full rounded-md py-3 font-medium transition hover:opacity-90 disabled:opacity-50"
					>
						{isLoading ? "Sending..." : "Send Reset Email"}
					</button>
					{message && <p className="mt-2 text-sm text-green-500">{message}</p>}
					{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
				</form>
			</div>
		</div>
	);
}
