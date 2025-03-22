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
