import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="p-footer">Quizi By Kupre's ⓒ {year}</p>
    </footer>
  );
}
export default Footer;