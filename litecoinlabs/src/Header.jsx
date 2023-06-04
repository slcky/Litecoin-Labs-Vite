// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Header.css'; 

// Import SVG files
import TwitterSVG from './assets/twitter.svg';
import DiscordSVG from './assets/discord.svg';
import OMLogoSVG from './assets/OMLogo.png';
import MenuSVG from './assets/menu.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <button className="logo-button">LLABS</button>
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        <img src={MenuSVG} alt="Menu"/>
      </button>
      <nav className="navigation-desktop">
        <button className="nav-button">GALLERY</button>
        <button className="nav-button">ARCADE</button>
        <button className="nav-button">CALENDAR</button>
        <button className="icon-button"><img className="twitter" src={TwitterSVG} alt="Twitter" /></button>
        <button className="icon-button"><img className="discord" src={DiscordSVG} alt="Discord" /></button>
        <button className="om-button"><img src={OMLogoSVG} alt="OMLogo" /></button>
      </nav>
      <nav className={`navigation-mobile ${isOpen ? 'open' : ''}`}>
        <div className="nav-item">GALLERY</div>
        <div className="nav-item">ARCADE</div>
        <div className="nav-item">CALENDAR</div>
        <div className="nav-item">TWITTER</div>
        <div className="nav-item">DISCORD</div>
        <div className="nav-item">OM</div>
      </nav>
    </header>
  );
};

export default Header;
