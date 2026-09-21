import MarketingNav from './MarketingNav';
import MarketingHero from './MarketingHero';
import MarketingStats from './MarketingStats';
import MarketingModes from './MarketingModes';
import MarketingRules from './MarketingRules';
import MarketingHandDemo from './MarketingHandDemo';
import MarketingDownload from './MarketingDownload';
import MarketingFooter from './MarketingFooter';

export default function MarketingHome() {
  return (
    <div className="bg-canvas text-ink">
      <MarketingNav />
      <MarketingHero />
      <MarketingStats />
      <MarketingModes />
      <MarketingRules />
      <MarketingHandDemo />
      <MarketingDownload />
      <MarketingFooter />
    </div>
  );
}
