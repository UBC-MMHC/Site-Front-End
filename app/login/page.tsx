"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, loginWithGoogle } from "@/components/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import GoogleIcon from "@/components/icons/GoogleIcon";
import {
	FormCard,
	FormDivider,
	FormHeader,
	FormInput,
	FormMessage,
	FormPageShell,
	FormSubmitButton,
} from "@/components/ui/form";

export default function LoginPage() {
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
			setError(err instanceof Error ? err.message : "An unexpected error occurred.");
		}
	};

	return (
		<FormPageShell>
			<FormCard>
				<div className="mb-6 flex flex-col items-center gap-3">
					<Image
						src="/MMHC_Circle_Logo.jpg"
						alt="UBC MMHC logo"
						width={64}
						height={64}
						className="rounded-full"
					/>
					<FormHeader title="Sign In" description="Welcome back to UBC MMHC" />
				</div>

				<form data-form-ui onSubmit={handleLogin} className="space-y-4">
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
						autoComplete="current-password"
						required
						disabled={isLoading}
					/>

					<div className="flex justify-end">
						<Link
							href="/forgot-password"
							className="text-xs text-fg-muted transition-colors hover:text-page-fg"
						>
							Forgot password?
						</Link>
					</div>

					<FormSubmitButton disabled={isLoading}>
						{isLoading ? "Signing in…" : "Sign In"}
					</FormSubmitButton>

					{error && <FormMessage type="error">{error}</FormMessage>}

					<Link
						href="/register"
						className={`flex w-full items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-page-fg transition-all hover:bg-surface-elevated ${isLoading ? "pointer-events-none opacity-50" : ""}`}
					>
						Create an account
					</Link>
				</form>

				<FormDivider />

				<button
					type="button"
					onClick={() => loginWithGoogle()}
					disabled={isLoading}
					className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-surface py-3 text-sm font-medium text-page-fg transition-all hover:bg-surface-elevated disabled:opacity-50"
				>
					<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white p-0.5">
						<GoogleIcon className="h-4 w-4" />
					</span>
					Continue with Google
				</button>
			</FormCard>
		</FormPageShell>
	);
}
