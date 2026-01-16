"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

const NavLink = ({ href, text }: NavLinkProps) => {
  const currentRoute = usePathname();
  const [isActive, setIsActive] = useState<boolean>(currentRoute === href);

  useEffect(() => {
    setIsActive(currentRoute === href);
  }, [currentRoute, href]);

  return (
    <a
      href={href}
      className={`
        md:text-lg
        text-xl
        px-4 py-2 text-sm transition-colors
        ${isActive ? "text-primary-text" : "text-grey-text/70 hover:text-primary-text"}
      `}
    >
      {text}
    </a>
  );
};

export default NavLink;
