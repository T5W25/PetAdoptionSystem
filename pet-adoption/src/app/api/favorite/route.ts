import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type SaveFavoritePetRequest = {
    userId: number;
    petId: number;
};

export async function POST(req: NextRequest) {
    try {
        const { userId, petId }: SaveFavoritePetRequest = await req.json();

        if (!userId || !petId) {
            return NextResponse.json({ error: "Missing userId or petId" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { favoritePetIds: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const updatedFavorites = Array.from(new Set([...(user.favoritePetIds || []), petId]));
        
        if (updatedFavorites.length === user.favoritePetIds?.length) {
            return NextResponse.json({ message: "Pet is already in favorites" }, { status: 200 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                favoritePetIds: { set: updatedFavorites }
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { userId, petId }: SaveFavoritePetRequest = await req.json();

        if (!userId || !petId) {
            return NextResponse.json({ error: "Missing userId or petId" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { favoritePetIds: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updatedFavorites = (user.favoritePetIds || []).filter((id) => id !== petId);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                favoritePetIds: { set: updatedFavorites }
            }
        });

        return NextResponse.json({ message: "Removed from favorites", user: updatedUser });
    } catch (error) {
        console.error("Error removing favorite:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
