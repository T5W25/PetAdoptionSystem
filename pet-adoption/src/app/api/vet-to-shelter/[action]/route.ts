import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, context: { params: { action: string } }) {
    const { action } = context.params;
    const { vetId, shelterStaffId } = await req.json();

    if (action === "link") {
        try {
            const vet = await prisma.veterinarianProfile.findUnique({
                where: { userId: vetId },
            });

            if (!vet) {
                return NextResponse.json({ error: "Veterinarian profile not found" }, { status: 404 });
            }

            const shelterStaff = await prisma.shelterStaffProfile.findUnique({
                where: { id: shelterStaffId },
            });

            if (!shelterStaff) {
                return NextResponse.json({ error: "Shelter staff profile not found" }, { status: 404 });
            }

            const updated = await prisma.veterinarianProfile.update({
                where: { userId: vetId },
                data: { shelterStaffId },
            });

            return NextResponse.json({ message: "Linked successfully", data: updated });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    }

    return NextResponse.json({ error: "Invalid action for POST" }, { status: 400 });
}

export async function DELETE(req: Request, context: { params: { action: string } }) {
    const { action } = context.params;
    const { vetId } = await req.json();

    if (action === "unlink") {
        try {
            const vet = await prisma.veterinarianProfile.findUnique({
                where: { userId: vetId },
            });

            if (!vet) {
                return NextResponse.json({ error: "Veterinarian profile not found" }, { status: 404 });
            }

            const updated = await prisma.veterinarianProfile.update({
                where: { userId: vetId },
                data: { shelterStaffId: null },
            });

            return NextResponse.json({ message: "Unlinked successfully", data: updated });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    }

    return NextResponse.json({ error: "Invalid action for DELETE" }, { status: 400 });
}
