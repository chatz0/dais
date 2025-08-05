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
    </header>
  );
};

export default Header;
