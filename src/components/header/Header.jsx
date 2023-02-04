import React from "react";
import "./Header.css";
import Nav, { logo } from "./Nav";
const Header = () => {
  return (
    <header>
      {logo}
      <Nav />
    </header>
  );
};

export default Header;
