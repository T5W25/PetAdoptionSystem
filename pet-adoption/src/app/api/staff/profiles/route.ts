import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const profiles = await prisma.shelterStaffProfile.findMany({
            include: {
                fosterProfiles: true, // Correct field name
                adopters: true, // Correct field name
            },
        });

        // Ensure the returned profiles always contain an array
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
