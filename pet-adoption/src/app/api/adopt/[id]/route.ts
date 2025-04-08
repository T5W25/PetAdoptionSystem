import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { apiGET } from "@/lib/apiHelper";

const prisma = new PrismaClient();

type AdoptPet = {
    userId: number;
    petId: number;
};

export async function POST(req: NextRequest) {
    try {
        const body: AdoptPet = await req.json();
        const { userId, petId } = body;

        if (!userId || !petId) {
            return NextResponse.json({ error: "Pet ID and User ID are required" }, { status: 400 });
        }
        
        const existingPet = await prisma.pet.findUnique({
            where: { id: petId },
        });

        if (existingPet && existingPet.userId === userId) {
            return NextResponse.json({ error: "You have already adopted this pet." }, { status: 409 });
        }

        const existingApplication = await prisma.adoptionApplication.findFirst({
            where: { userId, petId },
        });

        if (existingApplication) {
            return NextResponse.json({ error: "You have already submitted an adoption application for this pet." }, { status: 409 });
        }

        const apiUrl = `https://api.petfinder.com/v2/animals/${petId}`;
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
            photoUrl: animal.primary_photo_cropped?.small || null,
            userId, 
        };

        const savedPet = await prisma.pet.upsert({
            where: { id: pet.id },
            update: pet,
            create: pet,
        });

        const application = await prisma.adoptionApplication.create({
            data: {
                userId,
                petId,
                status: "PENDING",
                appliedAt: new Date(),
            },
        });

        return NextResponse.json({
            message: "Adoption request submitted successfully.",
            pet: savedPet,
            application,
        }, { status: 201 });
    } catch (error) {
        console.error("Adoption POST error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
