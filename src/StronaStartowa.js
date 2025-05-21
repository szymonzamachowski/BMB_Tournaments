import React, { useState, useEffect } from 'react';
import './StronaStartowa.css';
import KalendarzTurniejow from './KalendarzTurniejow';
import Regulamin from './Regulamin';
import Onas from './Onas';
import Galeria from './Galeria';
import { FaHome } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FormularzZgloszeniowy from './FormularzZgloszeniowy';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

export default function StronaStartowa() {
  useEffect(() => {
    window.setWidok = setWidok; // <- pozwala odpalać komendy przez konsolę
  }, []);
  const [menuVisible, setMenuVisible] = useState(false);

  const [widok, setWidok] = useState('start');
  const [wybranyTurniej, setWybranyTurniej] = useState(null);

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
  const [najblizszyTurniej, setNajblizszyTurniej] = useState(null);

  useEffect(() => {
    const fetchNajblizszyTurniej = async () => {
      const dzisiaj = new Date();
      const dzisiajStr = dzisiaj.toISOString().split('T')[0];

      const q = query(
        collection(db, 'tournaments'),
        where('date', '>=', dzisiajStr),
        orderBy('date', 'asc'),
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const turniej = snapshot.docs[0].data();
        setNajblizszyTurniej(turniej);

        const targetDate = new Date(`${turniej.date}T00:00:00`);

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
      }
    };

    fetchNajblizszyTurniej();
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
            <li
              onClick={() => {
                setWidok('galeria');
                setMenuVisible(false);
              }}
            >
              Galeria
            </li>
            <li
              onClick={() => {
                setWidok('regulamin');
                setMenuVisible(false);
              }}
            >
              Regulamin
            </li>
            <li
              onClick={() => {
                setWidok('onas');
                setMenuVisible(false);
              }}
            >
              O nas
            </li>
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
            <>
              <div className="content-wrapper">
                <KalendarzTurniejow
                  onWybierzTurniej={(turniej) => {
                    setWybranyTurniej(turniej);
                    setWidok('formularz');
                  }}
                />
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

          {widok === 'regulamin' && (
            <>
              <div className="content-wrapper">
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
          {widok === 'onas' && (
            <>
              <div className="content-wrapper">
                <Onas />
              </div>
              <button
                className="home-icon-button"
                onClick={() => setWidok('start')}
                title="Strona główna"
              >
                <FaHome />
              </button>
            </>
          )}
          {widok === 'galeria' && (
            <>
              <div className="content-wrapper">
                <Galeria />
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
              {najblizszyTurniej && (
                <p className="countdown">
                  Najbliższy turniej: <strong>{najblizszyTurniej.name}</strong>
                  <br />
                  już za: {countdown}
                </p>
              )}

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
          {widok === 'formularz' && (
            <>
              <div className="content-wrapper">
                <FormularzZgloszeniowy turniej={wybranyTurniej} />
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
        </div>
      </div>
    </div>
  );
}
