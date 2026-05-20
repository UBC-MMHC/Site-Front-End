"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { reset_password } from "@/components/api/auth";
import { validatePassword } from "@/utils/validatePassword";
import {
	FormCard,
	FormFooterLink,
	FormHeader,
	FormInput,
	FormMessage,
	FormPageShell,
	FormSubmitButton,
} from "@/components/ui/form";

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
			setError(err instanceof Error ? err.message : "An unexpected error occurred.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormPageShell>
			<FormCard>
				<FormHeader title="Reset password" description="Choose a new secure password" />

				<form data-form-ui onSubmit={handleResetPassword} className="space-y-4">
					<FormInput
						name="password"
						type="password"
						placeholder="New password"
						autoComplete="new-password"
						required
						disabled={isLoading}
					/>

					<FormSubmitButton disabled={isLoading}>
						{isLoading ? "Resetting…" : "Reset password"}
					</FormSubmitButton>

					{error && <FormMessage type="error">{error}</FormMessage>}
				</form>

				<FormFooterLink href="/login">Back to sign in</FormFooterLink>
			</FormCard>
		</FormPageShell>
	);
}

export default function ResetPasswordPage() {
	return (
		<Suspense
			fallback={
				<FormPageShell>
					<p className="text-sm text-zinc-400">Loading reset form…</p>
				</FormPageShell>
			}
		>
			<ResetPasswordForm />
		</Suspense>
	);
}
