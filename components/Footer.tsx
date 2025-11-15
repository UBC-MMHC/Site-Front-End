import Image from "next/image";
import {
  EMAIL,
  EXEC_SIGNUP_URL,
  INSTAGRAM_URL,
  LINK_TREE as LINK_TREE_URL,
  MEMBERSHIP_SIGNUP_URL,
} from "@/app/constants";

const Footer = () => {
  return (
    <footer className="bg-primary-bg text-white w-full pt-8">
      <div className="max-w-6xl mx-auto px-4 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="flex flex-col items-center p-8 text-center gap-2">
          <Image src="/MMHC_Circle_Logo.jpg" alt="UBC MMHC logo" width={120} height={120} className="rounded-full" />
          <p className="text-m text-primary-text">Community. Grit. Growth. </p>
        </div>

        {/* Middle column */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={MEMBERSHIP_SIGNUP_URL}
                target="_blank"
                className="text-grey-text hover:text-white transition-colors">
                Become a Member
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" className="text-grey-text hover:text-white transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} target="_blank" className="text-grey-text hover:text-white transition-colors">
                Email Us
              </a>
            </li>
            <li>
              <a href={EXEC_SIGNUP_URL} target="_blank" className="text-grey-text hover:text-white transition-colors">
                Join Our Executive Team
              </a>
            </li>
            <li>
              <a href={LINK_TREE_URL} target="_blank" className="text-grey-text hover:text-white transition-colors">
                Link Tree
              </a>
            </li>
          </ul>
        </div>

        {/* Right column */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
          <p className="text-md text-primary-text">
            Subscribe to our weekly newsletter to stay up-to-date with our latest events!
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center p-3 pt-0">
        <p className="text-xs text-primary-text">
          &copy; {new Date().getFullYear()} UBC Men's Mental Health Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
