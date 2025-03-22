import { NextRequest, NextResponse } from "next/server";
import { apiGET } from "@/lib/apiHelper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

export async function GET(req: NextRequest) {
    try {
    const { searchParams } = new URL(req.url);
    const userId: number = Number(searchParams.get("userid"));

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

        const user = await prisma.user.findUnique({
        where: { id: userId },
            select: { favoritePetIds: true }
        });

        if (!user || !user.favoritePetIds || user.favoritePetIds.length === 0) {
            return NextResponse.json({ pets: [] });
        }

        const petIds: number[] = user.favoritePetIds;

        const petDataPromises = petIds.map(async (id) => {
            const apiUrl = `https://api.petfinder.com/v2/animals/${id}`;
            try {
                const data = await apiGET(req, apiUrl).then((res: any) => res.json());
                const animal = data.animal;

                return {
                    id: animal.id,
                    name: animal.name,
                    age: animal.age,
                    gender: animal.gender,
                    species: animal.species,
                    breeds: {
                        primary: animal.breeds.primary,
                        secondary: animal.breeds.secondary || undefined,
                        mixed: animal.breeds.mixed,
                    },
                    url: animal.url,
                    primary_photo_cropped: animal.primary_photo_cropped ? { small: animal.primary_photo_cropped.small } : null,
                };
            } catch (err) {
                console.error(`Failed to fetch pet ${id}:`, err);
                return null;
            }
        });

        const pets = await Promise.all(petDataPromises);

        const validPets = pets.filter((pet) => pet !== null);

        return NextResponse.json(validPets);
    } catch (error) {
        console.error("Error fetching saved pets:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
