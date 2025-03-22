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
  breeds: { primary: string, secondary?: string, mixed: boolean };
  url: string;
  primary_photo_cropped?: { small: string } | null;
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
        const response = await fetch(`/api/saved-pets?userid=${userIdInt}`);
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
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gridAutoRows: '350px',
        width: '100%',
        gap: '20px',
      }}>
        {pets.map((pet) => (
            <Card key={pet.id} className={styles.card} style={{ minHeight: '350px' }}>
              <Card.Section>
                <Image
                    src={pet.primary_photo_cropped?.small || '/pet-placeholder.png'}
                    alt={pet.name}
                    className={styles.image}
                    style={{ objectFit: 'cover', height: '180px', width: '100%' }}
                />
              </Card.Section>

              <Group className={styles.container}>
                <Group className={styles.group}>
                  <Badge
                      className={styles.badge}
                      style={{ backgroundColor: pet.species === 'Dog' ? '#ffa654' : pet.species === 'Cat' ? '#b88dfd' : '#D3D3D3' }}
                  >
                    {pet.species}
                  </Badge>
                  <Badge className={styles.badge} style={{ backgroundColor: pet.gender === 'Male' ? '#61b1f3' : '#ffb3e2' }}>
                    {pet.gender}
                  </Badge>
                  <Badge
                      className={styles.badge}
                      style={{ backgroundColor: pet.age === 'Baby' ? '#f87474' : pet.age === 'Young' ? '#fff457' : '#a8a8a8' }}
                  >
                    {pet.age}
                  </Badge>
                </Group>
              </Group>

              <Group className={styles.container}>
                <Text style={{ fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pet.name}
                </Text>
                <Text>Breed: {pet.breeds.mixed ? 'Mixed' : 'Purebred'}</Text>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li><Text>{pet.breeds.primary}</Text></li>
                  <li><Text>{pet.breeds.secondary || 'Unknown'}</Text></li>
                </ul>
              </Group>

              <button onClick={() => router.push(`/pet-list/${pet.id}`)} className={styles.button}>
                View Profile
              </button>
            </Card>
        ))}
      </div>
  );
}
