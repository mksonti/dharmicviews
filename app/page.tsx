import HomeClient from '@/components/HomeClient';
import { resourceData } from '@/lib/data';

export default function HomePage() {
  return (
    <main>
      <HomeClient initialData={resourceData} />
    </main>
  );
}
