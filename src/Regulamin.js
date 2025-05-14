import React from 'react';
import './Regulamin.css';

export default function Regulamin() {
  return (
    <div className="regulamin">
      <h2 className="regulamin-naglowek">Regulamin turniejów BMB Volleyball</h2>

      <section>
        <h3>1. Postanowienia ogólne</h3>
        <ul>
          <li>Turnieje organizowane są przez amatorską drużynę BMB Volleyball.</li>
          <li>Celem wydarzeń jest promocja siatkówki i integracja lokalnej społeczności.</li>
          <li>Zgłoszenie drużyny jest równoznaczne z akceptacją regulaminu.</li>
        </ul>
      </section>

      <section>
        <h3>2. Zasady zapisów</h3>
        <ul>
          <li>Zapisu dokonuje trener lub kapitan drużyny poprzez formularz online.</li>
          <li>Liczba miejsc jest ograniczona – decyduje kolejność zgłoszeń.</li>
          <li>Wpisowe należy opłacić przelewem najpóźniej 3 dni przed turniejem.</li>
          <li>Brak opłaty oznacza anulowanie zgłoszenia.</li>
        </ul>
      </section>

      <section>
        <h3>3. Uczestnicy i drużyny</h3>
        <ul>
          <li>Turniej przeznaczony jest dla osób pełnoletnich.</li>
          <li>Drużyna musi składać się z min. 6 i max. 12 zawodników.</li>
          <li>Zmiany w składzie dopuszczalne są do 24h przed turniejem.</li>
        </ul>
      </section>

      <section>
        <h3>4. Zasady gry</h3>
        <ul>
          <li>Mecze rozgrywane zgodnie z oficjalnymi przepisami PZPS.</li>
          <li>
            Szczegółowy harmonogram i zasady punktacji ogłoszone zostaną przed każdym turniejem.
          </li>
          <li>Wszyscy uczestnicy są zobowiązani do gry fair-play.</li>
        </ul>
      </section>

      <section>
        <h3>5. Bezpieczeństwo i odpowiedzialność</h3>
        <ul>
          <li>Organizatorzy nie ponoszą odpowiedzialności za kontuzje.</li>
          <li>Każdy uczestnik bierze udział na własną odpowiedzialność.</li>
          <li>Organizatorzy zastrzegają sobie prawo do zmian w regulaminie.</li>
        </ul>
      </section>

      <section>
        <h3>6. Kontakt i zgłoszenia</h3>
        <ul>
          <li>Pytania i uwagi można kierować na adres: kontakt@bmbvolleyball.pl</li>
        </ul>
      </section>
    </div>
  );
}
