import {
  AdCampaign,
  SocialChannelMetric,
  OrganicPost,
  ConversionEvent,
  GoogleBusinessInsight,
  LocalKeywordRank,
  ConsolidatedPlatformMetric,
  HourlyPerformancePoint,
  SEMrushLocalKeyword,
  LocalBoutiqueListing,
  SEMrushLocalOverview,
} from '../types/marketing';

export const initialCampaigns: AdCampaign[] = [
  {
    id: 'camp-101',
    name: 'Google PMax - Metro Manila Boutique Store Visits (Glorietta, Megamall, BGC)',
    platform: 'Google Ads',
    status: 'Active',
    dailyBudget: 6500, // PHP
    totalSpend: 195000,
    impressions: 482000,
    clicks: 18400,
    conversions: 340,
    revenue: 890000,
    cpc: 10.60,
    cpm: 404.56,
    ctr: 3.82,
    roas: 4.56,
    cpa: 573.53,
    objective: 'Local Store Visits',
    updatedAt: '2 hours ago'
  },
  {
    id: 'camp-102',
    name: 'Google Search - "Seiko Watch Price Philippines" & Prospex Divers',
    platform: 'Google Ads',
    status: 'Active',
    dailyBudget: 5000,
    totalSpend: 150000,
    impressions: 214000,
    clicks: 12800,
    conversions: 285,
    revenue: 720000,
    cpc: 11.72,
    cpm: 700.93,
    ctr: 5.98,
    roas: 4.80,
    cpa: 526.32,
    objective: 'Conversions',
    updatedAt: '1 hour ago'
  },
  {
    id: 'camp-103',
    name: 'Meta IG Retargeting - Grand Seiko Heritage & Evolution 9 VIP Viewings',
    platform: 'Meta Ads',
    status: 'Active',
    dailyBudget: 5500,
    totalSpend: 165000,
    impressions: 340000,
    clicks: 14200,
    conversions: 195,
    revenue: 980000,
    cpc: 11.62,
    cpm: 485.29,
    ctr: 4.18,
    roas: 5.94,
    cpa: 846.15,
    objective: 'Lead Generation',
    updatedAt: '3 hours ago'
  },
  {
    id: 'camp-104',
    name: 'Meta Ads - Seiko 5 Sports "Show Your Style" Streetwear Manila',
    platform: 'Meta Ads',
    status: 'Active',
    dailyBudget: 4200,
    totalSpend: 126000,
    impressions: 520000,
    clicks: 11800,
    conversions: 240,
    revenue: 515000,
    cpc: 10.68,
    cpm: 242.31,
    ctr: 2.27,
    roas: 4.09,
    cpa: 525.00,
    objective: 'Conversions',
    updatedAt: '4 hours ago'
  },
  {
    id: 'camp-105',
    name: 'TikTok Ads PH - Prospex Automatic ASMR & Watch Collector Unboxings',
    platform: 'TikTok Ads',
    status: 'Active',
    dailyBudget: 2800,
    totalSpend: 84000,
    impressions: 890000,
    clicks: 16500,
    conversions: 115,
    revenue: 235000,
    cpc: 5.09,
    cpm: 94.38,
    ctr: 1.85,
    roas: 2.80,
    cpa: 730.43,
    objective: 'Traffic',
    updatedAt: '5 hours ago'
  },
  {
    id: 'camp-106',
    name: 'Facebook PH - King Seiko & Presage Cocktail Time Manila Edition',
    platform: 'Meta Ads',
    status: 'Active',
    dailyBudget: 3500,
    totalSpend: 105000,
    impressions: 395000,
    clicks: 9800,
    conversions: 165,
    revenue: 430000,
    cpc: 10.71,
    cpm: 265.82,
    ctr: 2.48,
    roas: 4.10,
    cpa: 636.36,
    objective: 'Conversions',
    updatedAt: 'Yesterday'
  },
  {
    id: 'camp-107',
    name: 'YouTube PH - Seiko 100th Watchmaking Anniversary Brand Film',
    platform: 'YouTube Ads',
    status: 'Paused',
    dailyBudget: 2000,
    totalSpend: 40000,
    impressions: 210000,
    clicks: 3400,
    conversions: 45,
    revenue: 120000,
    cpc: 11.76,
    cpm: 190.48,
    ctr: 1.62,
    roas: 3.00,
    cpa: 888.89,
    objective: 'Traffic',
    updatedAt: '3 days ago'
  }
];

export const initialConsolidatedPlatforms: ConsolidatedPlatformMetric[] = [
  {
    id: 'plat-google',
    name: 'Google Ads (Search & PMax)',
    type: 'Ad Network',
    icon: 'google',
    reach: 696000,
    engagement: 48200,
    engagementRate: 6.93,
    clicks: 31200,
    ctr: 4.48,
    cpc: 11.05, // ₱11.05 PHP
    roas: 4.67,
    spend: 345000, // ₱345k PHP
    revenue: 1610000, // ₱1.61M PHP
    status: 'High ROAS',
    lastUpdated: '8m ago'
  },
  {
    id: 'plat-meta-ads',
    name: 'Meta Ads (Facebook & IG PH)',
    type: 'Ad Network',
    icon: 'meta',
    reach: 1255000,
    engagement: 82400,
    engagementRate: 6.57,
    clicks: 35800,
    ctr: 2.85,
    cpc: 11.06,
    roas: 4.87,
    spend: 396000,
    revenue: 1925000,
    status: 'High ROAS',
    lastUpdated: '12m ago'
  },
  {
    id: 'plat-fb-organic',
    name: 'Facebook (Seiko Philippines Official)',
    type: 'Social Platform',
    icon: 'facebook',
    reach: 890000,
    engagement: 62400,
    engagementRate: 7.01,
    clicks: 14200,
    ctr: 1.60,
    cpc: 2.10,
    roas: 6.40,
    spend: 30000,
    revenue: 192000,
    status: 'High ROAS',
    lastUpdated: '18m ago'
  },
  {
    id: 'plat-ig-organic',
    name: 'Instagram (@seikophilippines)',
    type: 'Social Platform',
    icon: 'instagram',
    reach: 480000,
    engagement: 38900,
    engagementRate: 8.10,
    clicks: 9800,
    ctr: 2.04,
    cpc: 2.55,
    roas: 7.20,
    spend: 25000,
    revenue: 180000,
    status: 'Healthy',
    lastUpdated: '22m ago'
  },
  {
    id: 'plat-tiktok',
    name: 'TikTok (@seikophilippines)',
    type: 'Hybrid',
    icon: 'tiktok',
    reach: 1420000,
    engagement: 98400,
    engagementRate: 6.93,
    clicks: 22400,
    ctr: 1.58,
    cpc: 4.80,
    roas: 2.80,
    spend: 84000,
    revenue: 235000,
    status: 'Optimizing',
    lastUpdated: '5m ago'
  },
  {
    id: 'plat-twitter-x',
    name: 'Twitter / X (@SeikoPH)',
    type: 'Social Platform',
    icon: 'twitter',
    reach: 120000,
    engagement: 6400,
    engagementRate: 5.33,
    clicks: 2800,
    ctr: 2.33,
    cpc: 3.57,
    roas: 3.40,
    spend: 10000,
    revenue: 34000,
    status: 'Healthy',
    lastUpdated: '35m ago'
  },
  {
    id: 'plat-youtube',
    name: 'YouTube (Seiko Philippines Official)',
    type: 'Hybrid',
    icon: 'youtube',
    reach: 340000,
    engagement: 18900,
    engagementRate: 5.56,
    clicks: 4800,
    ctr: 1.41,
    cpc: 8.33,
    roas: 3.00,
    spend: 40000,
    revenue: 120000,
    status: 'Healthy',
    lastUpdated: '40m ago'
  }
];

