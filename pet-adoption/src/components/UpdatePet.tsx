import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UpdatePet = () => {
  const [pet, setPet] = useState({
    id: "",
    name: "",
    breed: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query; // Get pet ID from URL

  // Fetch pet details when page loads
  useEffect(() => {
    if (id) {
      fetch(`/api/pets/${id}`)
        .then((res) => res.json())
        .then((data) => setPet(data));
    }
  }, [id]);

  // Handle form submission to update pet details
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/pets/${pet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });

    setLoading(false);
    alert("Pet updated successfully!");
    router.push("/PetList"); // Redirect to Pet List after updating
  };

  // Handle pet deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    await fetch(`/api/pets/${pet.id}`, { method: "DELETE" });

    alert("Pet deleted successfully!");
    router.push("/PetList"); // Redirect to Pet List after deleting
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Update Pet</h1>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input
          type="text"
          placeholder="Pet Name"
          value={pet.name}
          onChange={(e) => setPet({ ...pet, name: e.target.value })}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Breed"
          value={pet.breed}
          onChange={(e) => setPet({ ...pet, breed: e.target.value })}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          placeholder="Age"
          value={pet.age}
          onChange={(e) => setPet({ ...pet, age: e.target.value })}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" disabled={loading} style={{ backgroundColor: "blue", color: "white", padding: "10px" }}>
          {loading ? "Updating..." : "Update Pet"}
        </button>
      </form>
      <button
        onClick={handleDelete}
        style={{ backgroundColor: "red", color: "white", padding: "10px", marginTop: "10px" }}
      >
        Delete Pet
      </button>
    </div>
  );
};

export default UpdatePet;
