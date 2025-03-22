import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId: number = Number(searchParams.get("userid"));

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const pets = await prisma.pet.findMany({
            where: { userId: userId }
        });

        return NextResponse.json(pets);  // 直接返回数组，而不是 { pets: pets }
    } catch (error) {
        console.error("Error fetching user's pets:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
