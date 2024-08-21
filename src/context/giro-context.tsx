'use client'
import React, { createContext, useContext, useState } from 'react';
import { addDays, format } from "date-fns"

// const MazoContext = createContext<any>(undefined)

const MazoContext = createContext({
    date: null,
    setDate: () => {},
    mazos: [],
    setMazos: () => {},
    personas: [],
    setPersonas: () => {},
  });

export function useMazo() {
  return useContext(MazoContext);
}

export function MazoProvider({ children }) {
    const [date, setDate] = React.useState<any>({
        from: addDays(new Date(), -5),
        to: new Date(),
      })
//   const [date, setDate] = useState(null);
  const [mazos, setMazos] = useState([]);
  const [personas, setPersonas] = useState([]);

  return (
    <MazoContext.Provider value={{ 
        date,
        setDate,
        mazos,
        setMazos,
        personas,
        setPersonas
         }}>
      {children}
    </MazoContext.Provider>
  );
}
