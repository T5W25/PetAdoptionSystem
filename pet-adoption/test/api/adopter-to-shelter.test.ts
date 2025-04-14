import { POST, DELETE } from '@/app/api/adopter-to-shelter/[action]/route'
import { PrismaClient } from '@prisma/client'
import { ReadableStream } from 'node:stream/web'

const prisma = new PrismaClient()
const encoder = new TextEncoder()

const testAdopterId = 1001
const testStaffId = 2001

function createMockRequest(body: Record<string, unknown>): Request {
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(JSON.stringify(body)))
            controller.close()
        },
    })

    return new Request('http://localhost', {
        method: 'POST',
        body: stream,
        headers: { 'Content-Type': 'application/json' },
        duplex: 'half', 
    } as unknown as RequestInit) 

}

beforeAll(async () => {
    await prisma.user.createMany({
        data: [
            { id: testAdopterId, email: 'adopter@test.com', name: 'Adopter', password: 'pwd', userType: 'ADOPTER' },
            { id: testStaffId, email: 'staff@test.com', name: 'Staff', password: 'pwd', userType: 'SHELTER' },
        ],
        skipDuplicates: true,
    })

    await prisma.adopterProfile.upsert({
        where: { userId: testAdopterId },
        update: {},
        create: {
            userId: testAdopterId,
            location: 'Toronto',
        },
    })

    await prisma.shelterStaffProfile.upsert({
        where: { id: testStaffId },
        update: {},
        create: {
            id: testStaffId,
            userId: testStaffId,
            shelterName: 'Hope Shelter',
        },
    })
})

afterAll(async () => {
    await prisma.adopterProfile.deleteMany({ where: { userId: testAdopterId } })
    await prisma.shelterStaffProfile.deleteMany({ where: { id: testStaffId } })
    await prisma.user.deleteMany({ where: { id: { in: [testAdopterId, testStaffId] } } })
    await prisma.$disconnect()
})

describe('POST /api/adopter-to-shelter/link', () => {
    it('should link adopter and shelter staff', async () => {
        const req = createMockRequest({ adopterId: testAdopterId, shelterStaffId: testStaffId })
        const res = await POST(req, { params: { action: 'link' } })
        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.message).toBe('Linked successfully')
        expect(json.data.shelterStaffId).toBe(testStaffId)
    })

    it('should fail with invalid action', async () => {
        const req = createMockRequest({ adopterId: testAdopterId, shelterStaffId: testStaffId })
        const res = await POST(req, { params: { action: 'invalid' } })
        const json = await res.json()

        expect(res.status).toBe(400)
        expect(json.error).toBe('Invalid action for POST')
    })
})

describe('DELETE /api/adopter-to-shelter/unlink', () => {
    it('should unlink adopter and shelter staff', async () => {
        const req = createMockRequest({ adopterId: testAdopterId })
        const res = await DELETE(req, { params: { action: 'unlink' } })
        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.message).toBe('Unlinked successfully')
        expect(json.data.shelterStaffId).toBe(null)
    })
})
