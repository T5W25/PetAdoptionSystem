// src/app/page.tsx
import ShelterDetails from '@/components/ShelterDetails/ShelterDetails';
import PetList from './pet-list/page';
import ShelterSearchPage from './shelter-search/page';
export default function Home() {
  return (
      <div>
        <h1>welcome！</h1>
        <p>here is the home page.</p>
          <PetList />
        
          <ShelterSearchPage/>
      </div>
  );
}