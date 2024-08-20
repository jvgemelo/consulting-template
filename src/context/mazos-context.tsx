import { addDays } from 'date-fns';
import React, { createContext, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

const MazoContext = createContext(null);

export function useMazo() {
  return useContext(MazoContext);
}

export function MazoProvider({ children }) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), -5),
        to: new Date(),
      })
  const [mazos, setMazos] = useState([]);

  return (
    <MazoContext.Provider value={{ date, setDate, mazos, setMazos }}>
      {children}
    </MazoContext.Provider>
  );
}
