import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
    </div>
  );
};

export default Footer;