export const initialSocialMetrics: SocialChannelMetric[] = [
  {
    platform: 'Facebook',
    handle: '@SeikoPhilippinesOfficial',
    followers: 524000,
    netGrowth30d: 14200,
    reach30d: 890000,
    impressions30d: 1420000,
    engagementRate: 7.01,
    sharesCount: 18400,
    color: '#1877F2'
  },
  {
    platform: 'Instagram',
    handle: '@seikophilippines',
    followers: 218000,
    netGrowth30d: 8900,
    reach30d: 480000,
    impressions30d: 740000,
    engagementRate: 8.10,
    sharesCount: 12600,
    color: '#E1306C'
  },
  {
    platform: 'TikTok',
    handle: '@seikophilippines',
    followers: 348000,
    netGrowth30d: 22400,
    reach30d: 1420000,
    impressions30d: 2180000,
    engagementRate: 6.93,
    sharesCount: 38400,
    videoViewsCount: 1840000,
    color: '#00F2FE'
  },
  {
    platform: 'YouTube',
    handle: 'Seiko Philippines',
    followers: 62400,
    netGrowth30d: 3100,
    reach30d: 340000,
    impressions30d: 520000,
    engagementRate: 5.56,
    sharesCount: 4200,
    videoViewsCount: 410000,
    color: '#FF0000'
  },
  {
    platform: 'X (Twitter)',
    handle: '@SeikoPH',
    followers: 38200,
    netGrowth30d: 1200,
    reach30d: 120000,
    impressions30d: 180000,
    engagementRate: 5.33,
    sharesCount: 2400,
    color: '#1DA1F2'
  },
  {
    platform: 'LinkedIn',
    handle: 'Seiko Watch Philippines',
    followers: 16800,
    netGrowth30d: 850,
    reach30d: 64000,
    impressions30d: 92000,
    engagementRate: 4.80,
    sharesCount: 980,
    color: '#0A66C2'
  }
];

export const initialOrganicPosts: OrganicPost[] = [
  {
    id: 'post-1',
    platform: 'Facebook',
    title: 'Official Philippine Launch: Seiko Prospex "Philippine Eagle" Limited Edition at Glorietta 4 Flagship Boutique',
    format: 'Carousel',
    impressions: 142000,
    likes: 8900,
    comments: 840,
    shares: 3420,
    engagementRate: 9.27,
    publishedDate: 'Oct 11, 2026',
    url: '#'
  },
  {
    id: 'post-2',
    platform: 'Instagram',
    title: 'A touch of luxury in Makati: Grand Seiko Evolution 9 "White Birch" on the wrist at Ayala Center',
    format: 'Static Image',
    impressions: 98400,
    likes: 6720,
    comments: 412,
    shares: 1180,
    engagementRate: 8.45,
    publishedDate: 'Oct 09, 2026',
    url: '#'
  },
  {
    id: 'post-3',
    platform: 'TikTok',
    title: 'POV: Finding the exact Seiko 5 Sports SKX Automatic model you’ve been hunting for at SM Megamall Boutique',
    format: 'Reel/Short',
    impressions: 340000,
    likes: 24500,
    comments: 1420,
    shares: 6840,
    engagementRate: 9.64,
    publishedDate: 'Oct 07, 2026',
    url: '#'
  },
  {
    id: 'post-4',
    platform: 'YouTube',
    title: 'Seiko Service Center Makati: Complete Automatic Caliber 6R35 Overhaul and Care Guide',
    format: 'Video',
    impressions: 64200,
    likes: 3840,
    comments: 290,
    shares: 890,
    engagementRate: 7.82,
    publishedDate: 'Oct 04, 2026',
    url: '#'
  }
];

