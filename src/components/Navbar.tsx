import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <nav className="flex bg-primary p-3 justify-end pr-10 items-center">
      <Link
        to="/"
        className={`mx-5 ${pathname === "/" ? "font-bold" : "text-gray-400"}`}
      >
        Overview
      </Link>
      <Link
        to="/journal"
        className={`mx-5 ${
          pathname === "/journal" ? "font-bold" : "text-gray-400"
        }`}
      >
        Journal
      </Link>
      <Link
        to="/performance"
        className={`mx-5 ${
          pathname === "/performance" ? "font-bold" : "text-gray-400"
        }`}
      >
        Performance
      </Link>
      <div className="flex items-center">
        <img
          src="https://image.flaticon.com/icons/png/32/1946/1946429.png"
          alt=""
          className="mx-3 ml-10 cursor-pointer"
        />
        <p className="items-baseline">Lucas</p>
      </div>
    </nav>
  );
}

export default Navbar;
