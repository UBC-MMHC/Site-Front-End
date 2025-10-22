import NavLink from "./NavLink";

interface NavbarProps {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

const Navbar = ({ currentRoute, setCurrentRoute }: NavbarProps) => {
  return (
    <nav className="bg-indigo-700 shadow-lg fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-wider">UBC MMHC</div>
        <div className="space-x-3">
          <NavLink href="/" currentRoute={currentRoute} setCurrentRoute={setCurrentRoute}>
            Home (Root)
          </NavLink>
          <NavLink href="/homepage" currentRoute={currentRoute} setCurrentRoute={setCurrentRoute}>
            Dedicated Homepage
          </NavLink>
          <NavLink href="/about" currentRoute={currentRoute} setCurrentRoute={setCurrentRoute}>
            About Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
