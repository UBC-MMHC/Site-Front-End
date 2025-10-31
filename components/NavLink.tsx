"use client";

import { usePathname } from "next/navigation";
interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: NavLinkProps) => {
  const currentRoute = usePathname();

  const isActive = currentRoute === href;

  return (
    <a
      href={href}
      className={`px-4 py-2 rounded-full transition-colors text-sm font-medium ${
        isActive ? "bg-accent-1 text-indigo-700 shadow-md" : "text-white hover:bg-indigo-600"
      }`}>
      {text}
    </a>
  );
};

export default NavLink;
