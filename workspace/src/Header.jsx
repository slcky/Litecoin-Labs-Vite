// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/"><button className="logo-button">LLABS</button></Link>
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        <img src={MenuSVG} alt="Menu"/>
      </button>
      <nav className="navigation-desktop">
        <Link to="/gallery"><button className="nav-button">GALLERY</button></Link>
        {/*<Link to="/calendar"><button className="nav-button">CALENDAR</button></Link>*/}
        {/*<button className="nav-button">ARCADE</button>*/}
        <button className="icon-button" onClick={handleTwitterClick}><img className="twitter" src={TwitterSVG} alt="Twitter" /></button>
        <button className="icon-button" onClick={handleDiscordClick}><img className="discord" src={DiscordSVG} alt="Discord" /></button>
        <button className="om-button" onClick={handleOMClick}><img src={OMLogoSVG} alt="OMLogo" /></button>
      </nav>
      <nav className={`navigation-mobile ${isOpen ? 'open' : ''}`}>
        <Link to="/gallery" className="nav-item">GALLERY</Link>
        {/*<Link to="/calendar" className="nav-item">CALENDAR</Link>*/}
        {/*<div className="nav-item">ARCADE</div>*/}
        <div className="nav-item" onClick={handleTwitterClick}>TWITTER</div>
        <div className="nav-item" onClick={handleDiscordClick}>DISCORD</div>
        <div className="nav-item" onClick={handleOMClick}>OM</div>
      </nav>
    </header>
  );
};

export default Header;
