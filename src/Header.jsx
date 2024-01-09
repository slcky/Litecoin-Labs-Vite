// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // import Link
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
    window.open("https://discord.gg/hpgZUZGkNt", "_blank");
};

const handleOMClick = () => {
    window.open("https://ordinals.market/collection/ordinals/litecoin-punks", "_blank");
};

const handleMarketClick = () => {
  window.open("https://beta.ordinalslite.market/", "_blank");
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Clean-up function
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]); // Only re-run the effect if isOpen changes

  const closeMenu = () => {
    setIsOpen(false);
  }

  const handleTwitterClickAndCloseMenu = () => {
    handleTwitterClick();
    closeMenu();
  }

  const handleDiscordClickAndCloseMenu = () => {
    handleDiscordClick();
    closeMenu();
  }

  const handleOMClickAndCloseMenu = () => {
    handleOMClick();
    closeMenu();
  }

  const handleMarketClickAndCloseMenu = () => {
    handleMarketClick();
    closeMenu();
  }

  return (
    <header className="header">
      <Link to="/"><button className="logo-button" onClick={closeMenu}>LLABS</button></Link>
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        <img src={MenuSVG} alt="Menu"/>
      </button>
      <nav className="navigation-desktop">
        <Link to="/gallery"><button className="nav-button">GALLERY</button></Link>
        {/* <button className="nav-button" onClick={handleMarketClick}>MARKET</button> */}
        <Link to="/calendar"><button className="nav-button">CALENDAR</button></Link>
        {/*<button className="nav-button">ARCADE</button>*/}
        <button className="icon-button" onClick={handleTwitterClick}><img className="twitter" src={TwitterSVG} alt="Twitter" /></button>
        <button className="icon-button" onClick={handleDiscordClick}><img className="discord" src={DiscordSVG} alt="Discord" /></button>
        <button className="om-button" onClick={handleOMClick}><img src={OMLogoSVG} alt="OMLogo" /></button>
      </nav>
      <nav className={`navigation-mobile ${isOpen ? 'open' : ''}`}>
        <Link to="/gallery" className="nav-item" onClick={closeMenu}>GALLERY</Link>
        <div className="nav-item" onClick={handleMarketClickAndCloseMenu}>MARKET</div>
        <Link to="/calendar" className="nav-item" onClick={closeMenu}>CALENDAR</Link>
        {/*<div className="nav-item" onClick={closeMenu}>ARCADE</div>*/}
        <div className="nav-item" onClick={handleTwitterClickAndCloseMenu}>TWITTER</div>
        <div className="nav-item" onClick={handleDiscordClickAndCloseMenu}>DISCORD</div>
        <div className="nav-item" onClick={handleOMClickAndCloseMenu}>OM</div>
      </nav>
    </header>
  );
};

export default Header;
