"use client";

import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
                fixed top-0 w-full z-50 shadow-lg 
                bg-primary-bg backdrop-blur-sm 
                transition-all duration-400 ease-in-out
                ${visible ? "translate-y-0" : "-translate-y-full"}
            `}>
      <div className="px-6 sm:px-8 lg:px-10 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-wider">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/MMHC_cropped_logo.png" alt="UBC MMHC logo" width={30} height={30} className="rounded-full" />
            <span>UBC MMHC</span>
          </Link>
        </div>
        <div className="space-x-3">
          <NavLink href="/" text="Home" />
          <NavLink href="/events" text="Events" />
          <NavLink href="/about" text="About" />
          <NavLink href="/login" text="Sign In" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
