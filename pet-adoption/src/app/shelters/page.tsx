'use client'
import React, { useState, useEffect } from 'react';
import ShelterSearchBar from '../../components/ShelterSearchBar/ShelterSearchBar';
import ShelterFilter from '../../components/ShelterFilter/ShelterFilter';
import ShelterDetails from '../../components/ShelterDetails/ShelterDetails';
import styles from './page.module.css';

interface Shelter {
    id: number;
    shelterName: string;
    isVerified: boolean;
    user: {
        name: string;
        email: string;
    };
}

const ShelterSearchPage = () => {
    const [shelters, setShelters] = useState<Shelter[]>([]);
    const [filters, setFilters] = useState<{ isVerified?: boolean }>({});
    const [searchTerm, setSearchTerm] = useState<string>(''); // 添加 searchTerm

    useEffect(() => {
        fetchShelters();
    }, []);

    const fetchShelters = async () => {
        try {
            const response = await fetch('/api/shelters');
            if (!response.ok) {
                throw new Error('Failed to fetch shelters');
            }
            const data: Shelter[] = await response.json();
            setShelters(data);
        } catch (error) {
            console.error('Error fetching shelters:', error);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term); 
    };

    const handleFilter = (filters: { isVerified?: boolean }) => {
        setFilters(filters);
    };
    
    const filteredShelters = shelters.filter(shelter =>
        (filters.isVerified === undefined || shelter.isVerified === filters.isVerified) &&
        (searchTerm === '' || shelter.shelterName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <div className={styles.searchContainer}>
                <ShelterSearchBar onSearch={handleSearch} />
                <ShelterFilter onFilter={handleFilter} />
            </div>
            <ShelterDetails shelters={filteredShelters} />
        </div>
    );
};

export default ShelterSearchPage;
