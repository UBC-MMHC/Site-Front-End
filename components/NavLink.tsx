"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface NavLinkProps {
	href: string;
	text: string;
}

const NavLink = ({ href, text }: NavLinkProps) => {
	const currentRoute = usePathname();
	const [isActive, setIsActive] = useState<boolean>(currentRoute === href);

	useEffect(() => {
		setIsActive(currentRoute === href);
	}, [currentRoute, href]);

	return (
		<Link
			href={href}
			className={`px-4 py-2 text-[15px] font-medium transition-colors duration-150 ${
				isActive ? "text-white" : "text-zinc-400 hover:text-white"
			}`}
		>
			{text}
		</Link>
	);
};

export default NavLink;
