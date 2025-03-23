import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { fosterId, shelterStaffId } = await req.json();

        const fosterProfile = await prisma.fosterProfile.findUnique({
            where: { userId: fosterId },
        });

        if (!fosterProfile) {
            return NextResponse.json({ error: "Foster profile not found" }, { status: 404 });
        }
        
        const shelterStaff = await prisma.shelterStaffProfile.findUnique({
            where: { id: shelterStaffId },
        });

        if (!shelterStaff) {
            return NextResponse.json({ error: "Shelter staff profile not found" }, { status: 404 });
        }

        const updatedFosterProfile = await prisma.fosterProfile.update({
            where: { userId: fosterId },
            data: { shelterStaffId },
        });

        return NextResponse.json({ message: "Foster profile linked to shelter staff", data: updatedFosterProfile });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
