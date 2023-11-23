import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import DropdownMenuItems from './DropdownMenuItems'

const DropDownMenu = ({ toggleText, options }) => {
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {toggleText}
      </DropdownToggle>
      <DropdownMenuItems items={options} />
    </UncontrolledDropdown>
  );
};

export default DropDownMenu;
