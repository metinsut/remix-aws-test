import { NavLink } from "@remix-run/react";
import React from "react";

export default function Header() {
  return (
    <header className="bg-cyan-500 py-2 px-3 flex items-center justify-between">
      <nav>
        <ul className="text-white flex items-center gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-normal"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/post"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-normal"
              }
            >
              Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-normal"
              }
            >
              User
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="text-white">Login</div>
    </header>
  );
}
