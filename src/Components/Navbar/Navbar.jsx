import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { FaBars } from "react-icons/fa";
function Navbar({ sticky }) {
  const navLinks = [
    { id: 1, link: "Posts", path: "/" },
    // { id: 2, link: "Favorite Posts", path: "/favorite_posts" },
    { id: 3, link: "Photos", path: "/albums" },
    { id: 4, link: "Todos", path: "/todos" },
  ];
  return (
    <div>
      <div className="desktop-nav">
        <nav className={sticky ? "navbar navbar-sticky" : "navbar"}>
          <div className="navbar--logo-holder">
            {sticky ? (
              <img
                src="https://drive.google.com/uc?id=1V-B6GzMF3PEUBXeDxJOwONfgNztKP_6P"
                alt="logo"
                className="navbar--logo"
              />
            ) : null}
            <h1>For work</h1>
          </div>
          <ul className="navbar--link">
            {navLinks.map((item) => (
              <li className="navbar--link-item" key={item.id}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={item.path}
                >
                  {item.link}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <nav className="mobile-nav">
        <Menu
          menuButton={({ open }) => (
            <MenuButton className={open ? "active" : ""}>
              <FaBars />
            </MenuButton>
          )}
        >
          {navLinks.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={item.path}
              key={item.id}
            >
              <MenuItem key={item.id}>{item.link}</MenuItem>
            </NavLink>
          ))}
        </Menu>
      </nav>
    </div>
  );
}

export default Navbar;
