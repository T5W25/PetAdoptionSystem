'use client';

import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav>
            <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
            {isOpen && (
                <ul>
                    <li><a href="/auth">Login/Register</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            )}
        </nav>
    );
}