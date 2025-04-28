import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

export function CalendarWidget() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4 bg-white  dark:bg-gray-800 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-fuchsia-600 mb-4 text-center">Calendrier</h2>
      <Calendar
        onChange={setDate}
        value={date}
        className="w-full rounded-lg"
        tileClassName={({ date, view }) => {
          // Ajouter des styles pour le jour sélectionné ou un jour spécifique
          if (view === 'month' && date.toDateString() === new Date().toDateString()) {
            return 'bg-pink-200 text-fuchsia-700 font-bold rounded-lg';
          }
          return null;
        }}
       
      />
      <p className="text-center mt-4 text-indigo-700 dark:text-indigo-300">
        Date sélectionnée : {date.toLocaleDateString()}
      </p>
    </div>
  );
}
