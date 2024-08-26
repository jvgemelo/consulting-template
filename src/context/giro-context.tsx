'use client'
import React, { createContext, useContext, useState } from 'react';
import { addDays, format } from "date-fns"

// const MazoContext = createContext<any>(undefined)
interface MazoContextType {
  date: Date | null;
  setDate: (date: Date | null) => void;
  mazos: any[]; // Cambia `any` al tipo correcto si sabes la estructura de los objetos en `mazos`
  setMazos: (mazos: any[]) => void; // Cambia `any` al tipo correcto si sabes la estructura de los objetos en `mazos`
  personas: any[]; // Cambia `any` al tipo correcto si sabes la estructura de los objetos en `personas`
  setPersonas: (personas: any[]) => void; // Cambia `any` al tipo correcto si sabes la estructura de los objetos en `personas`
}

const MazoContext = createContext<MazoContextType>({
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

export function MazoProvider({ children }: any) {
    const [date, setDate] = React.useState<any>({
        from: addDays(new Date(), -5),
        to: new Date(),
      })
//   const [date, setDate] = useState(null);
const [mazos, setMazos] = useState<any[]>([]);
const [personas, setPersonas] = useState<any[]>([]);


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
