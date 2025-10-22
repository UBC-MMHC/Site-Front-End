import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 w-full">
      <p className="text-xs">&copy; {new Date().getFullYear()} UBC Men's Mental Health Club. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
