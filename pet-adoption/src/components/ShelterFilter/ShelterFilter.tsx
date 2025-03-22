'use client'
import React, { useState } from 'react';

interface ShelterFilterProps {
    onFilter: (filters: { isVerified?: boolean }) => void;
}

const ShelterFilter: React.FC<ShelterFilterProps> = ({ onFilter }) => {
    const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined);

    const handleVerificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        let verificationStatus: boolean | undefined;

        if (value === 'verified') {
            verificationStatus = true;
        } else if (value === 'unverified') {
            verificationStatus = false;
        } else {
            verificationStatus = undefined;
        }

        setIsVerified(verificationStatus);
        onFilter({ isVerified: verificationStatus });
    };

    return (
        <div className="flex flex-col gap-2 p-4 bg-white shadow-md rounded-lg">
            <label htmlFor="verification-filter" className="text-sm font-semibold text-gray-700">
                Verification Status:
            </label>
            <select
                id="verification-filter"
                onChange={handleVerificationChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                value={isVerified === undefined ? 'all' : isVerified ? 'verified' : 'unverified'}
            >
                <option value="all">All Shelters</option>
                <option value="verified">Verified Only</option>
                <option value="unverified">Unverified Only</option>
            </select>
        </div>
    );
};

export default ShelterFilter;
