import React from 'react';
import styles from './ShelterDetails.module.css';

interface Shelter {
  id: number;
  shelterName: string;
  isVerified: boolean;
  user: {
    name: string;
    email: string;
  };
}

interface ShelterDetailsProps {
  shelters: Shelter[];
}

const ShelterDetails: React.FC<ShelterDetailsProps> = ({ shelters }) => {
  return (
    <div className={styles.shelterList}>
      {shelters.map((shelter) => (
        <div key={shelter.id} className={styles.shelterItem}>
          <h3>{shelter.shelterName}</h3>
          <p>Contact: {shelter.user.name} ({shelter.user.email})</p>
          <p>Verified: {shelter.isVerified ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default ShelterDetails;