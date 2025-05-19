import React from 'react';
import './Galeria.css';
import { FaHome } from 'react-icons/fa';

export default function Galeria({ zdjecia, onBack }) {
  return (
    <>
      <div className="content-wrapper">
        <h2 className="galeria-naglowek">Galeria</h2>
        <div className="galeria-scroll">
          {zdjecia.map((zdjecie, index) => (
            <img
              key={index}
              src={zdjecie}
              className="galeria-miniatura"
              alt={`Zdjęcie ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <button className="home-icon-button" onClick={onBack} title="Wróć na stronę główną">
        <FaHome />
      </button>
    </>
  );
}
