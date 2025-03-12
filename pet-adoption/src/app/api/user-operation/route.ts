import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { email, name } = await req.json();

        if (!email || !name) {
            return NextResponse.json({ error: "email or name is required" }, { status: 400 });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "failed to create user" }, { status: 500 });
    }
}
