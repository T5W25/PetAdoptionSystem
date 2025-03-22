import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure Prisma is set up correctly

export async function POST(req: Request) {
  try {
    const { name, type, age } = await req.json();

    // Save pet to database
    const newPet = await prisma.pet.create({
      data: { name, type, age: parseInt(age) },
    });

    return NextResponse.json({ message: "Pet added successfully", newPet });
  } catch (error) {
    return NextResponse.json({ error: "Error adding pet" }, { status: 500 });
  }
}