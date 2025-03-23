import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { adopterId, shelterStaffId } = await req.json();

        const adopterProfile = await prisma.adopterProfile.findUnique({
            where: { userId: adopterId },  
        });


        if (!adopterProfile) {
            return NextResponse.json({ error: "Adopter profile not found" }, { status: 404 });
        }

        const shelterStaff = await prisma.shelterStaffProfile.findUnique({
            where: { id: shelterStaffId },
        });

        if (!shelterStaff) {
            return NextResponse.json({ error: "Shelter staff profile not found" }, { status: 404 });
        }

        const updatedAdopterProfile = await prisma.adopterProfile.update({
            where: { userId: adopterId }, 
            data: { shelterStaffId },
        });


        return NextResponse.json({ message: "Adopter profile linked to shelter staff", data: updatedAdopterProfile });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
