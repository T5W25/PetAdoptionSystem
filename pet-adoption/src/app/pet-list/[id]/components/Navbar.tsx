"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div>
        <Link href="/" className="text-xl font-bold">
          Pet Adoption
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Dashboard</button>
        </Link>
        <Link href="/adoption">
          <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">Adopt</button>
        </Link>
      </div>
    </nav>
  );
}
