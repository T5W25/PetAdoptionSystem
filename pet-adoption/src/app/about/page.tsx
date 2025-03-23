"use client";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
                <p className="text-gray-600 text-lg">
                    Welcome to our Pet Adoption website! Our mission is to help loving pets find their forever homes.
                    Whether you’re looking for a furry companion or want to support pet welfare, we’re here to connect you with adorable pets in need.
                </p>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Browse Pets
                    </Link>
                </div>
            </div>
        </div>
    );
}
