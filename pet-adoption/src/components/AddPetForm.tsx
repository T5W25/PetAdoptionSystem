import React, { useState, ChangeEvent, FormEvent } from 'react';

type Pet = {
  name: string;
  age: string;
  breed: string;
  description: string;
  image: string;
};

const AddPetForm: React.FC = () => {
  const [pet, setPet] = useState<Pet>({
    name: '',
    age: '',
    breed: '',
    description: '',
    image: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPet({
      ...pet,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Pet submitted:', pet);
    alert('Pet added!');
    setPet({
      name: '',
      age: '',
      breed: '',
      description: '',
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Add New Pet</h2>
      
      <input name="name" placeholder="Pet Name" value={pet.name} onChange={handleChange} className="w-full border p-2 rounded mb-2" required />
      <input name="age" type="number" placeholder="Pet Age" value={pet.age} onChange={handleChange} className="w-full border p-2 rounded mb-2" required />
      <input name="breed" placeholder="Breed" value={pet.breed} onChange={handleChange} className="w-full border p-2 rounded mb-2" required />
      <textarea name="description" placeholder="Description" value={pet.description} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
      <input name="image" placeholder="Image URL" value={pet.image} onChange={handleChange} className="w-full border p-2 rounded mb-2" />

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Add Pet
      </button>
    </form>
  );
};

export default AddPetForm;
