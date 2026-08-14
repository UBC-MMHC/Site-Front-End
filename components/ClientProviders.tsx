"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import ThemeProvider from "@/components/ThemeProvider";
import type { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<AuthProvider>{children}</AuthProvider>
		</ThemeProvider>
	);
}
