import AppleBadgeButton from '@/components/marketing/AppleBadgeButton';

// Shown to anyone opening a room invite link outside the native app —
// browser play works fine, but nudges friends toward the real app, which
// is faster and also plays offline.
export default function WebInstallBanner() {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <p className="text-sm font-semibold text-ink-muted">Now available in</p>
      <AppleBadgeButton variant="dark" />
    </div>
  );
}
