"use client";

import { useState, useEffect, useRef } from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { logout as logoutApi } from "@/components/api/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const { isLoggedIn, isLoading, logout } = useAuth();
	const router = useRouter();

	const [scrolled, setScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

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
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

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

	return (
		<nav
			className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${scrolled ? "bg-primary-bg/80 border-b border-white/5 backdrop-blur-xl" : "bg-transparent"} `}
		>
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				<Link href="/" className="group flex items-center space-x-3">
					<Image
						src="/MMHC_cropped_logo.png"
						alt="UBC MMHC"
						width={32}
						height={32}
						className="rounded-full opacity-90 transition-opacity group-hover:opacity-100"
					/>
					<span className="text-primary-text text-lg font-medium tracking-tight opacity-90 transition-opacity group-hover:opacity-100">
						UBC MMHC
					</span>
				</Link>

				<div
					ref={mobileMenuRef}
					className={`bg-primary-bg/80 fixed inset-x-0 top-0 flex flex-col items-end p-8 px-3 pt-20 transition-transform duration-250 ${isOpen ? "translate-y-0" : "-translate-y-full"} md:static md:translate-y-0 md:flex-row md:space-x-1 md:bg-transparent md:p-0`}
				>
					{isLoading ? null : isLoggedIn ? (
						<>
							<NavLink href="/dashboard" text="Dashboard" />
							<NavLink href="/profile" text="Profile" />
							<button
								onClick={handleLogout}
								className="text-grey-text/70 hover:text-primary-text px-4 py-2 text-sm transition-colors"
							>
								Sign Out
							</button>
						</>
					) : (
						<>
							<NavLink href="/" text="Home" />
							{/* <NavLink href="/membership" text="Membership" /> */}
							<NavLink href="/events" text="Events" />
							<NavLink href="/about" text="About" />
							<NavLink href="/login" text="Sign In" />
						</>
					)}
				</div>
				{/* Mobile Hamburger Menu Button */}
				<button
					ref={mobileMenuButtonRef}
					className="text-primary-text z-50 p-2 md:hidden"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? (
						<span className="text-2xl">✕</span>
					) : (
						<span className="text-2xl">☰</span>
					)}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
