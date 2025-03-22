import React, { useState } from 'react';
import styles from './ShelterDetails.module.css';
import ContactForm from "@/components/ContactForm/ContactForm";

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
  const [selectedShelter, setSelectedShelter] = useState<number | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const handleSelectShelter = (id: number, email: string) => {
    setSelectedShelter(id);
    setSelectedEmail(email);
    console.log(`Selected shelter ID: ${id}, Email: ${email}`);
  };

  return (
      <div className={styles.shelterList}>
        {shelters.map((shelter) => (
            <div
                key={shelter.id}
                className={`${styles.shelterItem} ${selectedShelter === shelter.id ? styles.selected : ''}`}
                onClick={() => handleSelectShelter(shelter.id, shelter.user.email)}
            >
              <h3>{shelter.shelterName}</h3>
              <p>Contact: {shelter.user.name} ({shelter.user.email})</p>
              <p>Verified: {shelter.isVerified ? 'Yes' : 'No'}</p>
            </div>
        ))}

        {selectedEmail && (
            <div className={styles.contactFormContainer}>
              <h4>Contact the Shelter:</h4>
              <ContactForm email={selectedEmail} />
            </div>
        )}
      </div>
  );
};

export default ShelterDetails;
