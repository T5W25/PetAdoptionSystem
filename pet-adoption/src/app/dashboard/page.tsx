"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Image, Text, Button, Group, Badge } from "@mantine/core";

interface Adoption {
  petId: number;
  petName: string;
  status: string; // Pending, Approved, Rejected
}

interface Favorite {
  petId: number;
  petName: string;
  photoUrl: string;
}

export default function Dashboard() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    // Fetch user adoption requests
    fetch(`/api/user/adoptions?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setAdoptions(data || []));

    // Fetch user favorite pets
    fetch(`/api/user/favorites?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <h2 className="text-xl font-semibold mt-6">Your Adoption Requests</h2>
      {adoptions.length === 0 ? (
        <Text>No adoption requests yet.</Text>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adoptions.map((adoption) => (
            <Card key={adoption.petId} shadow="sm" padding="lg">
              <Text fw={500}>{adoption.petName}</Text>
              <Badge color={adoption.status === "Approved" ? "green" : "yellow"}>
                {adoption.status}
              </Badge>
            </Card>
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6">Your Favorite Pets</h2>
      {favorites.length === 0 ? (
        <Text>No favorite pets yet.</Text>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <Card key={fav.petId} shadow="sm" padding="lg">
              <Card.Section>
                <Image src={fav.photoUrl || "/pet-placeholder.png"} alt={fav.petName} />
              </Card.Section>
              <Text fw={500}>{fav.petName}</Text>
              <Button onClick={() => router.push(`/pet-list/${fav.petId}`)} mt="md">
                View Profile
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
