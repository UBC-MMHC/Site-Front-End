interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

const NavLink = ({ href, children, currentRoute, setCurrentRoute }: NavLinkProps) => {
  return (
    <button
      onClick={() => setCurrentRoute(href)}
      className={`px-4 py-2 rounded-full transition-colors text-sm font-medium ${
        currentRoute === href ? "bg-white text-indigo-700 shadow-md" : "text-white hover:bg-indigo-600"
      }`}>
      {children}
    </button>
  );
};

export default NavLink;
