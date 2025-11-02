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
      className={`px-4 py-2 rounded-full transition-colors text-lg font-medium ${
        isActive ? "text-secondary-text" : "text-grey-text hover:text-accent-1"
      }`}>
      {text}
    </a>
  );
};

export default NavLink;
