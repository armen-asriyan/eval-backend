import React from "react";

import "./Footer.css";

const Footer = () => {
  const yearNow = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>Copyright &copy; {yearNow}</p>
    </footer>
  );
};

export default Footer;
