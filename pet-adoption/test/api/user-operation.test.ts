import { POST } from '@/app/api/user-operation/[action]/route'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ReadableStream } from 'node:stream/web'

const prisma = new PrismaClient()
const encoder = new TextEncoder()

const testEmail = 'test@example.com'
const testPassword = 'TestPass123!'

function createMockRequest(action: string, body: any): NextRequest {
    const url = `http://localhost/api/user-operation/${action}`
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
    await prisma.user.deleteMany({ where: { email: testEmail } })
})

afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } })
    await prisma.$disconnect()
})

describe('POST /api/user-operation/[action]', () => {
    it('should register an ADOPTER successfully', async () => {
        const req = createMockRequest('register', {
            email: testEmail,
            password: testPassword,
            name: 'Test User',
            userType: 'ADOPTER',
            location: 'Toronto',
        })

        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(201)
        expect(json.message).toBe('Registration successful')
        expect(json.user.email).toBe(testEmail)
    })

    it('should fail to register with existing email', async () => {
        const req = createMockRequest('register', {
            email: testEmail,
            password: testPassword,
            name: 'Test User',
            userType: 'ADOPTER',
            location: 'Toronto',
        })

        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(400)
        expect(json.message).toBe('Email already exists')
    })

    it('should login successfully', async () => {
        const req = createMockRequest('login', {
            email: testEmail,
            password: testPassword,
        })

        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.message).toBe('Login successful')
        expect(json.user.email).toBe(testEmail)
    })

    it('should fail login with wrong password', async () => {
        const req = createMockRequest('login', {
            email: testEmail,
            password: 'WrongPassword!',
        })

        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(401)
        expect(json.message).toBe('Invalid email or password')
    })
})
