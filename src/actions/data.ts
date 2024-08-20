"use server"

import prisma from "@/lib/prisma"

export const getCameraByZoneId = async (zone_id: number ) => {
    
    try{
        const camera = await prisma.camera.findFirst({
            where: { zone_id },
        })
        
        if(!camera){
            throw new Error("No event found for the specified camera")
        }
        return camera
    } catch(error) {
        console.error("Error fetching the camera;", error)
        throw new Error("Failed to fetch the last event")
    }
}


export const getCount = async () => {
    
    try{
        const camera = await prisma.zone.findFirst({
        })
        
        if(!camera){
            throw new Error("No event found for the specified camera")
        }
        return camera
    } catch(error) {
        console.error("Error fetching the camera;", error)
        throw new Error("Failed to fetch the last event")
    }
}