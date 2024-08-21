"use server"

import prisma from "@/lib/prisma"

export const getCameraByZoneId = async (zone_id: number) => {

    try {
        const camera = await prisma.camera.findFirst({
            where: { zone_id },
        })

        if (!camera) {
            throw new Error("No event found for the specified camera")
        }
        return camera
    } catch (error) {
        console.error("Error fetching the camera;", error)
        throw new Error("Failed to fetch the last event")
    }
}


export const getZone = async () => {
    try {
        const zone = await prisma.zone.findFirst({
        })
        if (!zone) {
            throw new Error("No event found for the specified camera")
        }
        return zone
    } catch (error) {
        console.error("Error fetching the camera;", error)
        throw new Error("Failed to fetch the last event")
    }
}
export const getCount = async () => {
    try {
        const area = await prisma.count.findFirst({
        })
        if (!area) {
            throw new Error("No event found for the specified camera")
        }
        return area
    } catch (error) {
        console.error("Error fetching the camera;", error)
        throw new Error("Failed to fetch the last event")
    }
}

export const getMazoRecords = async (startDatetime: Date, endDatetime: Date) => {
    try {
        const records = await prisma.count.findMany({
            where: {
                object: 'mazo',
                timestamp: {
                    gte: startDatetime,  // Greater than or equal to startDatetime
                    lte: endDatetime,    // Less than or equal to endDatetime
                },
            },
            select: {
                timestamp: true,
                total: true,
            },
            orderBy: {
                timestamp: 'asc',
            },
        })
        return records;
    } catch (error) {
        console.error("Error fetching the camera;", error)
        throw new Error("Failed to fetch the last event")
    }
}

export const getPersonRecords = async (startDatetime: Date, endDatetime: Date) => {
    try {
        const records = await prisma.count.findMany({
            where: {
                object: 'person',
                timestamp: {
                    gte: startDatetime,  // Greater than or equal to startDatetime
                    lte: endDatetime,    // Less than or equal to endDatetime
                },
            },
            select: {
                timestamp: true,
                total: true,
            },
            orderBy: {
                timestamp: 'asc',
            },
        })
        return records;
    } catch (error) {
        console.error("Error fetching the camera;", error)
        throw new Error("Failed to fetch the last event")
    }
}