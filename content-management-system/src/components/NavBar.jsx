import React from "react";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";

const NavBar = () => {
  return (
    <nav className="bg-white text-black py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold hover:text-black-200">
          MyWebsite
        </a>

        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-black-200 transition duration-300 my-2">
            Home
          </Link>
          <Link to="/aboutus" className="hover:text-black-200 transition duration-300 my-2">
            About
          </Link>
          <Authentication/>
        </div>

        {/* Mobile Menu Button (Optional) */}
        <button className="md:hidden text-white text-xl">
          ☰
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
