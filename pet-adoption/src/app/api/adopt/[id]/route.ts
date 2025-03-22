import { NextRequest, NextResponse } from "next/server";
import { apiGET } from "@/lib/apiHelper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type AdoptPet = {
    userId: number;
    petId: number;
};

export async function POST(req: NextRequest) {
    try {
        const body: AdoptPet = await req.json();
        const { userId, petId } = body;

        if (!petId || !userId) {
            return NextResponse.json({ error: "Pet ID and User ID are required" }, { status: 400 });
        }

        const existingAdoption = await prisma.pet.findUnique({
            where: { id: petId },
        });

        if (existingAdoption && existingAdoption.userId === userId) {
            return NextResponse.json({ error: "You have already adopted this pet" }, { status: 409 });
        }

        const apiUrl = `https://api.petfinder.com/v2/animals/${petId}`;

        try {
            const data = await apiGET(req, apiUrl).then((res: any) => res.json());
            const animal = data.animal;

            if (!animal) {
                return NextResponse.json({ error: "Pet not found" }, { status: 404 });
            }

            const pet = {
                id: animal.id,
                name: animal.name,
                age: animal.age,
                gender: animal.gender,
                species: animal.species,
                primaryBreed: animal.breeds.primary,
                secondaryBreed: animal.breeds.secondary || undefined,
                mixed: animal.breeds.mixed,
                url: animal.url,
                photoUrl: animal.primary_photo_cropped ? animal.primary_photo_cropped.small : null,
                userId: userId
            };

            const savedPet = await prisma.pet.upsert({
                where: { id: pet.id },
                update: pet,
                create: pet
            });

            return NextResponse.json(savedPet);
        } catch (err) {
            console.error(`Failed to fetch pet ${petId}:`, err);
            return NextResponse.json({ error: "Failed to fetch pet data" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error saving pet:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

