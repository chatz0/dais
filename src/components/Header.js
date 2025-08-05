import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="profile-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/me.jpg`}
          alt="Profile"
          className="profile-pic"
        />
        <span className="profile-title">Dimitris Chatzopoulos</span>
      </div>

      <div className="social-icons">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/dimhatzo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
            alt="LinkedIn"
            className="icon"
          />
        </a>

        {/* DBLP */}
        <a
          href="https://dblp.org/pid/135/6249.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dblp.svg"
            alt="DBLP"
            className="icon"
          />
        </a>

        {/* Google Scholar */}
        <a
          href="https://scholar.google.com.hk/citations?hl=en&user=vXz1bl4AAAAJ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlescholar.svg"
            alt="Google Scholar"
            className="icon"
          />
        </a>

        {/* UCD logo (local) */}
        <a
          href="https://www.ucd.ie/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/ucd.png`}
            alt="UCD"
            className="icon"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
