// src/components/Footer.jsx
import React from "react";
import "../css/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer" role="contentinfo" aria-label="Pied de page">
      <div className="footer-inner maxWidth">
        <div className="footer-left">
          <span className="brand">Eric Bibang</span>
        </div>
        <div className="footer-right">
          <span>© {year} Eric Bibang. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
