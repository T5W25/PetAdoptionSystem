'use client'; 

import React, { useEffect, useState } from 'react';

type Pet = {
  id: number;
  name: string;
  age: number;
  breed: string;
  description: string;
  image: string;
};

export default function PetListPage() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const res = await fetch('/api/pets');
    const data = await res.json();
    setPets(data);
  };

  const deletePet = async (id: number) => {
    const res = await fetch(`/api/pets/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Pet deleted!');
      fetchPets(); // Refresh the list
    } else {
      alert('Failed to delete pet');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shelter Pets</h1>
      {pets.map((pet) => (
        <div key={pet.id} className="border p-4 rounded mb-4 shadow">
          <h2 className="text-lg font-semibold">{pet.name}</h2>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>{pet.description}</p>
          {pet.image && <img src={pet.image} alt={pet.name} className="w-40 mt-2" />}
          <div className="mt-2 space-x-2">
            <button
              onClick={() => alert('Redirect to update form')}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deletePet(pet.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
