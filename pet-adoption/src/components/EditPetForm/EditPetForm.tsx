import React, { useState, useEffect } from 'react';
import { TextInput, Button, Select, Textarea } from '@mantine/core';
import styles from './EditPetForm.module.css';

interface EditPetFormProps {
  pet: {
    id: number;
    name: string;
    age: string;
    gender: string;
    species: string;
    breed: string;
    description: string;
  };
  onSubmit: (pet: {
    id: number;
    name: string;
    age: string;
    gender: string;
    species: string;
    breed: string;
    description: string;
  }) => void;
}

const EditPetForm: React.FC<EditPetFormProps> = ({ pet, onSubmit }) => {
  const [name, setName] = useState(pet.name);
  const [age, setAge] = useState(pet.age);
  const [gender, setGender] = useState(pet.gender);
  const [species, setSpecies] = useState(pet.species);
  const [breed, setBreed] = useState(pet.breed);
  const [description, setDescription] = useState(pet.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: pet.id, name, age, gender, species, breed, description });
  };

  return (
    <form className={styles.editPetForm} onSubmit={handleSubmit}>
      <TextInput
        label="Pet Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextInput
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <Select
        label="Gender"
        value={gender}
        onChange={(value) => setGender(value || '')}
        data={[
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' },
        ]}
        required
      />
      <TextInput
        label="Species"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        required
      />
      <TextInput
        label="Breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        required
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit" fullWidth mt="md">
        Save Changes
      </Button>
    </form>
  );
};

export default EditPetForm;