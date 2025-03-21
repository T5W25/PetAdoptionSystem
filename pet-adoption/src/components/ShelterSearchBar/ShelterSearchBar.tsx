import React, { useState } from 'react';
import styles from './ShelterSearchBar.module.css';

interface ShelterSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const ShelterSearchBar: React.FC<ShelterSearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass the search term to the parent component
  };

  return (
    <div className={styles.searchBar}>
      <input className={styles.input}
        type="text"
        placeholder="Search for shelters..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ShelterSearchBar;