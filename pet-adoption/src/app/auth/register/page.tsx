'use client';
import styles from './register.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const USER_TYPES = [
    { id: 'ADOPTER', name: 'Adopter', description: 'Looking to adopt a pet' },
    { id: 'DONOR', name: 'Pet Donor', description: 'Want to find a home for a pet' },
    { id: 'FOSTER', name: 'Foster Caregiver', description: 'Provide temporary care for pets' },
    { id: 'SHELTER', name: 'Shelter Staff', description: 'Manage shelter pets and applications' },
    { id: 'VOLUNTEER', name: 'Volunteer', description: 'Help with events and activities' }
];

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'ADOPTER',
        location: '',       
        contact: '',        
        address: '',        
        shelterName: '',    
        interests: ''      
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/user-operation/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');
            window.alert('Registration successful! Please log in.');
            router.push('/auth/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Create a new account</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <select name="userType" value={formData.userType} onChange={handleChange}
                        className={styles.select}>
                    {USER_TYPES.map(type => (
                        <option key={type.id} value={type.id}>{type.name} - {type.description}</option>
                    ))}
                </select>

                <input type="text" name="name" placeholder="Full Name" value={formData.name}
                       onChange={handleChange} required className={styles.input}/>
                <input type="email" name="email" placeholder="Email" value={formData.email}
                       onChange={handleChange} required className={styles.input}/>
                <input type="password" name="password" placeholder="Password" value={formData.password}
                       onChange={handleChange} required className={styles.input}/>

                {formData.userType === 'ADOPTER' && (
                    <input type="text" name="location" placeholder="Your Location" value={formData.location}
                           onChange={handleChange} required className={styles.input}/>
                )}

                {formData.userType === 'DONOR' && (
                    <input type="text" name="contact" placeholder="Contact Info" value={formData.contact}
                           onChange={handleChange} required className={styles.input}/>
                )}

                {formData.userType === 'FOSTER' && (
                    <input type="text" name="address" placeholder="Your Address" value={formData.address}
                           onChange={handleChange} required className={styles.input}/>
                )}

                {formData.userType === 'SHELTER' && (
                    <>
                        <input type="text" name="shelterName" placeholder="Shelter Name"
                               value={formData.shelterName} onChange={handleChange} required
                               className={styles.input}/>
                    </>
                )}

                {formData.userType === 'VOLUNTEER' && (
                    <textarea name="interests" placeholder="Your Interests" value={formData.interests}
                              onChange={handleChange} required className={styles.textarea}/>
                )}

                <button type="submit" disabled={isLoading} className={styles.button}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className={styles.bottomText}>
                Already have an account? <a href="/auth/login">Sign in</a>
            </p>
        </div>
    );
}