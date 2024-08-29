"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getMachineStatusRecords, getMazoRecords, getPersonRecords } from "@/actions/data"
import { useMazo } from "@/context/giro-context"
import { StepStatus } from "@chakra-ui/react"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {

  const { date, setDate, mazos, setMazos, personas, setPersonas, status, setStatus, processPersonRecords} = useMazo();
  const [loading, setLoading] = React.useState(true);


//   function calculateMachineStatusTime(records, dateFrom, dateTo) {
//     if (!records || records.length === 0) {
//         return null;
//     }

//     // Convertir dateFrom y dateTo a objetos Date
//     const fromDate = new Date(dateFrom);
//     const toDate = new Date(dateTo);

//     // Convertir los registros a objetos Date y ordenarlos por timestamp
//     const df = records.map(record => ({
//         timestamp: new Date(record.timestamp),
//         status: record.status
//     })).filter(record => record.timestamp >= fromDate && record.timestamp <= toDate); // Filtrar registros dentro del rango

//     // Ordenar registros por timestamp
//     df.sort((a, b) => a.timestamp - b.timestamp);

//     // Agregar la columna de next_timestamp y calcular duraciones
//     for (let i = 0; i < df.length; i++) {
//         df[i].next_timestamp = (i < df.length - 1) ? new Date(df[i + 1].timestamp) : new Date(df[i].timestamp.getTime() + 60 * 60 * 1000); // Agrega 1 hora al último registro
//         df[i].duration = (df[i].next_timestamp - df[i].timestamp) / (1000 * 60 * 60); // Duración en horas
//     }

//     // Comprobar si el rango de fechas incluye varios días
//     const uniqueDays = new Set(df.map(record => record.timestamp.toISOString().split('T')[0]));

//     if (uniqueDays.size > 1) {
//         // Crear un array para todos los días en el rango
//         const daysRange = [];
//         for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
//             daysRange.push(new Date(d));
//         }

//         // Inicializar las columnas 'on' y 'off'
//         const df_full = daysRange.map(day => ({
//             date: day.toISOString().split('T')[0],
//             on: 0,
//             off: 0
//         }));

//         // Iterar sobre los registros originales y rellenar los días correspondientes en df_full
//         df.forEach(record => {
//             let start_time = record.timestamp;
//             let end_time = record.next_timestamp;
//             let status = record.status;

//             while (start_time < end_time) {
//                 const day_start = new Date(start_time.toISOString().split('T')[0]);
//                 const day_end = new Date(day_start.getTime() + 24 * 60 * 60 * 1000);
//                 const time_in_day = Math.min(end_time, day_end) - start_time;

//                 if (status === 'on') {
//                     df_full.find(day => day.date === day_start.toISOString().split('T')[0]).on += time_in_day / (1000 * 60 * 60); // convertir milisegundos a horas
//                 } else {
//                     df_full.find(day => day.date === day_start.toISOString().split('T')[0]).off += time_in_day / (1000 * 60 * 60);
//                 }

//                 start_time = day_end;
//             }
//         });

//         return df_full;

//     } else {
//         // Crear un array para todas las horas en el rango
//         const startHour = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), fromDate.getHours());
//         const endHour = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), toDate.getHours());
//         const hoursRange = [];
//         for (let h = startHour; h <= endHour; h.setHours(h.getHours() + 1)) {
//             hoursRange.push(new Date(h));
//         }

//         // Inicializar las columnas 'on' y 'off'
//         const df_full = hoursRange.map(hour => ({
//             timestamp: hour.toISOString(),
//             on: 0,
//             off: 0
//         }));

//         // Iterar sobre los registros originales y rellenar las horas correspondientes en df_full
//         df.forEach(record => {
//             let start_time = record.timestamp;
//             let end_time = record.next_timestamp;
//             let status = record.status;

//             while (start_time < end_time) {
//                 const hour_start = new Date(start_time.getFullYear(), start_time.getMonth(), start_time.getDate(), start_time.getHours());
//                 const hour_end = new Date(hour_start.getTime() + 60 * 60 * 1000);
//                 const time_in_hour = Math.min(end_time, hour_end) - start_time;

//                 if (status === 'on') {
//                     df_full.find(hour => hour.timestamp === hour_start.toISOString()).on += time_in_hour / (1000 * 60 * 60); // convertir milisegundos a horas
//                 } else {
//                     df_full.find(hour => hour.timestamp === hour_start.toISOString()).off += time_in_hour / (1000 * 60 * 60);
//                 }

//                 start_time = hour_end;
//             }
//         });

//         return df_full.map(record => ({
//             timestamp: record.timestamp,
//             hour: new Date(record.timestamp).getHours(),
//             on: record.on,
//             off: record.off
//         }));
//     }
// }


  React.useEffect(() => {
    if (date?.from && date?.to) {
      setLoading(true) // Inicia el loading antes de la llamada a la API
      getMazoRecords(date.from, date.to)
        .then((records) => {
          // Filtrar los registros para obtener solo el último total de cada día
          const filteredRecords = records.reduce((acc, record) => {
            const recordDate = format(new Date(record.timestamp), 'yyyy-MM-dd')
            if (!acc[recordDate] || new Date(record.timestamp) > new Date(acc[recordDate].timestamp)) {
              acc[recordDate] = record
            }
            return acc
          }, {})

          // Convertir el objeto en un array
          const finalRecords = Object.values(filteredRecords)


          setMazos(finalRecords) // Guarda los registros filtrados en el estado
          setLoading(false) // Termina el loading después de la llamada a la API
        })
        .catch((error) => {
          console.error("Error fetching mazo records:", error)
          setLoading(false) // Asegura que el loading termine en caso de error
        })
      setLoading(true)
      getPersonRecords(date.from, date.to)
        .then((records) => {
          const finalRecords = Object.values(records);
          const processedData = processPersonRecords(finalRecords, date.from, date.to);
          console.log("Processed Data:", processedData);
          setPersonas(processedData); // Guarda los registros filtrados en el estado
          setLoading(false); // Termina el loading después de la llamada a la API
        })
        .catch((error) => {
          console.error("Error fetching person records:", error);
          setLoading(false); // Asegura que el loading termine en caso de error
        });
      // getMachineStatusRecords(date.from, date.to)
      //   .then((records) => {
      //     const finalRecords = Object.values(records)
      //     const processedData = calculateMachineStatusTime(finalRecords, date.from, date.to)
      //     console.log("datos status -->", processedData)
      //     setStatus(processedData)
      //     setLoading(false)
      //   })
    }

  }, [date]) // Dependencia en el rango de fechas

  // console.log("Date range", date)
  // console.log("MAZOS", mazos)
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
