"use client";

import React from "react";
import ContactForm from "./ContactForm";

interface ContactModalProps {
    email: string;
    shelterId: number;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ email, shelterId, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-6 relative max-w-md w-full shadow-lg">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <ContactForm email={email} shelterId={shelterId} />
            </div>
        </div>
    );
};

export default ContactModal;
