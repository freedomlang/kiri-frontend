import React, { memo } from "react";
import "./style.scss";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" role="contentinfo">
      © Blackie's Blog 2015 - {currentYear}
      <br />
      Designed and developed by Blackie Wu
    </footer>
  );
}

export default memo(Footer);
