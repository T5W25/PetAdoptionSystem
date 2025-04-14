import { POST, DELETE } from '@/app/api/favorite/route'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ReadableStream } from 'node:stream/web'

const prisma = new PrismaClient()
const encoder = new TextEncoder()

const testUserId = 9999
const testPetId = 101

function createMockRequest(body: any): NextRequest {
    const url = 'http://localhost/api/favorite'
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(JSON.stringify(body)))
            controller.close()
        },
    })

    return new NextRequest(url, {
        method: 'POST',
        body: stream as any,
        headers: { 'Content-Type': 'application/json' },
    })
}

beforeAll(async () => {
    await prisma.user.upsert({
        where: { id: testUserId },
        update: { favoritePetIds: [] },
        create: {
            id: testUserId,
            email: 'favuser@example.com',
            name: 'Favorite User',
            password: 'dummy',
            userType: 'ADOPTER',
            favoritePetIds: [],
        },
    })
})

afterAll(async () => {
    await prisma.user.delete({ where: { id: testUserId } })
    await prisma.$disconnect()
})

describe('POST /api/favorite', () => {
    it('should add pet to favorites', async () => {
        const req = createMockRequest({ userId: testUserId, petId: testPetId })
        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.favoritePetIds).toContain(testPetId)
    })

    it('should not add duplicate pet to favorites', async () => {
        const req = createMockRequest({ userId: testUserId, petId: testPetId })
        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.message).toBe('Pet is already in favorites')
    })
})

describe('DELETE /api/favorite', () => {
    it('should remove pet from favorites', async () => {
        const req = createMockRequest({ userId: testUserId, petId: testPetId })
        // mock DELETE instead of POST
        const res = await DELETE(req)
        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.message).toBe('Removed from favorites')
        expect(json.user.favoritePetIds).not.toContain(testPetId)
    })

    it('should return 404 if user not found', async () => {
        const req = createMockRequest({ userId: -1, petId: testPetId })
        const res = await DELETE(req)
        const json = await res.json()

        expect(res.status).toBe(404)
        expect(json.error).toBe('User not found')
    })

    it('should return 400 if fields are missing', async () => {
        const req = createMockRequest({ petId: testPetId }) // missing userId
        const res = await DELETE(req)
        const json = await res.json()

        expect(res.status).toBe(400)
        expect(json.error).toBe('Missing userId or petId')
    })
})
