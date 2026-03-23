import React from "react";

const Footer = () => {
  return (
    <footer className="py-10 bg-foreground text-background font-mono text-center mt-20">
      &copy; {new Date().getFullYear()} by Phan Phuc Lam, All rights reserved.
    </footer>
  );
};

export default Footer;
