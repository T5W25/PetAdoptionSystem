'use client';
import styles from './register.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const USER_TYPES = [
    { id: 'adopter', name: 'Adopter', description: 'Looking to adopt a pet' },
    { id: 'donor', name: 'Pet Donor', description: 'Want to find a home for a pet' },
    { id: 'foster', name: 'Foster Caregiver', description: 'Provide temporary care for pets' },
    { id: 'shelter', name: 'Shelter Staff', description: 'Manage shelter pets and applications' },
    { id: 'volunteer', name: 'Volunteer', description: 'Help with events and activities' }
];

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'adopter',
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
        
        // display different form base on the user type
        const filteredData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            userType: formData.userType,
            ...(formData.userType === 'donor' || formData.userType === 'foster' ? { contact: formData.contact } : {}),
            ...(formData.userType === 'shelter' ? { shelterName: formData.shelterName, address: formData.address } : {}),
            ...(formData.userType === 'volunteer' ? { interests: formData.interests } : {})
        };

        try {
            const response = await fetch('/api/user-operation/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filteredData),
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

                {formData.userType === 'donor' || formData.userType === 'foster' ? (
                    <input type="text" name="contact" placeholder="Contact Info" value={formData.contact}
                           onChange={handleChange} required className={styles.input}/>
                ) : null}

                {formData.userType === 'shelter' ? (
                    <>
                        <input type="text" name="shelterName" placeholder="Shelter Name"
                               value={formData.shelterName} onChange={handleChange} required
                               className={styles.input}/>
                        <input type="text" name="address" placeholder="Shelter Address" value={formData.address}
                               onChange={handleChange} required className={styles.input}/>
                    </>
                ) : null}

                {formData.userType === 'volunteer' ? (
                    <textarea name="interests" placeholder="Your Interests" value={formData.interests}
                              onChange={handleChange} required className={styles.textarea}/>
                ) : null}

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
