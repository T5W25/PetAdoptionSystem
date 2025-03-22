'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import styles from './login.module.css';
import { useUser } from '../../context/UserContext'; 

export default function Login() {
    const router = useRouter();
    const { setUserId } = useUser(); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/user-operation/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');

            // save to context
            setUserId(data.user.id);

            console.log("login page", data.user.id);

            if (window.opener) {
                window.opener.location.reload(); 
                window.close(); 
            } else {
                router.push('/');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <Head>
                <title>Login | PetMatch</title>
            </Head>
            <div className={styles.loginContainer}>
                <h2 className={styles.loginTitle}>Sign in to your account</h2>
                {error && <p className={styles.loginError}>{error}</p>}
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.loginInput}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={styles.loginInput}
                    />
                    <button type="submit" disabled={isLoading} className={styles.loginButton}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <p className={styles.loginBottomText}>
                    Do not have an account?{' '}
                    <a href="/auth/register" className={styles.loginLink}>
                        Register
                    </a>
                </p>
            </div>
        </>
    );
}
