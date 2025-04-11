import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = Number(searchParams.get("userid"));

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const applications = await prisma.adoptionApplication.findMany({
            where: { userId },
            include: {
                pet: true,
            },
        });
        
        const petsWithStatus = applications.map((app) => ({
            ...app.pet,
            status: app.status, 
        }));

        return NextResponse.json(petsWithStatus);
    } catch (error) {
        console.error("Error fetching user's adoption applications:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
