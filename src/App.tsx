import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { KPISummaryStrip } from './components/KPISummaryStrip';
import { ConsolidatedDashboard } from './components/ConsolidatedDashboard';
import { AdSpendTracker } from './components/AdSpendTracker';
import { SocialPerformanceTracker } from './components/SocialPerformanceTracker';
import { RealTimeConversions } from './components/RealTimeConversions';
import { GoogleBusinessProfile } from './components/GoogleBusinessProfile';
import { LocalSearchRankGrid } from './components/LocalSearchRankGrid';
import { SEMrushLocalSEO } from './components/SEMrushLocalSEO';
import { AIAdvisorSection } from './components/AIAdvisorSection';
import { SlidesGenerator } from './components/SlidesGenerator';
import { NewCampaignModal } from './components/NewCampaignModal';
import { ExportModal } from './components/ExportModal';
import {
  initialCampaigns,
  initialSocialMetrics,
  initialOrganicPosts,
  initialConversions,
  initialGoogleBusiness,
  initialKeywords,
  initialConsolidatedPlatforms,
  initialHourlyPoints,
  initialSEMrushOverview,
  initialSEMrushKeywords,
  initialBoutiqueListings,
} from './data/initialData';
import {
  AdCampaign,
  ConversionEvent,
  AttributionModel,
  GoogleBusinessInsight,
  LocalKeywordRank,
  ConsolidatedPlatformMetric,
  HourlyPerformancePoint,
  SEMrushLocalOverview,
  SEMrushLocalKeyword,
  LocalBoutiqueListing,
} from './types/marketing';
import {
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowRight,
  Radio,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'consolidated' | 'overview' | 'ad-spend' | 'social' | 'conversions' | 'local-seo' | 'ai-advisor' | 'slides'
  >('consolidated');

  const [campaigns, setCampaigns] = useState<AdCampaign[]>(initialCampaigns);
  const [socialMetrics] = useState(initialSocialMetrics);
  const [organicPosts] = useState(initialOrganicPosts);
  const [conversions, setConversions] = useState<ConversionEvent[]>(initialConversions);
  const [gbpData, setGbpData] = useState<GoogleBusinessInsight>(initialGoogleBusiness);
  const [keywords, setKeywords] = useState<LocalKeywordRank[]>(initialKeywords);
  const [semrushOverview] = useState<SEMrushLocalOverview>(initialSEMrushOverview);
  const [semrushKeywords, setSemrushKeywords] = useState<SEMrushLocalKeyword[]>(initialSEMrushKeywords);
  const [boutiques] = useState<LocalBoutiqueListing[]>(initialBoutiqueListings);
  const [attributionModel, setAttributionModel] = useState<AttributionModel>('last-touch');

  const [consolidatedPlatforms, setConsolidatedPlatforms] = useState<ConsolidatedPlatformMetric[]>(
    initialConsolidatedPlatforms
  );
  const [hourlyPoints, setHourlyPoints] = useState<HourlyPerformancePoint[]>(initialHourlyPoints);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Background real-time live conversion stream simulation
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      const sampleNames = [
        'Rafael De Leon (Makati)',
        'Katrina Santos (BGC Taguig)',
        'Atty. Victor Mendoza (Ortigas)',
        'Mark Angelo Rivera (QC North)',
        'Capt. Roberto M. (Cebu SRP)',
        'Beatrice Villanueva (Alabang)',
        'Wilson Lim (Binondo)',
        'Paolo Rivera (Cubao)',
      ];
      const sampleLocations = [
        'Glorietta 4 Flagship, Makati',
        'Mitsukoshi BGC, Taguig',
        'SM Megamall, Mandaluyong',
        'SM North EDSA, Quezon City',
        'SM Seaside City Cebu',
        'Festival Mall, Alabang',
        'Lucky Chinatown, Binondo',
        'Gateway Mall 2, Cubao',
        'Ayala Fairview Terraces, QC',
        'EVIA Lifestyle Center, Las Piñas',
        'SM City Cebu Northwing',
      ];
      const sampleTypes: ConversionEvent['type'][] = [
        'Strategy Call Booked', // Boutique VIP Consultation
        'E-commerce Purchase',
        'Qualified Lead',
        'SaaS Subscription',
      ];
      const sampleChannels: ConversionEvent['primaryChannel'][] = [
        'Google Ads',
        'Meta Ads',
        'TikTok Ads',
        'Google Local Search',
      ];
      const touchpointPool = [
        ['Google PMax Makati', 'Seiko Boutique Glorietta 4', 'VIP Viewing Appointment'],
        ['TikTok Watch Reel', 'Seiko Boutique Mitsukoshi BGC', 'Store Pickup Confirmed'],
        ['Google Maps Megamall', 'Seiko Boutique SM Megamall', 'In-Store Walk-In & Purchase'],
        ['Google Search "Seiko 5"', 'Seiko Boutique SM North EDSA', 'Official Boutique Checkout'],
        ['Facebook Prospex Diver Ad', 'Seiko Boutique Festival Mall', 'Direct Boutique Purchase'],
        ['Google Local 3-Pack Cebu', 'Seiko Boutique SM Seaside Cebu', 'Store Reserve Confirmed'],
        ['Google Maps Cubao', 'Seiko Boutique Gateway Mall 2', 'Boutique Walk-in & Sizing'],
        ['Meta IG Story Binondo', 'Seiko Boutique Lucky Chinatown', 'Anniversary Gift Checkout'],
        ['Google Maps Fairview', 'Seiko Boutique Ayala Fairview Terraces', 'Counter Pickup Confirmed'],
        ['Google Local Search Daang Hari', 'Seiko Boutique EVIA Lifestyle Center', 'Store Walk-In'],
      ];

      const watchValues = [18500, 24900, 28900, 48500, 72000, 115000, 385000];
      const randomIdx = Math.floor(Math.random() * sampleNames.length);
      const randomValue = watchValues[Math.floor(Math.random() * watchValues.length)];
      const randomType = sampleTypes[Math.floor(Math.random() * sampleTypes.length)];
      const randomChannel = sampleChannels[Math.floor(Math.random() * sampleChannels.length)];
      const randomTouchpoints = touchpointPool[Math.floor(Math.random() * touchpointPool.length)];

      const newEvent: ConversionEvent = {
        id: `conv-${Date.now()}`,
        timestamp: 'Just now',
        type: randomType,
        customerName: sampleNames[randomIdx],
        customerLocation: sampleLocations[Math.floor(Math.random() * sampleLocations.length)],
        value: randomValue,
        primaryChannel: randomChannel,
        touchpoints: randomTouchpoints,
        attributionWeight: 0.6,
      };

      setConversions((prev) => [newEvent, ...prev.slice(0, 19)]);

      // Dynamically attribute revenue to matching active campaign & platform
      setCampaigns((prev) =>
        prev.map((c) => {
          if (c.platform === randomChannel && c.status === 'Active') {
            return {
              ...c,
              revenue: c.revenue + randomValue,
              conversions: c.conversions + 1,
              clicks: c.clicks + Math.floor(Math.random() * 3) + 1,
              roas: Number(((c.revenue + randomValue) / Math.max(1, c.totalSpend)).toFixed(2)),
            };
          }
          return c;
        })
      );

      // Also dynamically update consolidated platform metrics
      setConsolidatedPlatforms((prev) =>
        prev.map((p) => {
          if (p.name.includes(randomChannel.replace(' Ads', '')) || p.name === randomChannel) {
            const addedClicks = Math.floor(Math.random() * 4) + 1;
            const newRevenue = p.revenue + randomValue;
            return {
              ...p,
              revenue: newRevenue,
              clicks: p.clicks + addedClicks,
              reach: p.reach + Math.floor(Math.random() * 120) + 40,
              roas: Number((newRevenue / Math.max(1, p.spend)).toFixed(2)),
              lastUpdated: 'Just now',
            };
          }
          return p;
        })
      );
    }, 8500);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Automated hourly sync handler
  const handleManualSync = () => {
    setLastSyncTime(new Date());

    // Refresh metrics with simulated latest aggregated network batch
    setConsolidatedPlatforms((prev) =>
      prev.map((p) => {
        const deltaClicks = Math.floor(Math.random() * 25) + 5;
        const deltaReach = Math.floor(Math.random() * 850) + 150;
        const deltaRevenue = Math.floor(Math.random() * 420) + 80;
        const deltaSpend = p.spend > 0 ? Math.floor(Math.random() * 60) + 15 : 0;
        const newSpend = p.spend + deltaSpend;
        const newRevenue = p.revenue + deltaRevenue;
        const newClicks = p.clicks + deltaClicks;
        const newCpc = p.spend > 0 && newClicks > 0 ? Number((newSpend / newClicks).toFixed(2)) : p.cpc;
        const newRoas = newSpend > 0 ? Number((newRevenue / newSpend).toFixed(2)) : p.roas;

        return {
          ...p,
          reach: p.reach + deltaReach,
          clicks: newClicks,
          spend: newSpend,
          revenue: newRevenue,
          cpc: newCpc,
          roas: newRoas,
          lastUpdated: 'Just now',
        };
      })
    );

    // Update current hourly point
    const currentHourNum = new Date().getHours();
    setHourlyPoints((prev) =>
      prev.map((pt) => {
        if (pt.hourNumber === currentHourNum) {
          return {
            ...pt,
            reach: pt.reach + 420,
            clicks: pt.clicks + 14,
            spend: pt.spend + 28,
            roas: Number((pt.roas + 0.05).toFixed(2)),
          };
        }
        return pt;
      })
    );
  };

  // Campaign handlers
  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
      )
    );
  };

  const handleUpdateDailyBudget = (id: string, newBudget: number) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, dailyBudget: newBudget } : c))
    );
  };

  const handleApplyForecastBudget = (platformBudgets: Record<string, number>) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        const platKey = Object.keys(platformBudgets).find((k) => k.toLowerCase().includes(c.platform.toLowerCase()));
        if (platKey && platformBudgets[platKey]) {
          const total30d = platformBudgets[platKey];
          const matchingCount = prev.filter((item) => item.platform === c.platform).length || 1;
          const newDailyBudget = Math.round((total30d / 30) / matchingCount);
          return { ...c, dailyBudget: newDailyBudget };
        }
        return c;
      })
    );
  };

  const handleAddCampaign = (newCamp: AdCampaign) => {
    setCampaigns((prev) => [newCamp, ...prev]);
  };

  const handleAddReviewResponse = (reviewId: string, replyText: string) => {
    setGbpData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) =>
        r.id === reviewId ? { ...r, responded: true, replyText } : r
      ),
    }));
  };

  const handleAddSimulatedConversion = () => {
    const manualEvent: ConversionEvent = {
      id: `conv-${Date.now()}`,
      timestamp: 'Just now',
      type: 'Strategy Call Booked',
      customerName: 'Atty. Victor Mendoza (BGC Taguig)',
      customerLocation: 'Bonifacio Global City, Taguig',
      value: 48500,
      primaryChannel: 'Google Local Search',
      touchpoints: ['Google Maps 3-Pack', 'Glorietta Boutique Profile', 'Direct Reservation Confirmed'],
      attributionWeight: 0.8,
    };
    setConversions((prev) => [manualEvent, ...prev.slice(0, 19)]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header with 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLiveSimulating={isLiveSimulating}
        setIsLiveSimulating={setIsLiveSimulating}
        onOpenNewCampaign={() => setIsNewCampaignModalOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        lastSyncTime={lastSyncTime}
      />

      {/* Main Container Baseline */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Tabular Numbers Strip */}
        <KPISummaryStrip
          campaigns={campaigns}
          conversions={conversions}
          gbpData={gbpData}
          monthlyBudget={1000000}
        />

        {/* View Switcher Container */}
        {activeTab === 'consolidated' && (
          <ConsolidatedDashboard
            consolidatedPlatforms={consolidatedPlatforms}
            hourlyPoints={hourlyPoints}
            campaigns={campaigns}
            onManualSync={handleManualSync}
            lastSyncTime={lastSyncTime}
            onOpenNewCampaign={() => setIsNewCampaignModalOpen(true)}
            onApplyBudgetToCampaigns={handleApplyForecastBudget}
          />
        )}

        {activeTab === 'ad-spend' && (
          <AdSpendTracker
            campaigns={campaigns}
            onToggleStatus={handleToggleCampaignStatus}
            onUpdateDailyBudget={handleUpdateDailyBudget}
            onOpenNewCampaign={() => setIsNewCampaignModalOpen(true)}
          />
        )}

        {activeTab === 'social' && (
          <SocialPerformanceTracker
            socialMetrics={socialMetrics}
            organicPosts={organicPosts}
          />
        )}

        {activeTab === 'conversions' && (
          <RealTimeConversions
            conversions={conversions}
            isLiveSimulating={isLiveSimulating}
            setIsLiveSimulating={setIsLiveSimulating}
            attributionModel={attributionModel}
            setAttributionModel={setAttributionModel}
            onAddSimulatedConversion={handleAddSimulatedConversion}
          />
        )}

        {activeTab === 'local-seo' && (
          <SEMrushLocalSEO
            overview={semrushOverview}
            keywords={semrushKeywords}
            boutiques={boutiques}
            geoGridKeywords={keywords}
            gbpData={gbpData}
            onAddReviewResponse={handleAddReviewResponse}
          />
        )}

        {activeTab === 'slides' && (
          <SlidesGenerator
            campaigns={campaigns}
            conversions={conversions}
            gbpData={gbpData}
            keywords={keywords}
            semrushKeywords={semrushKeywords}
            boutiques={boutiques}
            consolidatedPlatforms={consolidatedPlatforms}
          />
        )}

        {activeTab === 'ai-advisor' && (
          <AIAdvisorSection
            campaigns={campaigns}
            conversions={conversions}
            gbpData={gbpData}
            keywordData={keywords}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span>Seiko Philippines · Marketing & Local Search Intelligence · Metro Manila Flagship Operations</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Official Boutique Network</span>
            <span aria-hidden="true">·</span>
            <span>Glorietta 4 · SM Megamall · BGC High Street · SM MOA</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time PHP Ad Attribution</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NewCampaignModal
        isOpen={isNewCampaignModalOpen}
        onClose={() => setIsNewCampaignModalOpen(false)}
        onAddCampaign={handleAddCampaign}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        campaigns={campaigns}
        conversions={conversions}
        gbpData={gbpData}
        keywords={keywords}
        semrushKeywords={semrushKeywords}
        boutiques={boutiques}
      />
    </div>
  );
}
