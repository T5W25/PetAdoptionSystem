'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed import
import Head from 'next/head';

// User types
const USER_TYPES = [
    { id: 'adopter', name: 'Adopter', description: 'Looking to adopt a pet' },
    { id: 'donor', name: 'Pet Donor', description: 'Want to find a home for a pet' },
    { id: 'foster', name: 'Foster Caregiver', description: 'Provide temporary care for pets' },
    { id: 'shelter', name: 'Shelter Staff', description: 'Manage shelter pets and applications' },
    { id: 'volunteer', name: 'Volunteer', description: 'Help with events and activities' }
];

export default function Auth() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        userType: 'adopter',
        location: '',
        contact: '',
        address: '',
        shelterName: '',
        interests: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/api/user-operation/login' : '/api/user-operation/register';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    action: isLogin ? 'login' : 'register'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Success - redirect to dashboard or login
            if (isLogin) {
                router.push('/');
                window.alert('login successfully!！');
            } else {
                window.location.reload();  // Redirect to login after registration
                window.alert('register successfully！');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            window.alert(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderAdditionalFields = () => {
        if (isLogin) return null;

        switch (formData.userType) {
            case 'adopter':
                return (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                            Your Location
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="location"
                            name="location"
                            type="text"
                            placeholder="City, State"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 'donor':
                return (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                            Contact Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="contact"
                            name="contact"
                            type="text"
                            placeholder="Phone number"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 'foster':
                return (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Your Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Full address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 'shelter':
                return (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shelterName">
                            Shelter Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="shelterName"
                            name="shelterName"
                            type="text"
                            placeholder="Shelter organization name"
                            value={formData.shelterName}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Note: Shelter staff accounts require verification.</p>
                    </div>
                );
            case 'volunteer':
                return (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interests">
                            Areas of Interest
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="interests"
                            name="interests"
                            placeholder="Events, social media, transportation, etc."
                            value={formData.interests}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Head>
                <title>{isLogin ? 'Login' : 'Register'} | PetMatch</title>
                <meta name="description" content="Join our pet adoption platform" />
            </Head>

            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 relative">
                            <div className="rounded-full bg-blue-500 p-4 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-12 h-12">
                                    <path d="M9.5 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                    <path d="M19.5 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                    <path d="M5 18.5a3.5 3.5 0 0 1 7 0c0 2-3.5 2.5-3.5 2.5S5 20.5 5 18.5ZM16 18.5a3.5 3.5 0 0 0-7 0c0 2 3.5 2.5 3.5 2.5s3.5-.5 3.5-2.5Z" />
                                    <path d="M17 4c-3.5 0-4.5 2.5-4.5 2.5S11.5 4 8 4C5.5 4 3 5.5 3 8c0 1.5 1.5 3 1.5 3S7 5 9 7c2.5 2.5 3.5 6 3.5 6s1-3.5 3.5-6c2-2 4.5 4 4.5 4S22 9.5 22 8c0-2.5-2.5-4-5-4Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                        >
                            {isLogin ? 'Register here' : 'Sign in'}
                        </button>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {error && (
                            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Full Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {!isLogin && (
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">
                                        I am a...
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="userType"
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleChange}
                                    >
                                        {USER_TYPES.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.name} - {type.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {renderAdditionalFields()}

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                        isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                                    ) : isLogin ? 'Sign in' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
