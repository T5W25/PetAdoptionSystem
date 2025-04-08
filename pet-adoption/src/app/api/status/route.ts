import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface ApplicationQuery {
    userId?: string;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query: ApplicationQuery = {
        userId: searchParams.get("userId") ?? undefined,
    };
    
    if (!query.userId) {
        return NextResponse.json({ error: "Missing 'userId' parameter" }, { status: 400 });
    }

    const userId = parseInt(query.userId);
    if (isNaN(userId)) {
        return NextResponse.json({ error: "Invalid 'userId' format" }, { status: 400 });
    }

    try {
        const applications = await prisma.adoptionApplication.findMany({
            where: { userId },
            include: {
                pet: {
                    select: {
                        id: true,
                        name: true,
                        species: true,
                        age: true,
                    },
                },
            },
            orderBy: {
                appliedAt: "desc",
            },
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error("Error fetching applications by userId:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
