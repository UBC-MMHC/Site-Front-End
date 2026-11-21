"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EventTabs() {
	const pathname = usePathname();

	const tabs = [
		{ label: "Upcoming Events", href: "/events" },
		{ label: "Past Events", href: "/past" },
	];

	return (
		<nav aria-label="Event sections" className="mb-8 flex gap-3">
			{tabs.map((tab) => {
				const active = pathname === tab.href;

				return (
					<Link
						key={tab.href}
						href={tab.href}
						aria-current={active ? "page" : undefined}
						className={`rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
							active
								? "bg-[#193659] text-white"
								: "border border-gray-300 bg-white text-[#193659] hover:bg-gray-100"
						}`}
					>
						{tab.label}
					</Link>
				);
			})}
		</nav>
	);
}
