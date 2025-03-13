"use client"
import { useState } from 'react';

export default function AboutPage(){

    const [message, setMessage] = useState('');

    const handleClick = async () => {
        try {
            const response = await fetch("/api/hello");
            const data = await response.json();
            console.log(data);
            setMessage(data.message);
            alert(`Response: ${data.message}`);
        } catch (error) {
            console.error("fetching errored",error);
        }
    }

    const handleCreate = async () => {
        try {
            const exampleUser = {
                email:"zzz@qwe.com",
                name:"test a name"
            };

            const response = await fetch("/api/user-operation", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exampleUser),
            })

            const data = await response.json();
            console.log(data.email);
            alert(`Response: ${data.email}`);

        } catch (error) {
            console.error("post fetching errored",error);
        }
    }

    return (
        <div>
            <h1>About Page</h1>
            <ol>
                <li>
                    <button onClick={handleClick}>Click me!</button>
                </li>
                <li>
                    <button onClick={handleCreate}>create user</button>
                </li>
            </ol>


        </div>
    )
}