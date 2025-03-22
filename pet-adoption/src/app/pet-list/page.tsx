'use client';

import { useEffect, useState } from 'react';
import { Image, Text, Badge, Group, Card } from '@mantine/core';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type Pet = {
  id: number;
  name: string;
  age: string;
  gender: string;
  species: string;
  breeds: { primary: string; secondary?: string; mixed: boolean };
  url: string;
  primary_photo_cropped?: { small: string } | null;
};

export default function PetListPage() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await fetch('/api/pet-list');
        const data = await response.json();
        console.log('API Response:', data);
        setPets(data.animals || []);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    }
    fetchPets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shelter Pets</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {pets.map((pet) => (
          <Card key={pet.id} className={styles.card}>
            <Card.Section>
              <Image src={pet.primary_photo_cropped?.small || '/pet-placeholder.png'} alt={pet.name} className={styles.image} />
            </Card.Section>

            <Group className={styles.container}>
              <Group className={styles.group}>
                <Badge
                  className={styles.badge}
                  style={{
                    backgroundColor:
                      pet.species === 'Dog' ? '#ffa654' :
                      pet.species === 'Cat' ? '#b88dfd' :
                      pet.species === 'Rabbit' ? '#e2e2e2' : '#D3D3D3',
                  }}
                >
                  {pet.species}
                </Badge>
                <Badge
                  className={styles.badge}
                  style={{ backgroundColor: pet.gender === 'Male' ? '#61b1f3' : '#ffb3e2' }}
                >
                  {pet.gender}
                </Badge>
                <Badge
                  className={styles.badge}
                  style={{
                    backgroundColor:
                      pet.age === 'Baby' ? '#f87474' :
                      pet.age === 'Young' ? '#fff457' :
                      pet.age === 'Adult' ? '#a8a8a8' : '#D3D3D3',
                  }}
                >
                  {pet.age}
                </Badge>
              </Group>
            </Group>

            <Group className={styles.container}>
              <Text style={{ fontWeight: 700, fontSize: '18px' }}>{pet.name}</Text>
              <Text>Breed: {pet.breeds.mixed ? 'Mixed' : 'Purebred'}</Text>
              <ul style={{ paddingLeft: '20px' }}>
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
    </div>
  );
}
