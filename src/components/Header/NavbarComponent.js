import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar as BootstrapNavbar,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";
import NavSection from "./NavSection"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navItems = [
    { link: "/", text: "Student Management" },
    { link: "/classrooms", text: "Classroom Magement" },
    { link: "/subjects", text: "Subject Magement" },
    { link: "/student-report", text: "Student Report" },
  ];

  const dropdowns = [
    {
      toggleText: "Teacher",
      options: [
        { link: "/teachers", text: "Teacher Magement" },
        { link: "/allocate-subjects", text: "Allocate Subjects" },
        { link: "/allocate-classrooms", text: "Allocate Classrooms" },
      ],
    },
  ];

  return (
    <header className="mb-5">
      <BootstrapNavbar color="light" light expand="md">
        <NavbarBrand href="/">FinAp</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            {/* NavSection component */}
            <NavSection navItems={navItems} dropdowns={dropdowns} />
          </Collapse>
      </BootstrapNavbar>
    </header>
  );
};

export default Navbar;
