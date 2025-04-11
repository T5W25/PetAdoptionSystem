import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get("userId") ?? "");
    const petId = searchParams.get("petId") ? parseInt(searchParams.get("petId")!) : undefined;
    const status = searchParams.get("status");

    if (status === "PENDING") {
        try {
            const pendingApps = await prisma.adoptionApplication.findMany({
                where: { status: "PENDING" },
                include: { pet: true },
                orderBy: { appliedAt: "desc" },
            });
            return NextResponse.json(pendingApps);
        } catch (error) {
            console.error("GET PENDING error:", error);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }

    if (isNaN(userId)) {
        return NextResponse.json({ error: "Missing or invalid 'userId'" }, { status: 400 });
    }

    try {
        if (petId !== undefined && !isNaN(petId)) {
            const application = await prisma.adoptionApplication.findFirst({
                where: { userId, petId },
                include: { pet: true },
            });
            return NextResponse.json(application);
        } else {
            const applications = await prisma.adoptionApplication.findMany({
                where: { userId },
                include: { pet: true },
                orderBy: { appliedAt: "desc" },
            });
            return NextResponse.json(applications);
        }
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId, petId } = await req.json();

        const parsedUserId = parseInt(userId);
        const parsedPetId = parseInt(petId);

        if (isNaN(parsedUserId) || isNaN(parsedPetId)) {
            return NextResponse.json({ error: "Invalid 'userId' or 'petId'" }, { status: 400 });
        }

        const newApplication = await prisma.adoptionApplication.create({
            data: {
                userId: parsedUserId,
                petId: parsedPetId,
                appliedAt: new Date(),
            },
        });

        return NextResponse.json(newApplication, { status: 201 });
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get("userId") ?? "");
    const petId = parseInt(searchParams.get("petId") ?? "");

    if (isNaN(userId) || isNaN(petId)) {
        return NextResponse.json({ error: "Missing or invalid 'userId' or 'petId'" }, { status: 400 });
    }

    try {
        const deleted = await prisma.adoptionApplication.deleteMany({
            where: { userId, petId },
        });

        return NextResponse.json({ message: `${deleted.count} application(s) deleted.` });
    } catch (error) {
        console.error("DELETE error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { userId, petId, newStatus } = await req.json();

        const parsedUserId = parseInt(userId);
        const parsedPetId = parseInt(petId);

        if (
            isNaN(parsedUserId) ||
            isNaN(parsedPetId) ||
            !["PENDING", "APPROVED", "REJECTED", "CANCELED"].includes(newStatus)
        ) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        const updatedApp = await prisma.adoptionApplication.updateMany({
            where: { userId: parsedUserId, petId: parsedPetId, status: "PENDING" },
            data: {
                status: newStatus,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({ message: `${updatedApp.count} application(s) updated.` });
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
