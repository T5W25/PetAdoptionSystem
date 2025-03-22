"use client";

import { useState, useEffect } from "react";

interface ContactFormProps {
    email: string; // target email
}

const ContactForm: React.FC<ContactFormProps> = ({ email }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            setStatus("User ID not found.");
            return;
        }

        const formData = {
            userId,
            recipientEmail: email,
            subject,
            message,
        };

        try {
            const response = await fetch("/api/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("Email sent successfully!");
            } else {
                setStatus("Failed to send email.");
            }
        } catch (error) {
            setStatus("Error sending email.");
        }
    };

    return (
        <div className="p-4 border rounded-md">
            <h2 className="text-lg font-semibold mb-2">Contact Form</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <label className="text-sm">
                    Subject:
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="border p-1 rounded w-full"
                    />
                </label>
                <label className="text-sm">
                    Message:
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="border p-1 rounded w-full"
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Send Email
                </button>
            </form>
            {status && <p className="mt-2 text-sm">{status}</p>}
        </div>
    );
};

export default ContactForm;
