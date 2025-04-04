// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db'; // your db connection from /lib/db.ts
//
// // Handle POST request to add a pet
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//
//     const { name, age, breed, description, image } = body;
//
//     if (!name || !age || !breed) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }
//
//     const newPet = await prisma.pet.create({
//       data: {
//         name,
//         age: parseInt(age),
//         breed,
//         description,
//         image,
//       },
//     });
//
//     return NextResponse.json(newPet, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to add pet' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { name, age, gender, species, breed, description } = await request.json();

  try {
    const newPet = await prisma.pet.create({
      data: {
        name,
        age,
        gender,
        species,
        primaryBreed: breed,
        description,
      },
    });
    return NextResponse.json(newPet);
  } catch (error) {
    console.error('Error adding pet:', error);
    return NextResponse.json({ error: 'Failed to add pet' }, { status: 500 });
  }
}