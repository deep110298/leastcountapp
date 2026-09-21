import { redirect } from 'next/navigation';
import StoryLevelMap from '@/components/leastcount/StoryLevelMap';
import { WORLD_COUNT } from '@/lib/leastCount/storyLevels';

// Prerender all 25 worlds so the service worker can precache the whole
// Story Mode world map for offline play (see [id]/page.tsx for the same
// reasoning on individual levels).
export function generateStaticParams() {
  return Array.from({ length: WORLD_COUNT }, (_, i) => ({ world: String(i + 1) }));
}

export default async function StoryWorldPage(props: PageProps<'/play/story/world/[world]'>) {
  const { world } = await props.params;
  const worldNum = Number(world);
  if (!Number.isInteger(worldNum) || worldNum < 1 || worldNum > WORLD_COUNT) {
    redirect('/play/story');
  }
  return <StoryLevelMap world={worldNum} />;
}
