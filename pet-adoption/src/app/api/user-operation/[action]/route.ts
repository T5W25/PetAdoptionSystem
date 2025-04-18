import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const action = pathSegments[pathSegments.length - 1];

    const body = await req.json();
    const {
        email,
        password,
        name,
        userType,
        location,
        contact,
        address,
        shelterName,
        interests,
        licenseNumber,
        clinicName,
        contactNumber,
        specialization
    } = body;

    try {
        if (action === 'login') {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, userType: user.userType },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            return NextResponse.json({
                message: 'Login successful',
                token,
                user: { id: user.id, email: user.email, name: user.name, userType: user.userType },
            }, { status: 200 });

        } else if (action === 'register') {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
            }

            if (!email || !password || !name || !userType) {
                return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
            }

            if (userType === 'ADOPTER' && !location) {
                return NextResponse.json({ message: 'Adopter must provide location' }, { status: 400 });
            }
            if (userType === 'DONOR' && !contact) {
                return NextResponse.json({ message: 'Donor must provide contact' }, { status: 400 });
            }
            if (userType === 'FOSTER' && !address) {
                return NextResponse.json({ message: 'Foster must provide address' }, { status: 400 });
            }
            if (userType === 'SHELTER' && !shelterName) {
                return NextResponse.json({ message: 'Shelter must provide shelterName' }, { status: 400 });
            }
            if (userType === 'VOLUNTEER' && !interests) {
                return NextResponse.json({ message: 'Volunteer must provide interests' }, { status: 400 });
            }
            if (userType === 'VETERINARIAN') {
                if (!licenseNumber || !clinicName || !contactNumber) {
                    return NextResponse.json({ message: 'Veterinarian must provide licenseNumber, clinicName, and contactNumber' }, { status: 400 });
                }
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const userData = {
                email,
                password: hashedPassword,
                name,
                userType,
            };

            const user = await prisma.user.create({
                data: {
                    ...userData,
                    ...(userType === 'ADOPTER' && { adopterProfile: { create: { location } } }),
                    ...(userType === 'DONOR' && { donorProfile: { create: { contact } } }),
                    ...(userType === 'FOSTER' && { fosterProfile: { create: { address } } }),
                    ...(userType === 'SHELTER' && { shelterStaffProfile: { create: { shelterName } } }),
                    ...(userType === 'VOLUNTEER' && { volunteerProfile: { create: { interests } } }),
                    ...(userType === 'VETERINARIAN' && {
                        veterinarianProfile: {
                            create: {
                                licenseNumber,
                                clinicName,
                                contactNumber,
                                specialization: specialization || null,
                            },
                        },
                    }),
                },
            });

            const token = jwt.sign(
                { userId: user.id, email: user.email, userType: user.userType },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            return NextResponse.json({
                message: 'Registration successful',
                token,
                user: { id: user.id, email: user.email, name: user.name, userType: user.userType },
            }, { status: 201 });

        } else {
            return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}