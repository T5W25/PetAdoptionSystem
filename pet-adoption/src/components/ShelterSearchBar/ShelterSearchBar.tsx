'use client'
import React, { useState } from 'react';
import styles from './ShelterSearchBar.module.css';

interface ShelterSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const ShelterSearchBar: React.FC<ShelterSearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shelters by name..."
            className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
  );
};

export default ShelterSearchBar;