import React, { useState, useEffect } from 'react';
import './KalendarzTurniejow.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

const monthNames = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];
const weekDays = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];

export default function KalendarzTurniejow({ onWybierzTurniej }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const year = today.getFullYear();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const start = `${year}-${String(month + 1).padStart(2, '0')}-01`;
      const end = `${year}-${String(month + 1).padStart(2, '0')}-31`;

      const q = query(
        collection(db, 'tournaments'),
        where('date', '>=', start),
        where('date', '<=', end)
      );

      const snapshot = await getDocs(q);
      const tournaments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const enriched = await Promise.all(
        tournaments.map(async (t) => {
          const q2 = query(collection(db, 'registrations'), where('tournamentID', '==', t.id));
          const regSnap = await getDocs(q2);
          return {
            ...t,
            teamsRegistered: regSnap.size,
          };
        })
      );

      setEvents(enriched);
    };

    fetchTournaments();
  }, [month]);

  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setMonth((m) => Math.max(0, m - 1));
  const nextMonth = () => setMonth((m) => Math.min(11, m + 1));

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(<div key={`empty-${i}`} className="day-cell empty" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const event = events.find((e) => {
      const eventDate =
        typeof e.date === 'string' ? e.date : e.date.toDate().toISOString().split('T')[0];
      return eventDate === dateStr;
    });
    const isWeekend = new Date(year, month, d).getDay() % 6 === 0;

    const classes = ['day-cell'];
    if (isWeekend) classes.push('weekend');
    if (event) classes.push('day-event');

    cells.push(
      <div
        key={d}
        className={classes.join(' ')}
        onClick={() => {
          if (event && onWybierzTurniej) {
            onWybierzTurniej(event);
          }
        }}
      >
        <div className="day-number">{d}</div>
        {event && (
          <>
            <div className="event-name">{event.name}</div>
            <div className="event-hover-details">
              <div>📍 {event.location}</div>
              <div>💸 {event.fee} PLN</div>
              <div>
                👥 {event.teamsRegistered} / {event.teamsLimit}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="kalendarz">
      <div className="kalendarz-header">
        <button onClick={prevMonth} disabled={month === 0} className="month-nav-button">
          ‹
        </button>
        <h2 className="month-title">
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} disabled={month === 11} className="month-nav-button">
          ›
        </button>
      </div>
      <div className="week-days">
        {weekDays.map((day) => (
          <div key={day} className="week-day">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">{cells}</div>
    </div>
  );
}
