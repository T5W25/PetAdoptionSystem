// This for testing DB
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST() {
    try {
        await Promise.all([
            prisma.pet.deleteMany(),
            prisma.adopterProfile.deleteMany(),
            prisma.donorProfile.deleteMany(),
            prisma.fosterProfile.deleteMany(),
            prisma.shelterStaffProfile.deleteMany(),
            prisma.volunteerProfile.deleteMany(),
            prisma.user.deleteMany(),
        ]);
        
        const hashedPassword = await bcrypt.hash('password123', 10); 
        const users = await prisma.user.createMany({
            data: [
                {
                    email: 'adopter@example.com',
                    password: hashedPassword,
                    name: 'John Adopter',
                    userType: 'ADOPTER',
                },
                {
                    email: 'donor@example.com',
                    password: hashedPassword,
                    name: 'Jane Donor',
                    userType: 'DONOR',
                },
                {
                    email: 'foster@example.com',
                    password: hashedPassword,
                    name: 'Bob Foster',
                    userType: 'FOSTER',
                },
                {
                    email: 'shelter@example.com',
                    password: hashedPassword,
                    name: 'Shelter Staff',
                    userType: 'SHELTER',
                },
                {
                    email: 'volunteer@example.com',
                    password: hashedPassword,
                    name: 'Alice Volunteer',
                    userType: 'VOLUNTEER',
                },
            ],
        });

        const createdUsers = await prisma.user.findMany();
        if (createdUsers.length === 0) {
            throw new Error('Failed to create users');
        }
        
        const adopter = createdUsers.find(u => u.userType === 'ADOPTER');
        const donor = createdUsers.find(u => u.userType === 'DONOR');
        const foster = createdUsers.find(u => u.userType === 'FOSTER');
        const shelter = createdUsers.find(u => u.userType === 'SHELTER');
        const volunteer = createdUsers.find(u => u.userType === 'VOLUNTEER');

        if (!adopter || !donor || !foster || !shelter || !volunteer) {
            throw new Error('One or more user types not found');
        }

        await Promise.all([
            prisma.adopterProfile.create({
                data: {
                    location: 'New York',
                    userId: adopter.id,
                },
            }),
            prisma.donorProfile.create({
                data: {
                    contact: '555-0123',
                    userId: donor.id,
                },
            }),
            prisma.fosterProfile.create({
                data: {
                    address: '123 Foster St',
                    userId: foster.id,
                },
            }),
            prisma.shelterStaffProfile.create({
                data: {
                    shelterName: 'Happy Paws Shelter',
                    isVerified: true,
                    userId: shelter.id,
                },
            }),
            prisma.volunteerProfile.create({
                data: {
                    interests: 'Dog walking, Event support',
                    userId: volunteer.id,
                },
            }),
        ]);
        
        await prisma.pet.createMany({
            data: [
                {
                    name: 'Max',
                    age: 'Young',
                    gender: 'Male',
                    species: 'Dog',
                    primaryBreed: 'Labrador',
                    url: 'http://example.com/pets/max',
                    photoUrl: 'http://example.com/pets/max.jpg',
                    userId: donor.id,
                },
                {
                    name: 'Luna',
                    age: 'Adult',
                    gender: 'Female',
                    species: 'Cat',
                    primaryBreed: 'Persian',
                    url: 'http://example.com/pets/luna',
                    photoUrl: 'http://example.com/pets/luna.jpg',
                    userId: donor.id,
                },
            ],
        });

        return NextResponse.json(
            {
                message: 'Database seeded successfully',
                userCount: users.count,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error seeding database:', error);
        return NextResponse.json(
            {
                message: 'Error seeding database',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}