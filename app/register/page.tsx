"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/components/api/auth";
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

export default function RegisterPage() {
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
			await register(email, password);
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
				<FormHeader title="Create an account" description="Join the UBC MMHC community" />

				<form data-form-ui onSubmit={handleRegister} className="space-y-4">
					<FormInput
						name="email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						required
						disabled={isLoading}
					/>
					<FormInput
						name="password"
						type="password"
						placeholder="Password"
						autoComplete="new-password"
						required
						disabled={isLoading}
					/>

					<FormSubmitButton disabled={isLoading}>
						{isLoading ? "Creating account…" : "Create account"}
					</FormSubmitButton>

					{error && <FormMessage type="error">{error}</FormMessage>}
				</form>

				<FormFooterLink href="/login">Already have an account? Sign in</FormFooterLink>
			</FormCard>
		</FormPageShell>
	);
}
