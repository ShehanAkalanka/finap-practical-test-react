import React from "react";
import DropDownMenu from "./DropDownMenu"; // Import the dropdown menu component

const DropdownMenuSection = ({dropdowns}) => {
  return (
    <>
      {dropdowns.map((dropdown, index) => (
        <DropDownMenu
          key={index}
          toggleText={dropdown.toggleText}
          options={dropdown.options}
        />
      ))}
    </>
  );
};

export default DropdownMenuSection;
