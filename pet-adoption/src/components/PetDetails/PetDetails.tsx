import React from 'react';
import { Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import styles from './PetDonorListing.module.css';

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

interface PetDonorListingProps {
  pets: Pet[];
  onDelete: (petId: number) => void;
}

const PetDonorListing: React.FC<PetDonorListingProps> = ({ pets, onDelete }) => {
  return (
    <div className={styles.petListing}>
      {pets.map((pet) => (
        <Card key={pet.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={pet.primary_photo_cropped?.small || '/pet-placeholder.png'}
              height={160}
              alt={pet.name}
            />
          </Card.Section>

          <Group mt="md" mb="xs">
            <Text fw={500}>{pet.name}</Text> {/* Updated: Replaced `weight` with `fw` */}
            <Badge color="blue">{pet.age}</Badge>
          </Group>

          <Text size="sm" color="dimmed">
            Breed: {pet.breeds.primary}
          </Text>
          <Text size="sm" color="dimmed">
            Gender: {pet.gender}
          </Text>
          <Text size="sm" color="dimmed">
            Species: {pet.species}
          </Text>

          <Button
            color="red"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => onDelete(pet.id)}
          >
            Delete Pet
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default PetDonorListing;