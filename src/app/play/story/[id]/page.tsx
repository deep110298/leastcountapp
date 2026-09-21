import { TOTAL_LEVELS } from '@/lib/leastCount/storyLevels';
import StoryLevelBoard from '@/components/leastcount/StoryLevelBoard';

// Every level is a fixed, known ID (1..TOTAL_LEVELS) computed from pure
// functions — prerendering all of them (rather than leaving this dynamic)
// lets the service worker precache the whole of Story Mode for offline play.
export function generateStaticParams() {
  return Array.from({ length: TOTAL_LEVELS }, (_, i) => ({ id: String(i + 1) }));
}

export default async function StoryLevelPage(props: PageProps<'/play/story/[id]'>) {
  const { id } = await props.params;
  const globalId = Number(id);
  const validId = Number.isInteger(globalId) && globalId >= 1 && globalId <= TOTAL_LEVELS ? globalId : 1;
  return <StoryLevelBoard globalId={validId} />;
}
