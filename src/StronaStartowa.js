import React, { useState, useEffect } from 'react';
import './StronaStartowa.css';
import KalendarzTurniejow from './KalendarzTurniejow';
import Regulamin from './Regulamin';
import { FaHome } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function StronaStartowa() {
  const [menuVisible, setMenuVisible] = useState(false);

  const [widok, setWidok] = useState('start');

  const toggleMenu = () => setMenuVisible(!menuVisible);

  useEffect(() => {
    if (menuVisible) {
      document.body.classList.add('navbar-open');
    } else {
      document.body.classList.remove('navbar-open');
    }
  }, [menuVisible]);

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');

    const headerHeight = header ? header.offsetHeight : 60;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const margin = 45;

    const overlayTop = headerHeight + navbarHeight + margin;
    root.style.setProperty('--overlay-top', `${overlayTop}px`);
  }, [menuVisible]);

  useEffect(() => {
    const defaultTitle = 'BMB Volleyball';
    const awayTitle = '🏐 Zapisz się już teraz!';

    const handleVisibilityChange = () => {
      document.title = document.hidden ? awayTitle : defaultTitle;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-05-18T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown('dzisiaj!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${days} dni ${hours} godz. ${minutes} min. ${seconds} sek.`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Nagłówek */}
      <header className="header">
        <div className="menu-button-container">
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="BMB Volleyball" className="logo-img" />
        <div className="spacer"></div>
      </header>

      {/* Navbar */}
      {menuVisible && (
        <nav className="navbar">
          <ul className="nav-items">
            <li
              onClick={() => {
                setWidok('start');
                setMenuVisible(false);
              }}
            >
              Strona Główna
            </li>
            <li
              onClick={() => {
                setWidok('kalendarz');
                setMenuVisible(false);
              }}
            >
              Zapisz się!
            </li>
            <li onClick={() => setMenuVisible(false)}>Galeria</li>
            <li
              onClick={() => {
                setWidok('regulamin');
                setMenuVisible(false);
              }}
            >
              Regulamin
            </li>
            <li onClick={() => setMenuVisible(false)}>O nas</li>
          </ul>
        </nav>
      )}

      {/* Tło: Wideo */}
      <div className="video-background full-screen">
        <video autoPlay muted loop className="video" poster="/background.jpg">
          <source src={`${process.env.PUBLIC_URL}/background.mp4`} type="video/mp4" />
        </video>
        <div className="video-overlay-color"></div>

        {/* Środkowy Box */}
        <div className="overlay center-box">
          {widok === 'kalendarz' && (
            <div className="kalendarz">
              <KalendarzTurniejow />
              <button
                className="home-icon-button"
                onClick={() => setWidok('start')}
                title="Wróć na stronę główną"
              >
                <FaHome />
              </button>
            </div>
          )}

          {widok === 'regulamin' && (
            <>
              <div className="content-wrapper">
                <h2 className="regulamin-naglowek">Regulamin turniejów BMB Volleyball</h2>
                <Regulamin />
              </div>
              <button
                className="home-icon-button"
                onClick={() => setWidok('start')}
                title="Wróć na stronę główną"
              >
                <FaHome />
              </button>
            </>
          )}

          {widok === 'start' && (
            <>
              <h2 className="main-title">NAJLEPSZE TURNIEJE SIATKARSKIE</h2>
              <div className="highlight-icons">
                <div className="highlight-item">🏆 Atrakcyjne nagrody</div>
                <div className="highlight-item">⚖️ Sędziowie z licencją</div>
                <div className="highlight-item">🎉 Impreza integracyjna po meczu</div>
              </div>
              <h3 className="section-title">Jak to działa?</h3>
              <div className="how-it-works">
                <div className="step">1. Wybierz termin 📅</div>
                <div className="arrow">➔</div>
                <div className="step">2. Opłać wpisowe 💳</div>
                <div className="arrow">➔</div>
                <div className="step">3. Zagraj i baw się dobrze 🏐</div>
              </div>
              <button className="signup-button" onClick={() => setWidok('kalendarz')}>
                Zapisz się!
              </button>
              <p className="countdown">Najbliższy turniej za: {countdown}</p>

              <div className="social-icons">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
