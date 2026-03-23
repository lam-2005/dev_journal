import React from "react";
import { FaUserCircle } from "react-icons/fa";

type LinkType = { name: string; href: string }[];

const links: LinkType = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
const Navbar = () => {
  return (
    <div className="flex items-center py-8 bg-secondary-background ">
      <div className="container">
        <h2 className="font-bold text-2xl">
          Dev
          <span className="inline-block w-fit h-fit bg-primary">Journal</span>
        </h2>
      </div>
      <nav className="container">
        <ul className="flex items-center justify-end text-lg ">
          {links.map((l) => (
            <li
              className="px-2.5 hover:text-primary transition duration-300"
              key={l.name}
            >
              <a href={l.href}>{l.name}</a>
            </li>
          ))}
          <li className="px-2.5 flex items-center gap-2">
            <FaUserCircle className="text-2xl" /> Log In
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
