export type AdPlatform = 'Google Ads' | 'Meta Ads' | 'TikTok Ads' | 'LinkedIn Ads' | 'YouTube Ads';

export type SocialPlatform = 'Instagram' | 'LinkedIn' | 'TikTok' | 'YouTube' | 'X (Twitter)' | 'Facebook';

export type AttributionModel = 'last-touch' | 'first-touch' | 'linear' | 'time-decay' | 'w-shaped';

export type SyncCadence = '15m' | '1h' | 'live' | 'manual';

export interface HourlyPerformancePoint {
  hour: string;
  hourNumber: number;
  reach: number;
  engagement: number;
  clicks: number;
  cpc: number;
  roas: number;
  spend: number;
  conversions: number;
  revenue?: number;
}

export interface ConsolidatedPlatformMetric {
  id: string;
  name: string;
  type: 'Ad Network' | 'Social Platform' | 'Hybrid';
  icon: string;
  reach: number;
  engagement: number;
  engagementRate: number; // %
  clicks: number;
  ctr: number; // %
  cpc: number; // $
  roas: number; // x
  spend: number; // $
  revenue: number; // $
  status: 'Healthy' | 'Optimizing' | 'High ROAS';
  lastUpdated: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: AdPlatform;
  status: 'Active' | 'Paused' | 'Learning';
  dailyBudget: number;
  totalSpend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  cpc: number;
  cpm: number;
  ctr: number; // percentage, e.g. 2.4%
  roas: number; // e.g. 4.2x
  cpa: number; // cost per acquisition
  objective: 'Conversions' | 'Lead Generation' | 'Traffic' | 'Local Store Visits';
  updatedAt: string;
}

export interface PlatformSummary {
  platform: AdPlatform;
  spend: number;
  revenue: number;
  roas: number;
  clicks: number;
  impressions: number;
  conversions: number;
  cpa: number;
  color: string;
}

export interface SocialChannelMetric {
  platform: SocialPlatform;
  handle: string;
  followers: number;
  netGrowth30d: number;
  reach30d: number;
  impressions30d: number;
  engagementRate: number; // percentage
  sharesCount: number;
  videoViewsCount?: number;
  color: string;
}

export interface OrganicPost {
  id: string;
  platform: SocialPlatform;
  title: string;
  format: 'Reel/Short' | 'Carousel' | 'Text/Article' | 'Static Image' | 'Video';
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  publishedDate: string;
  url: string;
}

export interface ConversionEvent {
  id: string;
  timestamp: string;
  type: 'E-commerce Purchase' | 'Qualified Lead' | 'Strategy Call Booked' | 'SaaS Subscription';
  customerName: string;
  customerLocation: string;
  value: number;
  primaryChannel: AdPlatform | 'Organic Social' | 'Google Local Search' | 'Direct';
  touchpoints: string[];
  attributionWeight: number; // based on current attribution model
}

export interface GoogleBusinessInsight {
  profileName: string;
  location: string;
  verified: boolean;
  overallRating: number;
  reviewCount: number;
  monthlySearches: number;
  directSearches: number;
  discoverySearches: number;
  brandedSearches: number;
  viewsOnSearch: number;
  viewsOnMaps: number;
  customerActions: {
    websiteClicks: number;
    directionRequests: number;
    phoneCalls: number;
    chatMessages: number;
    bookings: number;
  };
  topSearchQueries: Array<{
    query: string;
    impressions: number;
    changePct: number;
  }>;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
    sentiment: 'Positive' | 'Neutral' | 'Critical';
    responded: boolean;
    replyText?: string;
  }>;
}

export interface GeoGridPoint {
  id: string;
  row: number;
  col: number;
  lat: number;
  lng: number;
  rank: number;
  addressLabel: string;
  distanceKm: number;
  topCompetitor: string;
}

export interface LocalKeywordRank {
  id: string;
  keyword: string;
  averageRank: number;
  top3PackPct: number;
  searchVolume: number;
  gridPoints: GeoGridPoint[];
  competitors: Array<{
    name: string;
    shareOfVoice: number;
    avgRank: number;
  }>;
}

export interface AIInsightItem {
  title: string;
  type: 'budget' | 'local_seo' | 'ad_creative' | 'conversion';
  severity: 'high' | 'medium' | 'warning';
  recommendation: string;
  expectedImpact: string;
  confidence: number;
}

export type KeywordIntent = 'Transactional' | 'Commercial' | 'Navigational' | 'Informational';

export interface SEMrushLocalKeyword {
  id: string;
  keyword: string;
  intent: KeywordIntent;
  searchVolume: number;
  rankGooglePH: number;
  previousRank: number;
  change: number; // positive = gain, negative = drop, 0 = steady
  serpFeatures: Array<'3-Pack' | 'Reviews' | 'Sitelinks' | 'People Also Ask' | 'Images' | 'Video'>;
  landingUrl: string;
  cpcPHP: number;
  kd: number; // Keyword Difficulty %
  lastUpdated: string;
}

export interface LocalBoutiqueListing {
  id: string;
  name: string;
  mall: string;
  city: string;
  address: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  napConsistency: number; // 0-100%
  directoriesCount: number;
  status: 'Verified & Active' | 'Needs Review';
  openingHours: string;
}

export interface SEMrushLocalOverview {
  authorityScore: number;
  organicTrafficPH: number;
  rankingKeywordsCount: number;
  local3PackKeywords: number;
  backlinks: number;
  referringDomains: number;
  top3PackShareOfVoice: number;
}

