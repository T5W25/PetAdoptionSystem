'use client'
import React, { useState } from 'react';
import styles from './ShelterFilter.module.css';

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
      <div className={styles.filterContainer}>
        <label htmlFor="verification-filter" className={styles.filterLabel}>
          Verification Status:
        </label>
        <select
            id="verification-filter"
            onChange={handleVerificationChange}
            className={styles.filterSelect}
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