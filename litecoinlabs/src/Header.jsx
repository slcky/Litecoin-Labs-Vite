// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Header.css'; 

// Import SVG files
import TwitterSVG from './assets/twitter.svg';
import DiscordSVG from './assets/discord.svg';
import OMLogoSVG from './assets/OMLogo.png';
import MenuSVG from './assets/menu.svg';

const handleTwitterClick = () => {
    window.open("https://twitter.com/LitecoinPunks", "_blank");
  };

const handleDiscordClick = () => {
    window.open("https://discord.gg/litecoinlabs", "_blank");
  };

const handleOMClick = () => {
    window.open("https://ordinals.market/collection/ordinals/litecoin-punks", "_blank");
  };

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
        <button className="icon-button" onClick={handleTwitterClick}><img className="twitter" src={TwitterSVG} alt="Twitter" /></button>
        <button className="icon-button" onClick={handleDiscordClick}><img className="discord" src={DiscordSVG} alt="Discord" /></button>
        <button className="om-button" onClick={handleOMClick}><img src={OMLogoSVG} alt="OMLogo" /></button>
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
