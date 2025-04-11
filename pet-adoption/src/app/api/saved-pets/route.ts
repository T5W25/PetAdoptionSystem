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
            select: { favoritePetIds: true },
        });

        if (!user || !user.favoritePetIds || user.favoritePetIds.length === 0) {
            return NextResponse.json([]);
        }

        const originalPetIds: number[] = user.favoritePetIds;

        const petDataPromises = originalPetIds.map(async (id) => {
            const apiUrl = `https://api.petfinder.com/v2/animals/${id}`;
            try {
                const res = await apiGET(req, apiUrl);

                if (!res.ok) {
                    console.warn(`Pet ${id} not found (status: ${res.status})`);
                    return { invalidId: id };
                }

                const data = await res.json();
                const animal = data?.animal;

                if (!animal || !animal.id) {
                    console.warn(`Invalid data for pet ${id}:`, data);
                    return { invalidId: id };
                }

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
                    primary_photo_cropped: animal.primary_photo_cropped
                        ? { small: animal.primary_photo_cropped.small }
                        : null,
                };
            } catch (err) {
                console.error(`Error fetching pet ${id}:`, err);
                return { invalidId: id };
            }
        });

        const results = await Promise.all(petDataPromises);

        const validPets = results.filter((p): p is Exclude<typeof p, { invalidId: number }> => !("invalidId" in p));
        const invalidIds = results
            .filter((r): r is { invalidId: number } => "invalidId" in r)
            .map((r) => r.invalidId);
        
        if (invalidIds.length > 0) {
            const cleanedPetIds = originalPetIds.filter((id) => !invalidIds.includes(id));
            await prisma.user.update({
                where: { id: userId },
                data: {
                    favoritePetIds: { set: cleanedPetIds },
                },
            });
            console.log(`Cleaned up invalid pet IDs for user ${userId}:`, invalidIds);
        }

        return NextResponse.json(validPets);
    } catch (error) {
        console.error("Error fetching saved pets:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
