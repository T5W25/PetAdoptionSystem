import React from 'react';
import { Button } from '@mantine/core';

interface DeletePetButtonProps {
  petId: number;
  onDelete: (petId: number) => void;
}

const DeletePetButton: React.FC<DeletePetButtonProps> = ({ petId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
      });
      onDelete(petId);
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <Button color="red" onClick={handleDelete}>
      Delete Pet
    </Button>
  );
};

export default DeletePetButton;