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

const pets = [
  {
    id: '1',
    name: 'Buddy',
    age: '2 years',
    breed: 'Golden Retriever',
    description: 'Friendly and active',
  },
  {
    id: '2',
    name: 'Luna',
    age: '1 year',
    breed: 'Siberian Husky',
    description: 'Loves to play in the snow',
  },
];

export async function GET() {
  return NextResponse.json(pets);
}
