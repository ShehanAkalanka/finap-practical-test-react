import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const NavItemLink = ({ link, text }) => (
  <NavItem>
    {/* <NavLink href={link}>{text}</NavLink> */}
    <Link to={link} className="nav-link">
      {text}
    </Link>
  </NavItem>
);

export default NavItemLink;
