import React from 'react';
import './Onas.css';

export default function Onas() {
  return (
    <div className="onas">
      <h2 className="onas-naglowek">O nas</h2>

      <section>
        <h3>Kim jesteśmy?</h3>
        <p>
          Jesteśmy amatorską drużyną siatkarską <strong>BMB Volleyball</strong>, skupiającą
          pasjonatów siatkówki zarówno początkujących, jak i zaawansowanych. Co sezon organizujemy
          lokalne turnieje, które łączą sportową rywalizację z przyjazną, integracyjną atmosferą.
        </p>
      </section>

      <section>
        <h3>Nasza misja</h3>
        <p>
          Promujemy aktywność fizyczną i ducha fair-play. Chcemy, aby każdy, niezależnie od
          doświadczenia, poczuł radość gry w siatkówkę i poznał nowych ludzi.
        </p>
      </section>

      <section>
        <h3>Dlaczego warto do nas dołączyć?</h3>
        <ul className="onas-lista">
          <li>
            <strong>Integracja</strong>: nowe znajomości i pozytywne emocje.
          </li>
          <li>
            <strong>Aktywność</strong>: rozwój umiejętności i zdrowa rywalizacja.
          </li>
          <li>
            <strong>Organizacja</strong>: łatwe zapisy online i szybka komunikacja.
          </li>
          <li>
            <strong>Nagrody</strong>: upominki i wyróżnienia dla najlepszych.
          </li>
        </ul>
      </section>

      <section>
        <h3>Nasz zespół</h3>
        <ul className="onas-lista">
          <li>
            <strong>---</strong> – organizator i koordynator
          </li>
          <li>
            <strong>---</strong> – trenerka i sędzia główna
          </li>
          <li>
            <strong>---</strong> – menedżer zapisów i komunikacji
          </li>
        </ul>
      </section>

      <section>
        <h3>Kontakt</h3>
        <p>
          Masz pytania? Napisz do nas:
          <br />
          <a href="mailto:kontakt@bmbvolleyball.pl">kontakt@bmbvolleyball.pl</a>
          <br />
          lub zadzwoń: <a href="tel:+48123456789">+48 123 456 789</a>
        </p>
      </section>
    </div>
  );
}
