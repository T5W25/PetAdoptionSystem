import ShelterPetListDisplay from '@/components/ShelterPetListDisplay/ShelterPetListDisplay';

export default function ShelterPetListingPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Shelter Pet Listings</h1>
      <ShelterPetListDisplay />
    </main>
  );
}
