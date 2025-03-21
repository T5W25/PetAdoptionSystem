import React, { useState } from 'react';
import styles from './ShelterFilter.module.css';

interface ShelterFilterProps {
  onFilter: (filters: { location?: string; isVerified?: boolean }) => void;
}

const ShelterFilter: React.FC<ShelterFilterProps> = ({ onFilter }) => {
  const [location, setLocation] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
    onFilter({ location: e.target.value, isVerified });
  };

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVerified(e.target.checked);
    onFilter({ location, isVerified: e.target.checked });
  };

  return (
    <div className={styles.filter}>
      <select value={location} onChange={handleLocationChange}className={styles.select}>
        <option value="">All Locations</option>
        <option value="City A">City A</option>
        <option value="City B">City B</option>
      </select>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={isVerified}
          onChange={handleVerificationChange}
        />
        Show Verified Shelters Only
      </label>
    </div>
  );
};

export default ShelterFilter;