import React, { useState } from 'react';
import './Galeria.css';

const galeriaDanych = {
  'Turniej Lato 2025': [
    `${process.env.PUBLIC_URL}/zdjecia/turniej1.png`,
    `${process.env.PUBLIC_URL}/zdjecia/turniej2.jpg`,
    `${process.env.PUBLIC_URL}/zdjecia/turniej3.jpeg`,
    `${process.env.PUBLIC_URL}/zdjecia/turniej4.jpg`,
  ],
  'Turniej Jesień 2024': [
    `${process.env.PUBLIC_URL}/zdjecia/turniej1.png`,
    `${process.env.PUBLIC_URL}/zdjecia/turniej2.jpg`,
    `${process.env.PUBLIC_URL}/zdjecia/turniej3.jpeg`,
    `${process.env.PUBLIC_URL}/zdjecia/turniej4.jpg`,
  ],
};

export default function Galeria() {
  const [wybranyFolder, setWybranyFolder] = useState(null);

  if (!wybranyFolder) {
    return (
      <>
        <h2 className="section-title">Galeria wydarzeń</h2>
        <p className="galeria-opis">Wybierz wydarzenie, aby zobaczyć zdjęcia:</p>
        <div className="galeria-foldery-wrapper">
          {Object.keys(galeriaDanych).map((folder) => (
            <button key={folder} className="folder-button" onClick={() => setWybranyFolder(folder)}>
              {folder}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="section-title">{wybranyFolder}</h2>
      <div className="galeria-scroll">
        {galeriaDanych[wybranyFolder].map((img, index) => (
          <img key={index} src={img} alt={`Zdjęcie ${index + 1}`} className="galeria-miniatura" />
        ))}
        <button className="folder-back-button" onClick={() => setWybranyFolder(null)}>
          ⬅ Powrót do folderów
        </button>
      </div>
    </>
  );
}
