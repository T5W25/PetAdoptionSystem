import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { action: string } }) {
    const { fosterId, shelterStaffId } = await req.json();

    if (params.action === "link") {
        try {
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

            const updated = await prisma.fosterProfile.update({
                where: { userId: fosterId },
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
    const { fosterId } = await req.json();

    if (params.action === "unlink") {
        try {
            const fosterProfile = await prisma.fosterProfile.findUnique({
                where: { userId: fosterId },
            });

            if (!fosterProfile) {
                return NextResponse.json({ error: "Foster profile not found" }, { status: 404 });
            }

            const updated = await prisma.fosterProfile.update({
                where: { userId: fosterId },
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
