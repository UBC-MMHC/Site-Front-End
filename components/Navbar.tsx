"use client";

import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { logout as logoutApi } from "@/components/api/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      logout();
      router.push("/");
    }
  };

  return (
    <nav
      className={`
        fixed top-0 w-full z-50
        transition-all duration-300 ease-in-out
        ${scrolled
          ? "bg-primary-bg/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
        }
      `}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/MMHC_cropped_logo.png"
            alt="UBC MMHC"
            width={32}
            height={32}
            className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-primary-text font-medium tracking-tight text-lg opacity-90 group-hover:opacity-100 transition-opacity">
            UBC MMHC
          </span>
        </Link>

        <div className="flex items-center space-x-1 min-h-[40px]">
          {isLoading ? null : isLoggedIn ? (
            <>
              <NavLink href="/dashboard" text="Dashboard" />
              <NavLink href="/profile" text="Profile" />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-grey-text/70 hover:text-primary-text transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink href="/" text="Home" />
              <NavLink href="/events" text="Events" />
              <NavLink href="/about" text="About" />
              <NavLink href="/login" text="Sign In" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
