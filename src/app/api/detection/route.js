// app/api/cameras/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';


import prisma from "@/lib/prisma"

// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'], // Ejemplo de opciones adicionales
// });
console.log(process.env.DATABASE_URL);
export async function GET() {
  console.log(process.env.DATABASE_URL);
  try {
    const cameras = await prisma.cam // Consulta para obtener todos los registros
    return NextResponse.json(cameras); // Devolver los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener los datos de la tabla Camera:', error);
    return NextResponse.json({ error: 'Ocurrió un error al obtener los datos.' }, { status: 500 });
  }
}
