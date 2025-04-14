import { POST } from '@/app/api/sendEmail/route'
import { NextRequest } from 'next/server'
import { ReadableStream } from 'node:stream/web'

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockResolvedValue(true),
    }),
}))

const encoder = new TextEncoder()

function createMockRequest(body: any): NextRequest {
    const url = 'http://localhost/api/send-email'
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

describe('POST /api/send-email', () => {
    it('should send email successfully with valid data', async () => {
        const req = createMockRequest({
            userId: 1,
            recipientEmail: 'recipient@example.com',
            subject: 'Test Subject',
            message: 'This is the email body.',
        })

        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(200)
        expect(json.message).toBe('Email sent successfully')
    })

    it('should return 400 if fields are missing or invalid', async () => {
        const req = createMockRequest({
            userId: 'not-a-number', 
            recipientEmail: 'recipient@example.com',
            subject: 'Test Subject',
            message: 'Body',
        })

        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(400)
        expect(json.error).toBe('Invalid or missing fields')
    })

    it('should return 500 if email sending fails', async () => {
        const nodemailer = require('nodemailer')
        nodemailer.createTransport().sendMail.mockRejectedValueOnce(new Error('Fake error'))

        const req = createMockRequest({
            userId: 1,
            recipientEmail: 'recipient@example.com',
            subject: 'Test',
            message: 'Test message',
        })

        const res = await POST(req)
        const json = await res.json()

        expect(res.status).toBe(500)
        expect(json.error).toBe('Error sending email')
    })
})
