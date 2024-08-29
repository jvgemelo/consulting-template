'use client'
import React, { createContext, useCallback, useContext, useState } from 'react';
import { addDays, format } from "date-fns"

// const MazoContext = createContext<any>(undefined)
interface MazoContextType {
  date: DateRange | null;
  setDate: (date: Date | null) => void;
  mazos: any[]; 
  setMazos: (mazos: any[]) => void;
  personas: any[]; 
  setPersonas: (personas: any[]) => void; 
  status: any[]
  setStatus: (status: any[]) => void
  processPersonRecords: ProcessPersonRecords;
}
interface ProcessedRecord {
  timestamp: string;
  hour?: number;
  on: number;
  off: number;
}
interface DateRange {
  from: Date;
  to: Date;
}
type ProcessPersonRecords = (records: any[], dateFrom: Date, dateTo: Date) => ProcessedRecord[] | unknown | null;

const MazoContext = createContext<MazoContextType>({
  date: null,
  setDate: () => { },
  mazos: [],
  setMazos: () => { },
  personas: [],
  setPersonas: () => { },
  status: [],
  setStatus: () => { },
  processPersonRecords: (records: any[], dateFrom: Date, dateTo: Date) => [] 
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
  const [status, setStatus] = useState<any[]>([])

  const processPersonRecords: ProcessPersonRecords = useCallback((records, dateFrom, dateTo) => {
    if (!records || records.length === 0) {
      return null;
    }

    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    const selectedRangeInDays = (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / ONE_DAY_IN_MS;
  
    const processedRecords = {};
  
    // Ordenar registros por timestamp para asegurar la secuencia correcta
    records.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
    // Iterar sobre los registros y calcular las duraciones
    records.forEach((record, index) => {
      const currentTimestamp = new Date(record.timestamp);
      const nextTimestamp = index < records.length - 1 ? new Date(records[index + 1].timestamp) : new Date(currentTimestamp.getTime() + 60 * 60 * 1000);
      const durationInSeconds = (nextTimestamp.getTime() - currentTimestamp.getTime()) / 1000;
      const durationInHours = durationInSeconds / 3600;
  
      // Formatear la fecha como dd/mm/yyyy
      let timeKey;
  
      if (selectedRangeInDays < 2) {
        // Si se selecciona menos de 2 días, agrupar por rangos de 1 hora
        const startHour = currentTimestamp.getHours();
        const rangeStart = new Date(currentTimestamp.getFullYear(), currentTimestamp.getMonth(), currentTimestamp.getDate(), startHour);
        const rangeEnd = new Date(rangeStart.getTime() + 1 * 60 * 60 * 1000); // 1 hora después
        timeKey = `${rangeStart.getHours().toString().padStart(2, '0')}-${rangeEnd.getHours().toString().padStart(2, '0')}h`;
        console.log("Time key", timeKey)
      } else {
        // Si se seleccionan 2 o más días, agrupar por día
        timeKey = currentTimestamp.toLocaleDateString('es-ES');
      }
  
      // Inicializar el objeto para la fecha si no existe
      if (!processedRecords[timeKey]) {
        console.log(" Processed Records" , processedRecords)
        processedRecords[timeKey] = {
          timeStamp: timeKey,
          '0personas': 0,
          '1personas': 0,
          '2personas': 0,
          '3personas': 0,
          '4personas': 0,
          '5personas': 0,
          '6personas': 0,
          '7personas': 0
        };
      }
  
      // Asegurar que solo manejas hasta 4 personas (o más, según lo necesites)
      const totalKey = `${Math.min(record.total, 4)}personas`;
  
      // Sumar la duración a la categoría correspondiente
      processedRecords[timeKey][totalKey] += durationInHours;
    });
  
    // Normalizar los resultados solo si el rango de días es menor a 2
    if (selectedRangeInDays < 2) {
      Object.keys(processedRecords).forEach(timeKey => {
        const totalDuration = Object.values(processedRecords[timeKey]).slice(1).reduce((sum, value) => sum + value, 0); // Suma de todas las duraciones excepto 'timeStamp'
  
        if (totalDuration > 1) {
          // Normalizar para que la suma sea 1
          Object.keys(processedRecords[timeKey]).slice(1).forEach(key => {
            processedRecords[timeKey][key] /= totalDuration;
          });
        }
      });
    } else {
      // Ajustar los resultados para el rango de más de 2 días (sumar a las 24 horas)
      Object.keys(processedRecords).forEach(timeKey => {
        const totalDuration = Object.values(processedRecords[timeKey]).slice(1).reduce((sum, value) => sum + value, 0); // Suma de todas las duraciones excepto 'timeStamp'
  
        // Distribuir las duraciones en las 24 horas del día
        Object.keys(processedRecords[timeKey]).slice(1).forEach(key => {
          processedRecords[timeKey][key] = (processedRecords[timeKey][key] / totalDuration) * 24;
        });
      });
    }
    // Convertir el objeto final a un array
    const finalArray = Object.values(processedRecords);
    console.log("FINAL ARRAY->>>", finalArray)
    return finalArray;
  }, []);

  return (
    <MazoContext.Provider value={{
      date,
      setDate,
      mazos,
      setMazos,
      personas,
      setPersonas,
      status,
      setStatus,
      processPersonRecords
    }}>
      {children}
    </MazoContext.Provider>
  );
}
