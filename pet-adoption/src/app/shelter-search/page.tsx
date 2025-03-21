'use client'
import React, { useState } from 'react';
import ShelterSearchBar from '../../components/ShelterSearchBar/ShelterSearchBar';
import ShelterFilter from '../../components/ShelterFilter/ShelterFilter';
import ShelterDetails from '../../components/ShelterDetails/ShelterDetails';
//import styles from './page.module.css';

const ShelterSearchPage = () => {
  //const [shelters, setShelters] = useState([]);
  const [filters, setFilters] = useState({});
const shelters= [
    {
      id: 1,
      shelterName: 'Happy Paws Shelter',
      isVerified: true,
      user: {
        name: 'John Doe',
        email: 'john.doe@happypaws.com',
      },
    },
    {
      id: 2,
      shelterName: 'Furry Friends Haven',
      isVerified: false,
      user: {
        name: 'Jane Smith',
        email: 'jane.smith@furryfriends.com',
      },
    },
    {
      id: 3,
      shelterName: 'Paws and Claws Rescue',
      isVerified: true,
      user: {
        name: 'Alice Johnson',
        email: 'alice.johnson@pawsandclaws.com',
      },
    },
    {
      id: 4,
      shelterName: 'Safe Haven for Animals',
      isVerified: true,
      user: {
        name: 'Bob Brown',
        email: 'bob.brown@safehaven.com',
      },
    },
    {
      id: 5,
      shelterName: 'Whisker Wonders',
      isVerified: false,
      user: {
        name: 'Charlie Davis',
        email: 'charlie.davis@whiskerwonders.com',
      },
    },
  ];
  const handleSearch = async (searchTerm: string) => {
  // const response = await fetch(`/api/shelter-search?searchTerm=${searchTerm}`);
   // const data = await response.json();
   // setShelters(data);
  };

  const handleFilter = (newFilters: { location?: string; isVerified?: boolean }) => {
    setFilters(newFilters);
    // Apply filters to the search results (you can modify the API call to include filters)
  };

  return (
    <div >
      <ShelterSearchBar onSearch={handleSearch} />
      <ShelterFilter onFilter={handleFilter} />
      <ShelterDetails shelters={shelters} />
    </div>
  );
};

export default ShelterSearchPage;