export const initialConversions: ConversionEvent[] = [
  {
    id: 'conv-901',
    timestamp: '2 mins ago',
    type: 'Strategy Call Booked', // Boutique VIP Consultation
    customerName: 'Rafael De Leon (Makati Club)',
    customerLocation: 'Makati City, Metro Manila',
    value: 385000, // Grand Seiko Hi-Beat in PHP
    primaryChannel: 'Google Ads',
    touchpoints: ['Google PMax Makati', 'Seiko Glorietta 4 Page', 'VIP Boutique Booking'],
    attributionWeight: 0.6
  },
  {
    id: 'conv-902',
    timestamp: '7 mins ago',
    type: 'E-commerce Purchase',
    customerName: 'Katrina Santos',
    customerLocation: 'Bonifacio Global City, Taguig',
    value: 48500, // Seiko Prospex Speedtimer in PHP
    primaryChannel: 'Meta Ads',
    touchpoints: ['Instagram Story Ad', 'Seiko PH Official Store', 'Authorized Checkout'],
    attributionWeight: 0.7
  },
  {
    id: 'conv-903',
    timestamp: '14 mins ago',
    type: 'E-commerce Purchase',
    customerName: 'Atty. Victor Mendoza',
    customerLocation: 'Ortigas, Pasig City',
    value: 28900, // Seiko Presage Cocktail Time in PHP
    primaryChannel: 'Google Local Search',
    touchpoints: ['Google Maps Megamall', 'Boutique Store Inventory', 'Online Reserve'],
    attributionWeight: 0.8
  },
  {
    id: 'conv-904',
    timestamp: '23 mins ago',
    type: 'Qualified Lead',
    customerName: 'Mark Angelo Rivera',
    customerLocation: 'Quezon City, Metro Manila',
    value: 19500, // Seiko 5 Sports SKX Automatic in PHP
    primaryChannel: 'TikTok Ads',
    touchpoints: ['TikTok UGC Unboxing', 'Facebook Seiko PH Page', 'SM North Boutique Pickup'],
    attributionWeight: 0.5
  },
  {
    id: 'conv-905',
    timestamp: '38 mins ago',
    type: 'E-commerce Purchase',
    customerName: 'Dr. Lorenzo Tan',
    customerLocation: 'Cebu City, Central Visayas',
    value: 72000, // Seiko Prospex 1968 Diver Re-interpretation in PHP
    primaryChannel: 'Meta Ads',
    touchpoints: ['Facebook Retargeting', 'Ayala Center Cebu Boutique', 'Order Confirmed'],
    attributionWeight: 0.65
  },
  {
    id: 'conv-906',
    timestamp: '49 mins ago',
    type: 'Qualified Lead',
    customerName: 'Beatrice Villanueva',
    customerLocation: 'Alabang, Muntinlupa',
    value: 24500, // Seiko Presage Style 60s
    primaryChannel: 'Google Ads',
    touchpoints: ['Google Search "Seiko Price PH"', 'Official Store PH', 'Click & Collect'],
    attributionWeight: 0.6
  }
];

export const initialGoogleBusiness: GoogleBusinessInsight = {
  profileName: 'Seiko Boutique - Glorietta 4 (Official Flagship Manila)',
  location: 'Ground Level, Glorietta 4, Ayala Center, Makati, 1224 Metro Manila',
  verified: true,
  overallRating: 4.9,
  reviewCount: 842,
  monthlySearches: 78400,
  directSearches: 28400, // searched "seiko glorietta", "seiko boutique"
  discoverySearches: 42100, // searched "watch store makati", "diver watch manila"
  brandedSearches: 7900,
  viewsOnSearch: 52400,
  viewsOnMaps: 26000,
  customerActions: {
    websiteClicks: 4120,
    directionRequests: 3280,
    phoneCalls: 1890,
    chatMessages: 420,
    bookings: 640 // VIP private consultations
  },
  topSearchQueries: [
    { query: 'seiko boutique glorietta 4', impressions: 16800, changePct: 24.2 },
    { query: 'seiko watch price philippines', impressions: 14200, changePct: 18.5 },
    { query: 'grand seiko boutique manila', impressions: 9800, changePct: 31.0 },
    { query: 'seiko prospex diver price ph', impressions: 8400, changePct: 15.2 },
    { query: 'seiko service center makati', impressions: 7200, changePct: 28.4 },
    { query: 'seiko boutique sm megamall', impressions: 6900, changePct: 12.1 }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Carlo Dizon (Verified Buyer, Makati)',
      rating: 5,
      date: 'Yesterday',
      text: 'Purchased my first Seiko Prospex Speedtimer at the Glorietta 4 boutique. The staff were exceptionally knowledgeable about the V192 solar chronograph caliber. Came with the full official Philippine warranty card and boutique box. 10/10 customer experience!',
      sentiment: 'Positive',
      responded: true,
      replyText: 'Thank you Carlo! Welcome to the Seiko family. May your Prospex Speedtimer serve you well on every journey.'
    },
    {
      id: 'rev-2',
      author: 'Mariel Lopez (Architect, BGC)',
      rating: 5,
      date: '3 days ago',
      text: 'Visited for the Grand Seiko private consultation. They had the Evolution 9 White Birch in stock. Impeccable Zaratsu polishing and warm hospitality from the Seiko Philippines boutique associates.',
      sentiment: 'Positive',
      responded: true,
      replyText: 'Maraming salamat Mariel! It was our pleasure hosting you for the Grand Seiko viewing at Glorietta 4.'
    },
    {
      id: 'rev-3',
      author: 'Jerome Bautista (Philippine Watch Club)',
      rating: 5,
      date: '1 week ago',
      text: 'The best place to buy authentic Seiko in Metro Manila. Had my Presage Cocktail Time bracelet adjusted on the spot in under 5 minutes at the service counter.',
      sentiment: 'Positive',
      responded: true,
      replyText: 'Thank you Jerome! We always take pride in supporting our local watch community and PWC members.'
    },
    {
      id: 'rev-4',
      author: 'Anthony Go (Quezon City)',
      rating: 4,
      date: '2 weeks ago',
      text: 'Great collection of Seiko 5 Sports and Prospex Divers. Boutique was very busy on Saturday afternoon so had to wait 10 minutes for an available associate, but service was attentive once assisted.',
      sentiment: 'Positive',
      responded: false
    }
  ]
};

