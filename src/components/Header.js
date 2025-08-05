import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="profile-container">
        {/* Profile Picture */}
        <img
          src={`${process.env.PUBLIC_URL}/images/me.jpg`}
          alt="Profile"
          className="profile-pic"
        />

        {/* Typewriter Title */}
        <span className="profile-title typewriter">Dimitris Chatzopoulos</span>

        {/* Social Icons */}
        <div className="social-icons">
          {/* LinkedIn (CDN) */}
          <a
            href="https://www.linkedin.com/in/dimhatzo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
              alt="LinkedIn"
            />
          </a>

          {/* Google Scholar (CDN) */}
          <a
            href="https://scholar.google.com.hk/citations?hl=en&user=vXz1bl4AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Scholar"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlescholar.svg"
              alt="Google Scholar"
            />
          </a>

          {/* DBLP (CDN) */}
          <a
            href="https://dblp.org/pid/135/6249.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DBLP"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dblp.svg"
              alt="DBLP"
            />
          </a>

          {/* UCD (Local PNG) */}
          <a
            href="https://www.ucd.ie/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="University College Dublin"
          >
            <img
              src={`${process.env.PUBLIC_URL}/icons/ucd.png`}
              alt="UCD"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
