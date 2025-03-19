'use client';

import { useEffect, useState } from 'react';
import { Card, Image, Text, Badge, Group, Button } from '@mantine/core';

interface Pet {
  id: number;
  name: string;
  age: string;
  gender: string;
  species: string;
  breeds: { primary: string };
  url: string;
  primary_photo_cropped?: { small: string } | null;
}

export default function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await fetch('/api/pet-list'); // Ensure you have this API route
        const data = await response.json();
        console.log(data);
        setPets(data.animals);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
      {pets?.map((pet) => (
        <Card key={pet.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={pet.primary_photo_cropped?.small || '/pet-placeholder.png'} height={160} alt={pet.name} />
          </Card.Section>

          <Group mt="md" mb="xs">
            <Text w={500}>{pet.name}</Text>
            <Badge color="blue">{pet.age}</Badge>
          </Group>

          <Text size="sm" color="dimmed">{pet.breeds.primary} - {pet.gender}</Text>
          <Text size="sm" mt="xs">Species: {pet.species}</Text>

          <Button component="a" href={pet.url} target="_blank" fullWidth mt="md" radius="md">
            View Profile
          </Button>
        </Card>
      ))}
    </div>
  );
}
