import { authSpinner, centerPage, loadingPulse, pageShell, textMuted } from "@/lib/theme";

export function AuthLoading({ message = "Loading…" }: { message?: string }) {
	return (
		<div className={`${pageShell} ${centerPage}`}>
			<p className={loadingPulse}>{message}</p>
		</div>
	);
}

export function AuthSpinner({ message }: { message: string }) {
	return (
		<div className={`${pageShell} ${centerPage}`}>
			<div className="text-center">
				<div className={authSpinner} />
				<p className={`text-sm ${textMuted}`}>{message}</p>
			</div>
		</div>
	);
}
