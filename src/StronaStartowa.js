import React, { useState } from "react";
import "./StronaStartowa.css";

export default function StronaStartowa() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleSubmenu = () => setSubmenuVisible(!submenuVisible);

  return (
    <div className="container">
      <header className="header">
        <div className="menu-button-container">
          <button className="menu-button" onClick={toggleMenu}>☰</button>
        </div>
        <img src="/logo.png" alt="BMB Volleyball" className="logo-img" />
        <div className="spacer"></div>
      </header>

      {menuVisible && (
        <nav className="navbar">
          <ul className="nav-items">
  <li onClick={() => { toggleSubmenu(); }}>
    Opcja A
    {submenuVisible && (
      <ul className="submenu">
        <li onClick={() => setMenuVisible(false)}>Opcja A1</li>
        <li onClick={() => setMenuVisible(false)}>Opcja A2</li>
      </ul>
    )}
  </li>
  <li onClick={() => setMenuVisible(false)}>Opcja B</li>
  <li onClick={() => setMenuVisible(false)}>Opcja C</li>
  <li onClick={() => setMenuVisible(false)}>Opcja D</li>
  <li onClick={() => setMenuVisible(false)}>Opcja E</li>
</ul>
        </nav>
      )}

      <div className="video-background full-screen">
        <video autoPlay muted loop className="video" poster="/background.jpg">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay-color"></div>
        <div className="overlay center-box">
          <h2 className="main-title">TURNIEJE SIATKARSKIE</h2>
          <button className="signup-button">Zapisz się!</button>
          <p className="upcoming">Najbliższe terminy: 15/05/25, 25/05/25</p>
        </div>
      </div>
    </div>
  );
}
