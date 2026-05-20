import type { ReactNode } from "react";
import { pageShell } from "@/lib/theme";

export default function DarkPageShell({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={`${pageShell} ${className}`}>{children}</div>;
}
