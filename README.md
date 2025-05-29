# BMB Volleyball – Rejestracja na Turnieje Siatkarskie

**Jednostronicowa aplikacja WWW (SPA) stworzona w React, umożliwiająca łatwe i intuicyjne zgłaszanie drużyn na lokalne turnieje siatkarskie.**

---

## 📝 Opis projektu

Celem projektu jest zaprojektowanie i wdrożenie responsywnej i dostępnej aplikacji internetowej, która:
- Umożliwia wybór terminu turnieju w interaktywnym kalendarzu 📅  
- Pozwala na szybkie opłacenie wpisowego i wysłanie zgłoszenia online 💳  
- Prezentuje szczegółowe zasady i regulamin wydarzeń 📜  
- Pokazuje galerię zdjęć z poprzednich edycji turniejów 📷  
- Zapewnia sekcję “O nas” z misją i informacjami o organizatorach 🏐  

Projekt powstał z myślą o amatorskiej drużynie **BMB Volleyball**, której misją jest promocja aktywności fizycznej, ducha fair-play i integracja lokalnej społeczności :contentReference[oaicite:0]{index=0}.

---

## ⚙️ Funkcjonalności

- **Widok główny**  
  - Rozmyte tło wideo z kolorową nakładką  
  - Animowany licznik odliczający do najbliższego turnieju  
  - Przycisk “Zapisz się!” kierujący do kalendarza  
- **Kalendarz turniejów**  
  - Miesięczny widok z oznaczeniem dat, na które można się zapisać  
  - Podgląd szczegółów turnieju po najechaniu lub kliknięciu  
- **Formularz zgłoszeniowy**  
  - Dynamiczne wypełnianie danych drużyny (w przyszłej wersji z walidacją pól)  
- **Regulamin**  
  - Przejrzysty podział na sekcje: zasady ogólne, zasady zapisów, uczestnicy, bezpieczeństwo itd.  
- **Galeria**  
  - Scrollowana lista miniatur zdjęć z dotychczasowych turniejów  
- **O nas**  
  - Informacje o drużynie, misji, korzyściach z uczestnictwa i dane kontaktowe  

---

## 🛠️ Technologie

- **Frontend:** React, React Hooks, React Icons  
- **Styling:** czysty CSS (moduły CSS w poszczególnych komponentach)  
- **Backend-as-a-Service:** Firebase (Firestore) do przechowywania danych turniejów :contentReference[oaicite:1]{index=1}  
- **Responsywność & dostępność:**  
  - Minimum dwa tryby wyświetlania (mobile / desktop)  
  - Zgodność z wytycznymi WCAG  
- **Asynchroniczna komunikacja** z bazą danych przez REST API  

---