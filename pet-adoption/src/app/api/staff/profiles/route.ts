import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get("userId");

    try {
        if (userIdParam) {
            const userId = parseInt(userIdParam, 10);
            if (isNaN(userId)) {
                return NextResponse.json({ error: "Invalid userId parameter" }, { status: 400 });
            }

            const profile = await prisma.shelterStaffProfile.findUnique({
                where: { userId },
                include: {
                    fosterProfiles: true,
                    adopters: true,
                },
            });

            if (!profile) {
                return NextResponse.json({ error: "Profile not found" }, { status: 404 });
            }

            return NextResponse.json({
                profile: {
                    ...profile,
                    fosterProfiles: profile.fosterProfiles || [],
                    adopters: profile.adopters || [],
                },
            });
        }

        const profiles = await prisma.shelterStaffProfile.findMany({
            include: {
                fosterProfiles: true,
                adopters: true,
            },
        });

        const safeProfiles = profiles.map(profile => ({
            ...profile,
            fosterProfiles: profile.fosterProfiles || [],
            adopters: profile.adopters || [],
        }));

        return NextResponse.json({ profiles: safeProfiles });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch profiles", details: error }, { status: 500 });
    }
}
