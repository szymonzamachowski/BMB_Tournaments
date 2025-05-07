import React from "react";
import "./KalendarzTurniejow.css";

const mockTurnieje = {
  "2025-05-15": { nazwa: "Turniej Wiosenny", wpisowe: 150, miejsca: "8/12" },
  "2025-05-21": { nazwa: "Puchar Lata", wpisowe: 200, miejsca: "10/16" },
  "2025-05-27": { nazwa: "Volley Night", wpisowe: 180, miejsca: "6/8" }
};

function generujDni(month, year) {
  const date = new Date(year, month, 1);
  const days = [];
  const firstDayIndex = date.getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }

  for (let i = 1; i <= lastDate; i++) {
    days.push(i);
  }

  return days;
}

export default function KalendarzTurniejow() {
  const dni = generujDni(4, 2025); // Maj 2025 (month = 4)

  return (
    <div className="kalendarz">
      <h2 className="kalendarz-naglowek">Kalendarz turniejów – Maj 2025</h2>
      <div className="siatka">
        {["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"].map((dzien) => (
          <div key={dzien} className="naglowek">{dzien}</div>
        ))}

        {dni.map((dzien, idx) => {
          const data = dzien ? `2025-05-${String(dzien).padStart(2, "0")}` : null;
          const turniej = data && mockTurnieje[data];

          return (
            <div
              key={idx}
              className={`komorka ${turniej ? "aktywny" : "nieaktywny"}`}
            >
              {dzien}
              {turniej && (
  <div className="turniej-zawartosc">
    <div className="nazwa">{turniej.nazwa}</div>
    <div className="dodatkowe">
      Wpisowe: {turniej.wpisowe} zł<br />
      Miejsca: {turniej.miejsca}
    </div>
  </div>
)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
