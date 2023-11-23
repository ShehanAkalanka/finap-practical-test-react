import React from "react";
import { Nav } from "reactstrap";
import NavItemLink from "./NavItemLink";
import DropdownMenuSection from "./DropdownMenuSection";

const NavSection = ({ navItems, dropdowns }) => {
  return (
    <Nav className="me-auto" navbar>
      {/* NavItemLinks*/}
      {navItems.map((item, index) => (
        <NavItemLink key={index} link={item.link} text={item.text} />
      ))}

      {/* DropdownMenuSection*/}
      <DropdownMenuSection dropdowns={dropdowns} />
    </Nav>
  );
};
 export default NavSection