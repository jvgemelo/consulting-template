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
import { getMazoRecords, getPersonRecords } from "@/actions/data"
import { useMazo } from "@/context/giro-context"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  
  const { date, setDate, mazos, setMazos, personas, setPersonas } = useMazo();
  const [loading, setLoading] = React.useState(true);
  
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

          
          setPersonas(finalRecords) // Guarda los registros filtrados en el estado
          setLoading(false) // Termina el loading después de la llamada a la API
        })
        .catch((error) => {
          console.error("Error fetching mazo records:", error)
          setLoading(false) // Asegura que el loading termine en caso de error
        })
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
