import React, { useState } from 'react';
import styles from './ShelterDetails.module.css';
import ContactModal from "@/components/ContactForm/ContactModal";

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
  const [showModal, setShowModal] = useState(false);

  const handleSelectShelter = (id: number, email: string) => {
    setSelectedShelter(id);
    setSelectedEmail(email);
    setShowModal(true);
    console.log(`Selected shelter ID: ${id}, Email: ${email}`);
  };

  return (
      <div className={styles.shelterList}>
        {shelters.map((shelter) => (
            <div
                key={shelter.id}
                className={`${styles.card} ${selectedShelter === shelter.id ? styles.selected : ''}`}
                onClick={() => handleSelectShelter(shelter.id, shelter.user.email)}
            >
              <div className={styles.cardContent}>
                <h3>{shelter.shelterName}</h3>
                <p>Contact: {shelter.user.name} ({shelter.user.email})</p>
                <p>Verified: {shelter.isVerified ? 'Yes' : 'No'}</p>
              </div>
            </div>
        ))}

        {showModal && selectedShelter !== null && selectedEmail && (
            <ContactModal
                email={selectedEmail}
                shelterId={selectedShelter}
                onClose={() => setShowModal(false)}
            />
        )}
      </div>
  );
};

export default ShelterDetails;
