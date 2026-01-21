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
		<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center pt-24">
			<div className="bg-card text-card-foreground w-full max-w-md rounded-2xl p-8 text-center shadow-lg">
				<h1 className="font mb-8 text-center text-3xl">Reset Password</h1>

				{/* Password */}
				<form onSubmit={handleResetPassword} className="space-y-4">
					<input
						name="password"
						type="password"
						placeholder="********"
						required
						disabled={isLoading}
						className="border-input bg-background text-foreground focus:ring-ring w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
					/>

					<button
						type="submit"
						disabled={isLoading}
						className="bg-primary text-primary-foreground w-full rounded-md py-3 font-medium transition hover:opacity-90 disabled:opacity-50"
					>
						Reset Password
					</button>

					{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
				</form>
			</div>
		</div>
	);
}

export default function ResetPasswordPage() {
	return (
		<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center pt-24">
			<Suspense fallback={<div className="text-center">Loading reset form...</div>}>
				<ResetPasswordForm />
			</Suspense>
		</div>
	);
}
