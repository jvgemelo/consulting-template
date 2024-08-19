// app/api/cameras/route.js

import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma"


export async function GET() {
  console.log(process.env.DATABASE_URL);
  try {
    const cameras = await prisma.camera.findMany(); // Consulta para obtener todos los registros
    return NextResponse.json(cameras); // Devolver los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener los datos de la tabla Camera:', error);
    return NextResponse.json({ error: 'Ocurrió un error al obtener los datos.' }, { status: 500 });
  }
}
