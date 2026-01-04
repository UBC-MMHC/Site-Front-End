"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: NavLinkProps) => {
  const currentRoute = usePathname();
  const isActive = currentRoute === href;

  return (
    <Link
      href={href}
      className={`
        px-4 py-2 text-sm transition-colors
        ${isActive
          ? "text-primary-text"
          : "text-grey-text/70 hover:text-primary-text"
        }
      `}
    >
      {text}
    </Link>
  );
};

export default NavLink;

