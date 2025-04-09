import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { action: string } }) {
    const { adopterId, shelterStaffId } = await req.json();

    if (params.action === "link") {
        try {
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

            const updated = await prisma.adopterProfile.update({
                where: { userId: adopterId },
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

export async function DELETE(req: Request, { params }: { params: { action: string } }) {
    const { adopterId } = await req.json();

    if (params.action === "unlink") {
        try {
            const adopterProfile = await prisma.adopterProfile.findUnique({
                where: { userId: adopterId },
            });

            if (!adopterProfile) {
                return NextResponse.json({ error: "Adopter profile not found" }, { status: 404 });
            }

            const updated = await prisma.adopterProfile.update({
                where: { userId: adopterId },
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
