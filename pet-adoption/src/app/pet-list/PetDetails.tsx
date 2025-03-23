"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

type Pet = {
  id: number;
  name: string;
  age: string;
  gender: string;
  species: string;
  breeds: { primary: string; secondary?: string; mixed: boolean };
  description: string;
  primary_photo_cropped?: { small: string } | null;
};

export default function PetDetails() {
  const { id } = useParams();  // ✅ Fixed: Get ID from URL
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/pets/${id}`)
        .then((res) => res.json())
        .then((data) => setPet(data));
    }
  }, [id]);

  if (!pet) return <Text>Loading...</Text>;

  return (
    <Card shadow="sm" padding="lg">
      <Card.Section>
        <Image src={pet.primary_photo_cropped?.small || "/pet-placeholder.png"} alt={pet.name} />
      </Card.Section>

      <Text fw={500} size="lg">{pet.name}</Text>
      <Badge>{pet.species}</Badge>
      <Badge>{pet.gender}</Badge>
      <Badge>{pet.age}</Badge>

      <Text mt="sm">{pet.description}</Text>

      <Button mt="md" onClick={() => router.push(`/adopt/${pet.id}`)}>
        Adopt Me!
      </Button>
    </Card>
  );
} 
