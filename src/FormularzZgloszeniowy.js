import React, { useState } from 'react';
import './FormularzZgloszeniowy.css';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export default function FormularzZgloszeniowy({ turniej }) {
  const [etap, setEtap] = useState(1);
  const [druzyna, setDruzyna] = useState({
    teamName: '',
    coach: '',
    email: '',
    count: 6,
    payment: 'online',
    acceptedTerms: false,
  });
  const [zawodnicy, setZawodnicy] = useState([]);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleZawodnikChange = (i, field, value) => {
    const nowi = [...zawodnicy];
    nowi[i][field] = value;
    setZawodnicy(nowi);
  };

  const validateEtap1 = () => {
    const { teamName, coach, email, count, acceptedTerms } = druzyna;
    if (!teamName || teamName.length < 3) return 'Nazwa drużyny musi mieć min. 3 znaki.';
    if (!coach || coach.length < 3) return 'Imię i nazwisko trenera są wymagane.';
    if (!email.includes('@')) return 'Niepoprawny email.';
    if (count < 6 || count > 12) return 'Liczba zawodników musi być między 6 a 12.';
    if (!acceptedTerms) return 'Musisz zaakceptować regulamin.';
    return null;
  };

  const validateEtap2 = () => {
    const numbers = new Set();
    for (const z of zawodnicy) {
      if (!z.first || !z.last || !z.number) return 'Wszystkie pola zawodników są wymagane.';
      if (numbers.has(z.number)) return 'Numery koszulek muszą być unikalne.';
      numbers.add(z.number);
    }
    return null;
  };

  const handleSubmitEtap1 = () => {
    const err = validateEtap1();
    if (err) return setError(err);

    const emptyPlayers = Array.from({ length: druzyna.count }, () => ({
      first: '',
      last: '',
      number: '',
    }));
    setZawodnicy(emptyPlayers);
    setEtap(2);
    setError('');
  };

  const handleFinalSubmit = async () => {
    const err = validateEtap2();
    if (err) return setError(err);

    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'registrations'), {
        ...druzyna,
        tournamentID: turniej.id,
        createdAt: new Date(),
      });

      await updateDoc(docRef, { id: docRef.id });

      for (const z of zawodnicy) {
        const playerQuery = query(
          collection(db, 'players'),
          where('first', '==', z.first),
          where('last', '==', z.last),
          where('number', '==', z.number)
        );
        const snapshot = await getDocs(playerQuery);

        let playerId = null;
        if (snapshot.empty) {
          const newPlayer = await addDoc(collection(db, 'players'), z);
          await updateDoc(newPlayer, { playerId: newPlayer.id });
          playerId = newPlayer.id;
        } else {
          playerId = snapshot.docs[0].id;
        }

        await addDoc(collection(db, 'players_registrations'), {
          teamId: docRef.id,
          ...z,
          playerId: playerId,
        });
      }

      setSubmitted(true);
      setIsSubmitting(false);
    } catch (e) {
      console.error('Błąd zapisu', e);
      setError('Wystąpił błąd przy zapisie danych.');
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <h2 className="section-title">Dziękujemy za zgłoszenie!</h2>;
  }

  return (
    <div className="formularz">
      {etap === 1 && (
        <>
          <h2 className="section-title">Formularz drużyny</h2>
          <input
            type="text"
            placeholder="Nazwa drużyny"
            value={druzyna.teamName}
            onChange={(e) => setDruzyna({ ...druzyna, teamName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Imię i nazwisko trenera"
            value={druzyna.coach}
            onChange={(e) => setDruzyna({ ...druzyna, coach: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email kontaktowy"
            value={druzyna.email}
            onChange={(e) => setDruzyna({ ...druzyna, email: e.target.value })}
          />
          <input
            type="number"
            placeholder="Liczba zawodników (6–12)"
            min="6"
            max="12"
            value={druzyna.count}
            onChange={(e) => setDruzyna({ ...druzyna, count: parseInt(e.target.value) })}
          />
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="platnosc"
                checked={druzyna.payment === 'online'}
                onChange={() => setDruzyna({ ...druzyna, payment: 'online' })}
              />{' '}
              Online
            </label>
            <label>
              <input
                type="radio"
                name="platnosc"
                checked={druzyna.payment === 'gotowka'}
                onChange={() => setDruzyna({ ...druzyna, payment: 'gotowka' })}
              />{' '}
              Gotówka
            </label>
          </div>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={druzyna.acceptedTerms}
              onChange={(e) => setDruzyna({ ...druzyna, acceptedTerms: e.target.checked })}
            />
            Akceptuję regulamin
          </label>
          <button className="next" onClick={handleSubmitEtap1}>
            Dalej
          </button>
        </>
      )}

      {etap === 2 && (
        <>
          <h2 className="section-title">Zawodnicy</h2>
          {zawodnicy.map((z, i) => (
            <div key={i} className="zawodnik">
              <input
                type="text"
                placeholder="Imię"
                value={z.first}
                onChange={(e) => handleZawodnikChange(i, 'first', e.target.value)}
              />
              <input
                type="text"
                placeholder="Nazwisko"
                value={z.last}
                onChange={(e) => handleZawodnikChange(i, 'last', e.target.value)}
              />
              <input
                type="number"
                placeholder="Nr koszulki"
                value={z.number}
                onChange={(e) => handleZawodnikChange(i, 'number', e.target.value)}
              />
            </div>
          ))}
          <button className="next" onClick={handleFinalSubmit} disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner"></span> : 'Wyślij zgłoszenie'}
          </button>
        </>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
