import React, { useState, useEffect } from "react";
import "./StronaStartowa.css";
import KalendarzTurniejow from "./KalendarzTurniejow";
import Regulamin from "./Regulamin";
import { FaHome } from "react-icons/fa";

export default function StronaStartowa() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [widok, setWidok] = useState("start");

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--navbar-height", submenuVisible ? "120px" : "60px");
  }, [submenuVisible]);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleSubmenu = () => setSubmenuVisible(!submenuVisible);

  useEffect(() => {
    if (menuVisible) {
      document.body.classList.add("navbar-open");
    } else {
      document.body.classList.remove("navbar-open");
    }
  }, [menuVisible]);

  return (
    <div className="container">
      {/* Nagłówek */}
      <header className="header">
        <div className="menu-button-container">
          <button className="menu-button" onClick={toggleMenu}>☰</button>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="BMB Volleyball"
          className="logo-img"
        />
        <div className="spacer"></div>
      </header>

      {/* Navbar */}
      {menuVisible && (
        <nav className="navbar">
          <ul className="nav-items">
          <li onClick={() => setMenuVisible(false)}>Strona Główna</li>
            <li onClick={toggleSubmenu}>
              Zapisy
              {submenuVisible && (
                <ul className="submenu">
                  <li onClick={() => {
  setWidok("kalendarz");
  setMenuVisible(false);
}}>Zapisz drużynę</li>

                  <li onClick={() => setMenuVisible(false)}>Znajdź drużynę</li>
                </ul>
              )}
            </li>
            <li onClick={() => setMenuVisible(false)}>Galeria</li>
            <li onClick={() => {
  setWidok("regulamin");
  setMenuVisible(false);
}}>Regulamin</li>
            <li onClick={() => setMenuVisible(false)}>O nas</li>
          </ul>
        </nav>
      )}

      {/* Tło: Wideo */}
      <div className="video-background full-screen">
        <video
          autoPlay
          muted
          loop
          className="video"
          poster="/background.jpg"
        >
          <source
            src={`${process.env.PUBLIC_URL}/background.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="video-overlay-color"></div>

        {/* Środkowy Box */}
        <div className="overlay center-box">
        {widok === "kalendarz" ? (
  <div className="kalendarz">
    <KalendarzTurniejow />
    <button className="home-icon-button" onClick={() => setWidok("start")} title="Wróć na stronę główną">
      <FaHome />
    </button>
  </div>
) : widok === "regulamin" ? (
  <>
    <Regulamin />
    <button className="home-icon-button" onClick={() => setWidok("start")} title="Wróć na stronę główną">
      <FaHome />
    </button>
  </>
) : (
  <>
    <h2 className="main-title">TURNIEJE SIATKARSKIE</h2>
    <button className="signup-button" onClick={() => setWidok("kalendarz")}>
      Zapisz się!
    </button>
    <p className="upcoming">Najbliższe terminy: 15/05/25, 25/05/25</p>
  </>
)}
        </div>
      </div>
    </div>
  );
}
