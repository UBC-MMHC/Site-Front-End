import NavLink from "./NavLink";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-primary-bg shadow-lg top-0 w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-white tracking-wider">
                    <Link href="/">
                        UBC MMHC
                    </Link>
                </div>
                <div className="space-x-3">
                    <NavLink href="/" text="Home"/>
                    <NavLink href="/events" text="Events"/>
                    <NavLink href="/login" text="LogIn"/>
                    {/* <NavLink href="/about" text="About" /> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
