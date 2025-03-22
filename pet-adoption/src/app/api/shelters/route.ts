import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const shelters = await prisma.shelterStaffProfile.findMany({
            select: {
                id: true,
                shelterName: true,
                isVerified: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })

        return NextResponse.json(shelters, { status: 200 })
    } catch (error) {
        console.error('[GET_SHELTERS_ERROR]', error)
        return NextResponse.json({ error: 'Failed to fetch shelters' }, { status: 500 })
    }
}
