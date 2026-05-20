"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { logout as logoutApi } from "@/components/api/auth";
import { pillPrimary } from "@/lib/theme";

const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/events", label: "Events" },
	{ href: "/blog", label: "Blog" },
	{ href: "/about", label: "About" },
] as const;

const AUTH_LINKS = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/profile", label: "Profile" },
] as const;

function NavItem({
	href,
	label,
	onClick,
	onHero = false,
}: {
	href: string;
	label: string;
	onClick?: () => void;
	onHero?: boolean;
}) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			onClick={onClick}
			className={`px-3 py-2 text-sm font-medium transition-colors md:px-4 ${
				onHero
					? isActive
						? "text-white"
						: "text-zinc-300 hover:text-white"
					: isActive
						? "text-page-fg"
						: "text-fg-muted hover:text-page-fg"
			}`}
		>
			{label}
		</Link>
	);
}

export default function Navbar() {
	const { isLoggedIn, isLoading, logout } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const isHome = pathname === "/";

	const [scrolled, setScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

	const isTransparent = isHome && !scrolled && !isOpen;

	const handleLogout = async () => {
		try {
			await logoutApi();
		} catch (error) {
			console.error("Logout failed: ", error);
		} finally {
			logout();
			router.push("/");
		}
	};

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 24);
		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(event.target as Node) &&
				!mobileMenuButtonRef.current?.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	const closeMobile = () => setIsOpen(false);

	const headerText = isTransparent ? "text-white" : "text-page-fg";

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-300 ${headerText} ${
				isTransparent ? "bg-transparent" : "bg-nav/95 backdrop-blur-sm"
			}`}
		>
			<nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-6">
				<Link href="/" className="flex shrink-0 items-center gap-2.5">
					<Image
						src="/MMHC_cropped_logo.png"
						alt="UBC MMHC"
						width={28}
						height={28}
						className="rounded-full"
					/>
					<span className="text-[15px] font-semibold tracking-tight">UBC MMHC</span>
				</Link>

				<div className="hidden items-center md:flex">
					{NAV_LINKS.map((item) => (
						<NavItem
							key={item.href}
							href={item.href}
							label={item.label}
							onHero={isTransparent}
						/>
					))}
					{!isLoading &&
						isLoggedIn &&
						AUTH_LINKS.map((item) => (
							<NavItem
								key={item.href}
								href={item.href}
								label={item.label}
								onHero={isTransparent}
							/>
						))}
				</div>

				<div className="hidden items-center gap-3 md:flex">
					{isLoading ? null : isLoggedIn ? (
						<button
							type="button"
							onClick={handleLogout}
							className={`cursor-pointer text-sm font-medium transition-colors ${
								isTransparent
									? "text-zinc-300 hover:text-white"
									: "text-fg-muted hover:text-page-fg"
							}`}
						>
							Sign Out
						</button>
					) : (
						<Link
							href="/login"
							className={
								isTransparent
									? "rounded-full bg-zinc-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-950 transition-all hover:bg-zinc-200"
									: pillPrimary
							}
						>
							Sign In
						</Link>
					)}
				</div>

				<div className="flex items-center md:hidden">
					<button
						ref={mobileMenuButtonRef}
						type="button"
						className="p-2"
						onClick={() => setIsOpen(!isOpen)}
						aria-label={isOpen ? "Close menu" : "Open menu"}
						aria-expanded={isOpen}
					>
						<span className="text-xl leading-none">{isOpen ? "✕" : "☰"}</span>
					</button>
				</div>
			</nav>

			<div
				ref={mobileMenuRef}
				className={`overflow-hidden border-t border-border bg-page transition-all duration-300 md:hidden ${
					isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="flex flex-col px-6 py-4 text-page-fg">
					{NAV_LINKS.map((item) => (
						<NavItem
							key={item.href}
							href={item.href}
							label={item.label}
							onClick={closeMobile}
						/>
					))}
					{!isLoading && isLoggedIn && (
						<>
							{AUTH_LINKS.map((item) => (
								<NavItem
									key={item.href}
									href={item.href}
									label={item.label}
									onClick={closeMobile}
								/>
							))}
							<button
								type="button"
								onClick={() => {
									closeMobile();
									void handleLogout();
								}}
								className="px-3 py-2 text-left text-sm font-medium text-fg-muted hover:text-page-fg"
							>
								Sign Out
							</button>
						</>
					)}
					{!isLoading && !isLoggedIn && (
						<div className="mt-3 border-t border-border pt-4">
							<Link href="/login" className={`${pillPrimary} inline-block`} onClick={closeMobile}>
								Sign In
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