// 5x5 Geo-Grid across Metro Manila Coordinates
// Centered at Glorietta 4 / Ayala Center Makati (14.5507° N, 121.0260° E)
export const initialKeywords: LocalKeywordRank[] = [
  {
    id: 'kw-1',
    keyword: 'seiko boutique near me',
    averageRank: 1.48,
    top3PackPct: 96,
    searchVolume: 18400,
    competitors: [
      { name: 'Seiko Boutique Glorietta 4 (Official)', shareOfVoice: 54.0, avgRank: 1.48 },
      { name: 'Lucerne Watch Boutique', shareOfVoice: 22.0, avgRank: 3.20 },
      { name: 'Chronos SM Megamall', shareOfVoice: 14.0, avgRank: 4.80 },
      { name: 'Hour Glass Manila', shareOfVoice: 10.0, avgRank: 6.90 }
    ],
    gridPoints: [
      { id: 'p-0-0', row: 0, col: 0, lat: 14.6538, lng: 121.0330, rank: 2, addressLabel: 'SM North EDSA / QC', distanceKm: 12.1, topCompetitor: 'Seiko Boutique (SM North)' },
      { id: 'p-0-1', row: 0, col: 1, lat: 14.6400, lng: 121.0400, rank: 2, addressLabel: 'Trinoma / North Triangle', distanceKm: 10.8, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-0-2', row: 0, col: 2, lat: 14.6250, lng: 121.0500, rank: 3, addressLabel: 'Cubao / Araneta City', distanceKm: 8.9, topCompetitor: 'Chronos' },
      { id: 'p-0-3', row: 0, col: 3, lat: 14.6100, lng: 121.0350, rank: 2, addressLabel: 'New Manila / QC', distanceKm: 7.2, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-0-4', row: 0, col: 4, lat: 14.6000, lng: 121.0450, rank: 1, addressLabel: 'Greenhills Shopping Center', distanceKm: 6.1, topCompetitor: 'Seiko Boutique Glorietta 4' },

      { id: 'p-1-0', row: 1, col: 0, lat: 14.5850, lng: 121.0150, rank: 2, addressLabel: 'Mandaluyong Center', distanceKm: 4.3, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-1-1', row: 1, col: 1, lat: 14.5850, lng: 121.0550, rank: 1, addressLabel: 'SM Megamall (Boutique)', distanceKm: 4.5, topCompetitor: 'Seiko Boutique (SM Megamall)' },
      { id: 'p-1-2', row: 1, col: 2, lat: 14.5800, lng: 121.0600, rank: 1, addressLabel: 'Ortigas Center / Shangri-La', distanceKm: 4.2, topCompetitor: 'Seiko Boutique (SM Megamall)' },
      { id: 'p-1-3', row: 1, col: 3, lat: 14.5750, lng: 121.0700, rank: 2, addressLabel: 'Pasig Capitol Commons', distanceKm: 5.1, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-1-4', row: 1, col: 4, lat: 14.5700, lng: 121.0350, rank: 1, addressLabel: 'Rockwell Center / Power Plant', distanceKm: 2.3, topCompetitor: 'Seiko Boutique Glorietta 4' },

      { id: 'p-2-0', row: 2, col: 0, lat: 14.5600, lng: 121.0150, rank: 1, addressLabel: 'Salcedo Village / Makati', distanceKm: 1.4, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-2-1', row: 2, col: 1, lat: 14.5540, lng: 121.0200, rank: 1, addressLabel: 'Greenbelt 5 / Ayala Center', distanceKm: 0.5, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-2-2', row: 2, col: 2, lat: 14.5507, lng: 121.0260, rank: 1, addressLabel: 'Glorietta 4 Flagship (HQ)', distanceKm: 0.0, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-2-3', row: 2, col: 3, lat: 14.5500, lng: 121.0450, rank: 1, addressLabel: 'BGC High Street (Boutique)', distanceKm: 2.1, topCompetitor: 'Seiko Boutique (BGC)' },
      { id: 'p-2-4', row: 2, col: 4, lat: 14.5450, lng: 121.0550, rank: 1, addressLabel: 'Uptown Mall / BGC North', distanceKm: 3.4, topCompetitor: 'Seiko Boutique (BGC)' },

      { id: 'p-3-0', row: 3, col: 0, lat: 14.5350, lng: 120.9850, rank: 1, addressLabel: 'SM Mall of Asia (Boutique)', distanceKm: 4.8, topCompetitor: 'Seiko Boutique (SM MOA)' },
      { id: 'p-3-1', row: 3, col: 1, lat: 14.5300, lng: 121.0000, rank: 2, addressLabel: 'Pasay Entertainment City', distanceKm: 3.6, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-3-2', row: 3, col: 2, lat: 14.5250, lng: 121.0250, rank: 1, addressLabel: 'Magallanes / Dasmariñas', distanceKm: 2.8, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-3-3', row: 3, col: 3, lat: 14.5200, lng: 121.0500, rank: 2, addressLabel: 'McKinley Hill / Venice Mall', distanceKm: 3.9, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-3-4', row: 3, col: 4, lat: 14.5100, lng: 121.0650, rank: 3, addressLabel: 'Taguig Acacia Estates', distanceKm: 5.4, topCompetitor: 'Seiko Boutique Glorietta 4' },

      { id: 'p-4-0', row: 4, col: 0, lat: 14.4800, lng: 121.0100, rank: 3, addressLabel: 'Parañaque BF Homes', distanceKm: 7.9, topCompetitor: 'Chronos' },
      { id: 'p-4-1', row: 4, col: 1, lat: 14.4500, lng: 121.0300, rank: 2, addressLabel: 'Sucat / Bicutan Gateway', distanceKm: 11.2, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-4-2', row: 4, col: 2, lat: 14.4250, lng: 121.0400, rank: 2, addressLabel: 'Alabang Town Center', distanceKm: 14.1, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-4-3', row: 4, col: 3, lat: 14.4200, lng: 121.0450, rank: 2, addressLabel: 'Filinvest City / Festival Mall', distanceKm: 14.6, topCompetitor: 'Seiko Boutique Glorietta 4' },
      { id: 'p-4-4', row: 4, col: 4, lat: 14.4000, lng: 121.0550, rank: 4, addressLabel: 'Muntinlupa South Border', distanceKm: 16.8, topCompetitor: 'Chronos' },
    ]
  },
  {
    id: 'kw-2',
    keyword: 'seiko watch price philippines',
    averageRank: 1.32,
    top3PackPct: 96,
    searchVolume: 32000,
    competitors: [
      { name: 'Seiko Philippines (Official Online)', shareOfVoice: 62.0, avgRank: 1.32 },
      { name: 'Lazada Seiko Official Store', shareOfVoice: 18.0, avgRank: 2.90 },
      { name: 'Shopee Mall Seiko PH', shareOfVoice: 12.0, avgRank: 3.80 },
      { name: 'Zalora Philippines', shareOfVoice: 8.0, avgRank: 5.40 }
    ],
    gridPoints: [
      { id: 'p2-0-0', row: 0, col: 0, lat: 14.6538, lng: 121.0330, rank: 1, addressLabel: 'SM North EDSA / QC', distanceKm: 12.1, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-0-1', row: 0, col: 1, lat: 14.6400, lng: 121.0400, rank: 1, addressLabel: 'Trinoma / North Triangle', distanceKm: 10.8, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-0-2', row: 0, col: 2, lat: 14.6250, lng: 121.0500, rank: 2, addressLabel: 'Cubao / Araneta City', distanceKm: 8.9, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-0-3', row: 0, col: 3, lat: 14.6100, lng: 121.0350, rank: 1, addressLabel: 'New Manila / QC', distanceKm: 7.2, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-0-4', row: 0, col: 4, lat: 14.6000, lng: 121.0450, rank: 1, addressLabel: 'Greenhills Shopping Center', distanceKm: 6.1, topCompetitor: 'Seiko Philippines' },

      { id: 'p2-1-0', row: 1, col: 0, lat: 14.5850, lng: 121.0150, rank: 1, addressLabel: 'Mandaluyong Center', distanceKm: 4.3, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-1-1', row: 1, col: 1, lat: 14.5850, lng: 121.0550, rank: 1, addressLabel: 'SM Megamall (Boutique)', distanceKm: 4.5, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-1-2', row: 1, col: 2, lat: 14.5800, lng: 121.0600, rank: 1, addressLabel: 'Ortigas Center / Shangri-La', distanceKm: 4.2, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-1-3', row: 1, col: 3, lat: 14.5750, lng: 121.0700, rank: 1, addressLabel: 'Pasig Capitol Commons', distanceKm: 5.1, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-1-4', row: 1, col: 4, lat: 14.5700, lng: 121.0350, rank: 1, addressLabel: 'Rockwell Center / Power Plant', distanceKm: 2.3, topCompetitor: 'Seiko Philippines' },

      { id: 'p2-2-0', row: 2, col: 0, lat: 14.5600, lng: 121.0150, rank: 1, addressLabel: 'Salcedo Village / Makati', distanceKm: 1.4, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-2-1', row: 2, col: 1, lat: 14.5540, lng: 121.0200, rank: 1, addressLabel: 'Greenbelt 5 / Ayala Center', distanceKm: 0.5, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-2-2', row: 2, col: 2, lat: 14.5507, lng: 121.0260, rank: 1, addressLabel: 'Glorietta 4 Flagship (HQ)', distanceKm: 0.0, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-2-3', row: 2, col: 3, lat: 14.5500, lng: 121.0450, rank: 1, addressLabel: 'BGC High Street (Boutique)', distanceKm: 2.1, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-2-4', row: 2, col: 4, lat: 14.5450, lng: 121.0550, rank: 1, addressLabel: 'Uptown Mall / BGC North', distanceKm: 3.4, topCompetitor: 'Seiko Philippines' },

      { id: 'p2-3-0', row: 3, col: 0, lat: 14.5350, lng: 120.9850, rank: 1, addressLabel: 'SM Mall of Asia (Boutique)', distanceKm: 4.8, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-3-1', row: 3, col: 1, lat: 14.5300, lng: 121.0000, rank: 2, addressLabel: 'Pasay Entertainment City', distanceKm: 3.6, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-3-2', row: 3, col: 2, lat: 14.5250, lng: 121.0250, rank: 1, addressLabel: 'Magallanes / Dasmariñas', distanceKm: 2.8, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-3-3', row: 3, col: 3, lat: 14.5200, lng: 121.0500, rank: 2, addressLabel: 'McKinley Hill / Venice Mall', distanceKm: 3.9, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-3-4', row: 3, col: 4, lat: 14.5100, lng: 121.0650, rank: 2, addressLabel: 'Taguig Acacia Estates', distanceKm: 5.4, topCompetitor: 'Seiko Philippines' },

      { id: 'p2-4-0', row: 4, col: 0, lat: 14.4800, lng: 121.0100, rank: 2, addressLabel: 'Parañaque BF Homes', distanceKm: 7.9, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-4-1', row: 4, col: 1, lat: 14.4500, lng: 121.0300, rank: 1, addressLabel: 'Sucat / Bicutan Gateway', distanceKm: 11.2, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-4-2', row: 4, col: 2, lat: 14.4250, lng: 121.0400, rank: 2, addressLabel: 'Alabang Town Center', distanceKm: 14.1, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-4-3', row: 4, col: 3, lat: 14.4200, lng: 121.0450, rank: 1, addressLabel: 'Filinvest City / Festival Mall', distanceKm: 14.6, topCompetitor: 'Seiko Philippines' },
      { id: 'p2-4-4', row: 4, col: 4, lat: 14.4000, lng: 121.0550, rank: 3, addressLabel: 'Muntinlupa South Border', distanceKm: 16.8, topCompetitor: 'Seiko Philippines' },
    ]
  },
  {
    id: 'kw-3',
    keyword: 'grand seiko boutique manila',
    averageRank: 1.15,
    top3PackPct: 100,
    searchVolume: 9800,
    competitors: [
      { name: 'Grand Seiko Boutique Glorietta 4', shareOfVoice: 72.0, avgRank: 1.15 },
      { name: 'Lucerne Greenbelt 5', shareOfVoice: 18.0, avgRank: 2.80 },
      { name: 'Master Watchmakers BGC', shareOfVoice: 10.0, avgRank: 4.50 }
    ],
    gridPoints: [
      { id: 'p3-0-0', row: 0, col: 0, lat: 14.6538, lng: 121.0330, rank: 2, addressLabel: 'SM North EDSA / QC', distanceKm: 12.1, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-0-1', row: 0, col: 1, lat: 14.6400, lng: 121.0400, rank: 2, addressLabel: 'Trinoma / North Triangle', distanceKm: 10.8, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-0-2', row: 0, col: 2, lat: 14.6250, lng: 121.0500, rank: 2, addressLabel: 'Cubao / Araneta City', distanceKm: 8.9, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-0-3', row: 0, col: 3, lat: 14.6100, lng: 121.0350, rank: 1, addressLabel: 'New Manila / QC', distanceKm: 7.2, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-0-4', row: 0, col: 4, lat: 14.6000, lng: 121.0450, rank: 1, addressLabel: 'Greenhills Shopping Center', distanceKm: 6.1, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },

      { id: 'p3-1-0', row: 1, col: 0, lat: 14.5850, lng: 121.0150, rank: 1, addressLabel: 'Mandaluyong Center', distanceKm: 4.3, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-1-1', row: 1, col: 1, lat: 14.5850, lng: 121.0550, rank: 1, addressLabel: 'SM Megamall (Boutique)', distanceKm: 4.5, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-1-2', row: 1, col: 2, lat: 14.5800, lng: 121.0600, rank: 1, addressLabel: 'Ortigas Center / Shangri-La', distanceKm: 4.2, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-1-3', row: 1, col: 3, lat: 14.5750, lng: 121.0700, rank: 1, addressLabel: 'Pasig Capitol Commons', distanceKm: 5.1, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-1-4', row: 1, col: 4, lat: 14.5700, lng: 121.0350, rank: 1, addressLabel: 'Rockwell Center / Power Plant', distanceKm: 2.3, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },

      { id: 'p3-2-0', row: 2, col: 0, lat: 14.5600, lng: 121.0150, rank: 1, addressLabel: 'Salcedo Village / Makati', distanceKm: 1.4, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-2-1', row: 2, col: 1, lat: 14.5540, lng: 121.0200, rank: 1, addressLabel: 'Greenbelt 5 / Ayala Center', distanceKm: 0.5, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-2-2', row: 2, col: 2, lat: 14.5507, lng: 121.0260, rank: 1, addressLabel: 'Glorietta 4 Flagship (HQ)', distanceKm: 0.0, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-2-3', row: 2, col: 3, lat: 14.5500, lng: 121.0450, rank: 1, addressLabel: 'BGC High Street (Boutique)', distanceKm: 2.1, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-2-4', row: 2, col: 4, lat: 14.5450, lng: 121.0550, rank: 1, addressLabel: 'Uptown Mall / BGC North', distanceKm: 3.4, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },

      { id: 'p3-3-0', row: 3, col: 0, lat: 14.5350, lng: 120.9850, rank: 1, addressLabel: 'SM Mall of Asia (Boutique)', distanceKm: 4.8, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-3-1', row: 3, col: 1, lat: 14.5300, lng: 121.0000, rank: 1, addressLabel: 'Pasay Entertainment City', distanceKm: 3.6, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-3-2', row: 3, col: 2, lat: 14.5250, lng: 121.0250, rank: 1, addressLabel: 'Magallanes / Dasmariñas', distanceKm: 2.8, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-3-3', row: 3, col: 3, lat: 14.5200, lng: 121.0500, rank: 1, addressLabel: 'McKinley Hill / Venice Mall', distanceKm: 3.9, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-3-4', row: 3, col: 4, lat: 14.5100, lng: 121.0650, rank: 1, addressLabel: 'Taguig Acacia Estates', distanceKm: 5.4, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },

      { id: 'p3-4-0', row: 4, col: 0, lat: 14.4800, lng: 121.0100, rank: 1, addressLabel: 'Parañaque BF Homes', distanceKm: 7.9, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-4-1', row: 4, col: 1, lat: 14.4500, lng: 121.0300, rank: 1, addressLabel: 'Sucat / Bicutan Gateway', distanceKm: 11.2, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-4-2', row: 4, col: 2, lat: 14.4250, lng: 121.0400, rank: 1, addressLabel: 'Alabang Town Center', distanceKm: 14.1, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-4-3', row: 4, col: 3, lat: 14.4200, lng: 121.0450, rank: 1, addressLabel: 'Filinvest City / Festival Mall', distanceKm: 14.6, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
      { id: 'p3-4-4', row: 4, col: 4, lat: 14.4000, lng: 121.0550, rank: 2, addressLabel: 'Muntinlupa South Border', distanceKm: 16.8, topCompetitor: 'Grand Seiko Boutique Glorietta 4' },
    ]
  }
];

export const initialHourlyPoints: HourlyPerformancePoint[] = [
  { hour: '00:00', hourNumber: 0, reach: 12400, engagement: 680, clicks: 145, cpc: 9.80, roas: 3.80, spend: 1420, conversions: 2 },
  { hour: '01:00', hourNumber: 1, reach: 8900, engagement: 420, clicks: 92, cpc: 9.50, roas: 3.75, spend: 874, conversions: 1 },
  { hour: '02:00', hourNumber: 2, reach: 6400, engagement: 290, clicks: 58, cpc: 9.20, roas: 3.60, spend: 533, conversions: 0 },
  { hour: '03:00', hourNumber: 3, reach: 4800, engagement: 195, clicks: 38, cpc: 8.90, roas: 3.50, spend: 338, conversions: 0 },
  { hour: '04:00', hourNumber: 4, reach: 5600, engagement: 240, clicks: 54, cpc: 9.10, roas: 3.65, spend: 491, conversions: 1 },
  { hour: '05:00', hourNumber: 5, reach: 14200, engagement: 780, clicks: 190, cpc: 9.60, roas: 3.90, spend: 1824, conversions: 4 },
  { hour: '06:00', hourNumber: 6, reach: 29500, engagement: 1850, clicks: 420, cpc: 10.20, roas: 4.10, spend: 4284, conversions: 9 },
  { hour: '07:00', hourNumber: 7, reach: 58400, engagement: 3940, clicks: 890, cpc: 10.80, roas: 4.35, spend: 9612, conversions: 19 },
  { hour: '08:00', hourNumber: 8, reach: 84200, engagement: 6120, clicks: 1420, cpc: 11.20, roas: 4.60, spend: 15904, conversions: 31 },
  { hour: '09:00', hourNumber: 9, reach: 112000, engagement: 8450, clicks: 1980, cpc: 11.40, roas: 4.85, spend: 22572, conversions: 44 },
  { hour: '10:00', hourNumber: 10, reach: 135000, engagement: 9800, clicks: 2340, cpc: 11.60, roas: 5.10, spend: 27144, conversions: 58 },
  { hour: '11:00', hourNumber: 11, reach: 148000, engagement: 11200, clicks: 2580, cpc: 11.50, roas: 5.15, spend: 29670, conversions: 64 },
  { hour: '12:00', hourNumber: 12, reach: 164000, engagement: 12800, clicks: 2940, cpc: 11.30, roas: 5.30, spend: 33222, conversions: 72 },
  { hour: '13:00', hourNumber: 13, reach: 152000, engagement: 11900, clicks: 2680, cpc: 11.20, roas: 5.10, spend: 30016, conversions: 63 },
  { hour: '14:00', hourNumber: 14, reach: 168000, engagement: 13400, clicks: 3050, cpc: 11.40, roas: 5.25, spend: 34770, conversions: 76 },
  { hour: '15:00', hourNumber: 15, reach: 176000, engagement: 14200, clicks: 3240, cpc: 11.50, roas: 5.40, spend: 37260, conversions: 82 },
  { hour: '16:00', hourNumber: 16, reach: 171000, engagement: 13800, clicks: 3110, cpc: 11.40, roas: 5.20, spend: 35454, conversions: 75 },
  { hour: '17:00', hourNumber: 17, reach: 159000, engagement: 12600, clicks: 2840, cpc: 11.20, roas: 4.95, spend: 31808, conversions: 61 },
  { hour: '18:00', hourNumber: 18, reach: 148000, engagement: 11400, clicks: 2590, cpc: 11.00, roas: 4.70, spend: 28490, conversions: 52 },
  { hour: '19:00', hourNumber: 19, reach: 134000, engagement: 10200, clicks: 2280, cpc: 10.80, roas: 4.50, spend: 24624, conversions: 42 },
  { hour: '20:00', hourNumber: 20, reach: 118000, engagement: 8900, clicks: 1940, cpc: 10.60, roas: 4.30, spend: 20564, conversions: 35 },
  { hour: '21:00', hourNumber: 21, reach: 94000, engagement: 6800, clicks: 1480, cpc: 10.40, roas: 4.10, spend: 15392, conversions: 24 },
  { hour: '22:00', hourNumber: 22, reach: 62000, engagement: 4200, clicks: 920, cpc: 10.10, roas: 3.95, spend: 9292, conversions: 14 },
  { hour: '23:00', hourNumber: 23, reach: 34000, engagement: 2100, clicks: 480, cpc: 9.90, roas: 3.85, spend: 4752, conversions: 6 },
];

export const initialSEMrushOverview: SEMrushLocalOverview = {
  authorityScore: 76,
  organicTrafficPH: 194500, // Monthly organic visits from Philippines
  rankingKeywordsCount: 4820, // Total ranking keywords in Google PH
  local3PackKeywords: 186, // Local Map Pack keywords
  backlinks: 48200,
  referringDomains: 1450,
  top3PackShareOfVoice: 54.8, // % SOV in Metro Manila watch market
};

export const initialSEMrushKeywords: SEMrushLocalKeyword[] = [
  {
    id: 'sem-1',
    keyword: 'seiko watch price philippines',
    intent: 'Transactional',
    searchVolume: 32000,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews', 'Sitelinks', 'People Also Ask'],
    landingUrl: '/ph/products/all',
    cpcPHP: 12.40,
    kd: 48,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-2',
    keyword: 'seiko 5 sports automatic price',
    intent: 'Transactional',
    searchVolume: 22000,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Images', 'Reviews', 'Sitelinks'],
    landingUrl: '/ph/collections/seiko-5-sports',
    cpcPHP: 11.80,
    kd: 52,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-3',
    keyword: 'seiko boutique glorietta 4',
    intent: 'Navigational',
    searchVolume: 18400,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews', 'Sitelinks'],
    landingUrl: '/ph/boutiques/glorietta-4',
    cpcPHP: 8.50,
    kd: 22,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-4',
    keyword: 'seiko prospex price ph',
    intent: 'Commercial',
    searchVolume: 14200,
    rankGooglePH: 1,
    previousRank: 2,
    change: 1,
    serpFeatures: ['3-Pack', 'Reviews', 'People Also Ask', 'Images'],
    landingUrl: '/ph/collections/prospex',
    cpcPHP: 14.20,
    kd: 54,
    lastUpdated: 'Yesterday'
  },
  {
    id: 'sem-5',
    keyword: 'seiko official store philippines',
    intent: 'Navigational',
    searchVolume: 12800,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Sitelinks', 'Reviews'],
    landingUrl: '/ph/store-locator',
    cpcPHP: 10.90,
    kd: 35,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-6',
    keyword: 'grand seiko boutique manila',
    intent: 'Commercial',
    searchVolume: 9800,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews', 'Sitelinks', 'People Also Ask'],
    landingUrl: '/ph/grand-seiko/boutique-makati',
    cpcPHP: 24.50,
    kd: 38,
    lastUpdated: '2 days ago'
  },
  {
    id: 'sem-7',
    keyword: 'seiko service center makati',
    intent: 'Navigational',
    searchVolume: 8400,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews', 'Sitelinks'],
    landingUrl: '/ph/customer-service/service-center',
    cpcPHP: 6.80,
    kd: 24,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-8',
    keyword: 'seiko presage cocktail time price philippines',
    intent: 'Commercial',
    searchVolume: 7200,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews', 'Images'],
    landingUrl: '/ph/collections/presage/cocktail-time',
    cpcPHP: 13.50,
    kd: 42,
    lastUpdated: '3 days ago'
  },
  {
    id: 'sem-9',
    keyword: 'seiko boutique sm megamall',
    intent: 'Navigational',
    searchVolume: 6900,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews'],
    landingUrl: '/ph/boutiques/sm-megamall',
    cpcPHP: 7.20,
    kd: 20,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-10',
    keyword: 'seiko diver watch automatic philippines',
    intent: 'Commercial',
    searchVolume: 6100,
    rankGooglePH: 1,
    previousRank: 3,
    change: 2,
    serpFeatures: ['3-Pack', 'Reviews', 'People Also Ask', 'Images'],
    landingUrl: '/ph/collections/prospex/diver',
    cpcPHP: 15.10,
    kd: 58,
    lastUpdated: 'Yesterday'
  },
  {
    id: 'sem-11',
    keyword: 'seiko boutique bgc high street',
    intent: 'Navigational',
    searchVolume: 5400,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews'],
    landingUrl: '/ph/boutiques/bgc-high-street',
    cpcPHP: 7.80,
    kd: 18,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-12',
    keyword: 'seiko repair shop metro manila',
    intent: 'Transactional',
    searchVolume: 4800,
    rankGooglePH: 2,
    previousRank: 1,
    change: -1,
    serpFeatures: ['3-Pack', 'Reviews'],
    landingUrl: '/ph/customer-service/repairs',
    cpcPHP: 9.40,
    kd: 31,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-13',
    keyword: 'seiko boutique sm mall of asia',
    intent: 'Navigational',
    searchVolume: 4200,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews'],
    landingUrl: '/ph/boutiques/sm-mall-of-asia',
    cpcPHP: 8.10,
    kd: 19,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-14',
    keyword: 'king seiko price philippines',
    intent: 'Commercial',
    searchVolume: 3600,
    rankGooglePH: 1,
    previousRank: 2,
    change: 1,
    serpFeatures: ['3-Pack', 'Reviews', 'Images'],
    landingUrl: '/ph/collections/king-seiko',
    cpcPHP: 18.90,
    kd: 44,
    lastUpdated: '4 days ago'
  },
  {
    id: 'sem-15',
    keyword: 'seiko boutique ayala center cebu',
    intent: 'Navigational',
    searchVolume: 3100,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews'],
    landingUrl: '/ph/boutiques/ayala-center-cebu',
    cpcPHP: 7.50,
    kd: 17,
    lastUpdated: 'Today'
  },
  {
    id: 'sem-16',
    keyword: 'seiko speedtimer chronograph price',
    intent: 'Commercial',
    searchVolume: 2900,
    rankGooglePH: 1,
    previousRank: 1,
    change: 0,
    serpFeatures: ['3-Pack', 'Reviews', 'Images', 'People Also Ask'],
    landingUrl: '/ph/collections/prospex/speedtimer',
    cpcPHP: 16.20,
    kd: 49,
    lastUpdated: '5 days ago'
  }
];

export const initialBoutiqueListings: LocalBoutiqueListing[] = [
  {
    id: 'boutique-glorietta',
    name: 'Seiko Boutique Glorietta 4 (Official Flagship Manila)',
    mall: 'Glorietta 4, Ayala Center',
    city: 'Makati City, Metro Manila',
    address: 'G/F Glorietta 4, Ayala Center, Makati, 1224 Metro Manila',
    phone: '+63 2 8828 2000',
    rating: 4.9,
    reviewsCount: 842,
    napConsistency: 100,
    directoriesCount: 16,
    status: 'Verified & Active',
    openingHours: '10:00 AM – 9:00 PM Daily'
  },
  {
    id: 'boutique-megamall',
    name: 'Seiko Boutique SM Megamall',
    mall: 'SM Megamall Building B',
    city: 'Mandaluyong, Metro Manila',
    address: '2/F Building B, SM Megamall, EDSA, Mandaluyong, 1550 Metro Manila',
    phone: '+63 2 8631 7770',
    rating: 4.8,
    reviewsCount: 614,
    napConsistency: 100,
    directoriesCount: 16,
    status: 'Verified & Active',
    openingHours: '10:00 AM – 10:00 PM Daily'
  },
  {
    id: 'boutique-bgc',
    name: 'Seiko Boutique Bonifacio High Street',
    mall: 'Bonifacio High Street C1',
    city: 'Taguig, Metro Manila',
    address: 'G/F C1 Building, Bonifacio High Street, BGC, Taguig, 1634 Metro Manila',
    phone: '+63 2 8856 9000',
    rating: 4.9,
    reviewsCount: 528,
    napConsistency: 100,
    directoriesCount: 16,
    status: 'Verified & Active',
    openingHours: '11:00 AM – 10:00 PM Daily'
  },
  {
    id: 'boutique-moa',
    name: 'Seiko Boutique SM Mall of Asia',
    mall: 'SM Mall of Asia Main Mall',
    city: 'Pasay City, Metro Manila',
    address: '2/F Main Mall, SM Mall of Asia, J.W. Diokno Blvd, Pasay, 1300 Metro Manila',
    phone: '+63 2 8556 1234',
    rating: 4.8,
    reviewsCount: 492,
    napConsistency: 100,
    directoriesCount: 16,
    status: 'Verified & Active',
    openingHours: '10:00 AM – 10:00 PM Daily'
  },
  {
    id: 'boutique-service-center',
    name: 'Seiko Official Service Center Makati',
    mall: 'Glorietta / Ayala Center',
    city: 'Makati City, Metro Manila',
    address: 'Unit 204, Ayala Center, Makati City, 1224 Metro Manila',
    phone: '+63 2 8812 5566',
    rating: 4.9,
    reviewsCount: 380,
    napConsistency: 100,
    directoriesCount: 14,
    status: 'Verified & Active',
    openingHours: '10:00 AM – 7:00 PM (Mon-Sat)'
  },
  {
    id: 'boutique-cebu',
    name: 'Seiko Boutique Ayala Center Cebu',
    mall: 'Ayala Center Cebu',
    city: 'Cebu City, Central Visayas',
    address: 'Level 1, Ayala Center Cebu, Cardinal Rosales Ave, Cebu City, 6000',
    phone: '+63 32 233 4567',
    rating: 4.8,
    reviewsCount: 310,
    napConsistency: 98,
    directoriesCount: 15,
    status: 'Verified & Active',
    openingHours: '10:00 AM – 9:00 PM Daily'
  },
  {
    id: 'boutique-sm-north',
    name: 'Seiko Boutique SM North EDSA',
    mall: 'SM North EDSA City Center',
    city: 'Quezon City, Metro Manila',
    address: '2/F City Center, SM City North EDSA, Quezon City, 1105 Metro Manila',
    phone: '+63 2 8929 1122',
    rating: 4.7,
    reviewsCount: 425,
    napConsistency: 100,
    directoriesCount: 16,
    status: 'Verified & Active',
    openingHours: '10:00 AM – 10:00 PM Daily'
  },
  {
    id: 'boutique-alabang',
    name: 'Seiko Boutique Alabang Town Center',
    mall: 'Alabang Town Center',
    city: 'Muntinlupa, Metro Manila',
    address: 'G/F Expansion Wing, Alabang Town Center, Muntinlupa, 1781 Metro Manila',
    phone: '+63 2 8842 3344',
    rating: 4.8,
    reviewsCount: 280,
    napConsistency: 96,
    directoriesCount: 15,
    status: 'Verified & Active',
    openingHours: '10:00 AM – 9:00 PM Daily'
  }
];

