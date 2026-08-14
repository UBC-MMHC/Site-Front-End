"use client";

import { useState } from "react";
import { forgot_password } from "@/components/api/auth";
import {
	FormCard,
	FormFooterLink,
	FormHeader,
	FormInput,
	FormMessage,
	FormPageShell,
	FormSubmitButton,
} from "@/components/ui/form";

export default function ForgotPasswordPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLoading) return;

		setIsLoading(true);
		setError(null);
		setMessage(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;

		try {
			await forgot_password(email);
			setMessage("If you have an account, an email to reset your password has been sent.");
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "An unexpected error occurred.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormPageShell>
			<FormCard>
				<FormHeader title="Forgot password" description="We'll send you a reset link" />

				<form data-form-ui onSubmit={handleForgotPassword} className="space-y-4">
					<FormInput
						name="email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						required
						disabled={isLoading}
					/>

					<FormSubmitButton disabled={isLoading}>
						{isLoading ? "Sending…" : "Send reset email"}
					</FormSubmitButton>

					{message && <FormMessage type="success">{message}</FormMessage>}
					{error && <FormMessage type="error">{error}</FormMessage>}
				</form>

				<FormFooterLink href="/login">Back to sign in</FormFooterLink>
			</FormCard>
		</FormPageShell>
	);
}
