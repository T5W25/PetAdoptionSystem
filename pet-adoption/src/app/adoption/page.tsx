'use client';

import { useEffect, useState } from 'react';
import { Image, Text, Badge, Group, Card } from '@mantine/core';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Pet {
  id: number;
  name: string;
  age: string;
  gender: string;
  species: string;
  primaryBreed: string;
  secondaryBreed?: string | null;
  mixed: boolean;
  url: string;
  photoUrl?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function PetList() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in localStorage');
          setLoading(false);
          return;
        }

        const userIdInt = Number(userId);
        if (isNaN(userIdInt)) {
          console.error('Invalid User ID');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/pet-info?userid=${userIdInt}`);
        const data = await response.json();
        console.log('API Response:', data);
        setPets(data || []);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (pets.length === 0) return <Text>No pets found.</Text>;

  return (
      <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridAutoRows: 'auto',
            width: '100%',
            gap: '20px',
          }}
      >
        {pets.map((pet) => (
            <Card key={pet.id} className={styles.card}>
              <Card.Section>
                <Image
                    src={pet.photoUrl || '/pet-placeholder.png'}
                    alt={pet.name}
                    className={styles.image}
                />
              </Card.Section>

              <Group className={styles.container}>
                <Group className={styles.group}>
                  <Badge
                      className={styles.badge}
                      style={{
                        backgroundColor:
                            pet.species === 'Dog'
                                ? '#ffa654'
                                : pet.species === 'Cat'
                                    ? '#b88dfd'
                                    : '#D3D3D3',
                      }}
                  >
                    {pet.species}
                  </Badge>
                  <Badge
                      className={styles.badge}
                      style={{
                        backgroundColor: pet.gender === 'Male' ? '#61b1f3' : '#ffb3e2',
                      }}
                  >
                    {pet.gender}
                  </Badge>
                  <Badge
                      className={styles.badge}
                      style={{
                        backgroundColor:
                            pet.age === 'Baby'
                                ? '#f87474'
                                : pet.age === 'Young'
                                    ? '#fff457'
                                    : '#a8a8a8',
                      }}
                  >
                    {pet.age}
                  </Badge>

                  {pet.status && (
                      <Badge
                          className={`${styles.badge} ${
                              pet.status === 'PENDING'
                                  ? styles['status-pending']
                                  : pet.status === 'APPROVED'
                                      ? styles['status-approved']
                                      : styles['status-rejected']
                          }`}
                      >
                        {pet.status}
                      </Badge>
                  )}
                </Group>
              </Group>

              <Group className={styles.container}>
                <Text className={styles.nameText}>{pet.name}</Text>
                <Text className={styles.cardText}>Breed: {pet.mixed ? 'Mixed' : 'Purebred'}</Text>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li><Text className={styles.cardText}>{pet.primaryBreed || 'Unknown'}</Text></li>
                  <li><Text className={styles.cardText}>{pet.secondaryBreed || 'Unknown'}</Text></li>
                </ul>
              </Group>

              <button
                  onClick={() => router.push(`/pet-list/${pet.id}`)}
                  className={styles.button}
              >
                View Profile
              </button>
            </Card>
        ))}
      </div>
  );
}
