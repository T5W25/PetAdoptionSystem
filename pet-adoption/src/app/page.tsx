// src/app/page.tsx
import PetList from './pet-list/page';
export default function Home() {
  return (
      <div>
        <h1>welcome！</h1>
        <p>here is the home page.</p>
          <PetList />
      </div>
  );
}