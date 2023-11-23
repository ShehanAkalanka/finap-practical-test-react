import React from "react";
import { DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

const DropdownMenuItems = ({ items }) => {
  return (
    <DropdownMenu end>
      {items.map((item, index) => (
        <DropdownItem key={index}>
          <Link className="nav-link" to={item.link}>
            {item.text}
          </Link>
        </DropdownItem>
      ))}
    </DropdownMenu>
  );
};

export default DropdownMenuItems;
