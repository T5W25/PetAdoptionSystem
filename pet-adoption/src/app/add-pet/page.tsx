"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextInput, Select } from "@mantine/core";

export default function AddPetForm() {
  const router = useRouter(); // Redirect after submission
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("Dog");
  const [petAge, setPetAge] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const petData = { name: petName, type: petType, age: petAge };

    const response = await fetch("/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(petData),
    });

    if (response.ok) {
      alert("Pet added successfully!");
      setPetName("");
      setPetType("Dog");
      setPetAge("");
      router.push("/pet-list"); // Redirect to pet list
    } else {
      alert("Error adding pet.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Add a Pet</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextInput label="Pet Name" value={petName} onChange={(e) => setPetName(e.target.value)} required />

        <Select
          label="Pet Type"
          value={petType}
          onChange={(value) => setPetType(value || "Dog")}
          data={["Dog", "Cat", "Bird"]}
        />

        <TextInput label="Pet Age" type="number" value={petAge} onChange={(e) => setPetAge(e.target.value)} required />

        <Button type="submit" color="blue">
          Add Pet
        </Button>
      </form>
    </div>
  );
}