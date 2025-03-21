import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; 

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const action = pathSegments[pathSegments.length - 1]; // 

    const body = await req.json();
    const { email, password, name, userType, location, contact, address, shelterName, interests } = body;

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

            const hashedPassword = await bcrypt.hash(password, 10);
            const normalizedUserType = userType.toUpperCase();

            const userData = {
                email,
                password: hashedPassword,
                name,
                userType: normalizedUserType,
            };

            const user = await prisma.user.create({
                data: {
                    ...userData,
                    ...(normalizedUserType === 'ADOPTER' && location && {
                        adopterProfile: { create: { location } },
                    }),
                    ...(normalizedUserType === 'DONOR' && contact && {
                        donorProfile: { create: { contact } },
                    }),
                    ...(normalizedUserType === 'FOSTER' && address && {
                        fosterProfile: { create: { address } },
                    }),
                    ...(normalizedUserType === 'SHELTER' && shelterName && {
                        shelterStaffProfile: { create: { shelterName } },
                    }),
                    ...(normalizedUserType === 'VOLUNTEER' && interests && {
                        volunteerProfile: { create: { interests } },
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