import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(params.id) } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })
        }
        return NextResponse.json(user)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.user.delete({ where: { id: Number(params.id) } });
        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
