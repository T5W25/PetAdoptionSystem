/**
 * POST /api/send-email
 *
 * Description:
 * Sends an email using Gmail's SMTP service via Nodemailer.
 *
 * Expected JSON body:
 * {
 *   userId: number,            // The ID of the user sending the email
 *   recipientEmail: string,    // The recipient's email address
 *   subject: string,           // The subject of the email
 *   message: string            // The body of the email
 * }
 *
 * Input Validation:
 * - `userId` must be a valid number
 * - `recipientEmail`, `subject`, and `message` must be strings
 *
 * Required environment variables:
 * - EMAIL_USER: Gmail address used to send the email
 * - EMAIL_PASS: App-specific password for the Gmail account
 *
 * Email Sending Details:
 * - Emails are sent via Gmail using the provided credentials
 * - The email subject will be formatted as: "User {userId}: {subject}"
 *
 * 🔁 Possible Responses:
 * - 200 OK: { message: "Email sent successfully" }
 * - 400 Bad Request: { error: "Invalid or missing fields" }
 * - 500 Internal Server Error: { error: "Error sending email" }
 */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req: Request) {
    try {
        const { userId, recipientEmail, subject, message } = await req.json();

        const parsedUserId = Number(userId); 

        if (
            isNaN(parsedUserId) ||  
            typeof recipientEmail !== "string" ||
            typeof subject !== "string" ||
            typeof message !== "string"
        ) {
            return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: `User ${parsedUserId}: ${subject}`,
            text: message,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Error sending email" }, { status: 500 });
    }
}
