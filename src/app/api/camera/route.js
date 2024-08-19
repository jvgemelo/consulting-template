// app/api/cameras/route.js

import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma"


export async function GET() {
  console.log(process.env.DATABASE_URL);
  try {
    const cameras = await prisma.camera.findMany(); 
    return NextResponse.json(cameras); 
  } catch (error) {
    console.error('Error al obtener los datos de la tabla Camera:', error);
    return NextResponse.json({ error: 'Ocurrió un error al obtener los datos.' }, { status: 500 });
  }
}
