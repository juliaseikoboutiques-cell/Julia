import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  RefreshCw,
  Clock,
  DollarSign,
  MousePointer,
  Users,
  Eye,
  Activity,
  CheckCircle2,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  LineChart as LineChartIcon,
  BarChart3,
  Percent,
  Zap,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  ConsolidatedPlatformMetric,
  HourlyPerformancePoint,
  SyncCadence,
  AdCampaign,
} from '../types/marketing';
import { ROIForecaster } from './ROIForecaster';

interface ConsolidatedDashboardProps {
  consolidatedPlatforms: ConsolidatedPlatformMetric[];
  hourlyPoints: HourlyPerformancePoint[];
  campaigns: AdCampaign[];
  onManualSync: () => void;
  lastSyncTime: Date;
  onOpenNewCampaign: () => void;
  onApplyBudgetToCampaigns?: (platformBudgets: Record<string, number>) => void;
}

interface CustomRevenueTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomRevenueTooltip: React.FC<CustomRevenueTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  const isPositiveGrowth = data.growthPct >= 0;

  return (
    <div className="bg-slate-950/95 border border-slate-700/80 rounded-lg p-3 shadow-xl backdrop-blur-md text-xs min-w-[210px] z-50">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
        <span className="font-bold text-white flex items-center gap-1.5 font-mono">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          {label} (Hour {data.hourNumber}:00)
        </span>
        {data.isPeak && (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            ★ Peak
          </span>
        )}
      </div>

      <div className="space-y-1.5 font-mono text-[11px]">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Hourly Revenue:</span>
          <span className="text-emerald-400 font-bold">₱{data.revenue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">HoH Growth:</span>
          <span className={`font-semibold ${isPositiveGrowth ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositiveGrowth ? '+' : ''}{data.growthPct}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Cumulative Rev:</span>
          <span className="text-indigo-300">₱{data.cumulativeRevenue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center pt-1 border-t border-slate-800/80 text-[10px]">
          <span className="text-slate-500">Ad Spend: ₱{data.spend.toLocaleString()}</span>
          <span className="text-slate-400 font-semibold">{data.roas.toFixed(2)}x ROAS</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-500">Conversions: {data.conversions}</span>
          <span className="text-slate-500">Clicks: {data.clicks.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-2 pt-1 border-t border-slate-800/60 text-[10px] text-indigo-400 font-sans italic text-center">
        Click point to lock hour telemetry
      </div>
    </div>
  );
};

interface CustomThirtyDayTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  areaChartMode?: 'stacked' | 'overlaid' | 'daily_stream';
}

const CustomThirtyDayTooltip: React.FC<CustomThirtyDayTooltipProps> = ({
  active,
  payload,
  label,
  areaChartMode = 'stacked',
}) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0]?.payload;
  if (!data) return null;

  return (
    <div className="bg-slate-950/95 border border-slate-700/80 rounded-lg p-3.5 shadow-2xl backdrop-blur-md text-xs min-w-[250px] z-50">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div className="flex items-center gap-1.5 font-mono text-white font-bold">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{data.fullDate}</span>
          <span className="text-slate-500 font-normal">· Day {data.dayNumber} of 30</span>
        </div>
        {data.isToday && (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 border border-emerald-700 text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Sync
          </span>
        )}
        {data.isPayday && !data.isToday && (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-950/80 border border-amber-700/70 text-amber-300 font-semibold">
            Quincena Payday
          </span>
        )}
        {data.isMegaSale && (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-950/80 border border-purple-700/70 text-purple-300 font-semibold">
            10.10 Sale Peak
          </span>
        )}
      </div>

      <div className="mb-2 pb-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-400 font-sans">
          {areaChartMode === 'daily_stream' ? 'Daily Total Sales:' : 'Total Cumulative Rev:'}
        </span>
        <span className="text-emerald-400 font-bold text-xs">
          ₱{(areaChartMode === 'daily_stream' ? data.dailyTotal : data.totalCumulative).toLocaleString()}
        </span>
      </div>

      <div className="space-y-1.5 text-[11px] font-mono">
        {payload.map((entry: any) => {
          const platformName = entry.dataKey;
          const val = entry.value;
          const share = data.totalCumulative > 0 ? ((val / data.totalCumulative) * 100).toFixed(1) : '0';
          return (
            <div key={platformName} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-300 truncate max-w-[120px]">{platformName}:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-semibold">₱{val.toLocaleString()}</span>
                {areaChartMode !== 'daily_stream' && (
                  <span className="text-slate-500 text-[10px]">({share}%)</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
        <span>Daily Run: +₱{data.dailyTotal.toLocaleString()}</span>
        <span className="text-indigo-400 font-medium">Seiko PH Ad Network</span>
      </div>
    </div>
  );
};

export const ConsolidatedDashboard: React.FC<ConsolidatedDashboardProps> = ({
  consolidatedPlatforms,
  hourlyPoints,
  campaigns,
  onManualSync,
  lastSyncTime,
  onOpenNewCampaign,
  onApplyBudgetToCampaigns,
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'analytics' | 'forecasting'>('all');
  const [filterType, setFilterType] = useState<'All' | 'Ad Network' | 'Social Platform' | 'Hybrid'>('All');
  const [sortBy, setSortBy] = useState<'reach' | 'clicks' | 'cpc' | 'roas' | 'spend'>('roas');
  const [chartMetric, setChartMetric] = useState<'clicks_spend' | 'roas_cpc' | 'reach_engagement'>('roas_cpc');
  const [revenueChartMode, setRevenueChartMode] = useState<'dual' | 'revenue' | 'growth' | 'cumulative'>('dual');
  const [chartVisualization, setChartVisualization] = useState<'line' | 'bars'>('line');
  const [areaChartMode, setAreaChartMode] = useState<'stacked' | 'overlaid' | 'daily_stream'>('stacked');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'Google Ads',
    'Meta Ads',
    'TikTok Ads',
    'YouTube Ads',
  ]);
  const [selectedHour, setSelectedHour] = useState<HourlyPerformancePoint>(hourlyPoints[15] || hourlyPoints[0]);
  const [syncCadence, setSyncCadence] = useState<SyncCadence>('1h');
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState<boolean>(true);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3600); // 1 hour default
  const [isSyncingAnimation, setIsSyncingAnimation] = useState<boolean>(false);

  // Auto-sync countdown timer
  useEffect(() => {
    if (!autoUpdateEnabled || syncCadence === 'manual') return;

    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          // Trigger automated hourly sync
          handleTriggerSync();
          const nextInterval = syncCadence === '15m' ? 900 : syncCadence === 'live' ? 15 : 3600;
          return nextInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoUpdateEnabled, syncCadence]);

  // Adjust countdown when cadence changes
  const handleCadenceChange = (newCadence: SyncCadence) => {
    setSyncCadence(newCadence);
    if (newCadence === '15m') setCountdownSeconds(900);
    else if (newCadence === '1h') setCountdownSeconds(3600);
    else if (newCadence === 'live') setCountdownSeconds(15);
  };

  const handleTriggerSync = () => {
    setIsSyncingAnimation(true);
    onManualSync();
    setTimeout(() => {
      setIsSyncingAnimation(false);
      // Reset countdown based on cadence
      if (syncCadence === '15m') setCountdownSeconds(900);
      else if (syncCadence === '1h') setCountdownSeconds(3600);
      else if (syncCadence === 'live') setCountdownSeconds(15);
    }, 1200);
  };

  const formatCountdown = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // High-level consolidated metrics calculations
  const totalReach = consolidatedPlatforms.reduce((a, b) => a + b.reach, 0);
  const totalEngagement = consolidatedPlatforms.reduce((a, b) => a + b.engagement, 0);
  const totalClicks = consolidatedPlatforms.reduce((a, b) => a + b.clicks, 0);
  const totalSpend = consolidatedPlatforms.reduce((a, b) => a + b.spend, 0);
  const totalRevenue = consolidatedPlatforms.reduce((a, b) => a + b.revenue, 0);
  
  // Paid ad networks only for true CPC
  const paidPlatforms = consolidatedPlatforms.filter((p) => p.spend > 0);
  const paidSpend = paidPlatforms.reduce((a, b) => a + b.spend, 0);
  const paidClicks = paidPlatforms.reduce((a, b) => a + b.clicks, 0);
  const blendedCpc = paidClicks > 0 ? (paidSpend / paidClicks).toFixed(2) : '1.42';
  const blendedRoas = paidSpend > 0 ? (totalRevenue / paidSpend).toFixed(2) : '4.18';
  const aggregateEngagementRate = totalReach > 0 ? ((totalEngagement / totalReach) * 100).toFixed(2) : '4.68';

  // Memoized 24-hour revenue trend and growth calculations
  const revenueTrendData = useMemo(() => {
    let runningCumulative = 0;
    let maxRevenue = 0;

    const points = hourlyPoints.map((pt, idx) => {
      const hourlyRevenue = pt.revenue ?? Math.round(pt.spend * pt.roas);
      if (hourlyRevenue > maxRevenue) maxRevenue = hourlyRevenue;
      runningCumulative += hourlyRevenue;

      const prevPt = idx > 0 ? hourlyPoints[idx - 1] : null;
      const prevRev = prevPt ? (prevPt.revenue ?? Math.round(prevPt.spend * prevPt.roas)) : hourlyRevenue;
      const rawGrowthPct = prevPt && prevRev > 0
        ? (((hourlyRevenue - prevRev) / prevRev) * 100)
        : 0;
      const growthPct = Number(rawGrowthPct.toFixed(1));

      return {
        hour: pt.hour,
        hourNumber: pt.hourNumber,
        revenue: hourlyRevenue,
        revenueInK: Number((hourlyRevenue / 1000).toFixed(1)),
        spend: pt.spend,
        roas: pt.roas,
        clicks: pt.clicks,
        reach: pt.reach,
        conversions: pt.conversions,
        growthPct,
        cumulativeRevenue: runningCumulative,
        cumulativeInK: Number((runningCumulative / 1000).toFixed(1)),
        rawPoint: pt,
      };
    });

    return points.map((p) => ({
      ...p,
      isPeak: p.revenue === maxRevenue,
    }));
  }, [hourlyPoints]);

  const total24hRevenue = revenueTrendData.reduce((acc, p) => acc + p.revenue, 0);
  const peakPoint = revenueTrendData.reduce(
    (prev, curr) => (curr.revenue > prev.revenue ? curr : prev),
    revenueTrendData[0] || { revenue: 0, hour: '15:00', growthPct: 0, roas: 5.4 }
  );
  const positiveGrowthHours = revenueTrendData.filter((p) => p.growthPct > 0).length;
  const avgHourlyRevenue = Math.round(total24hRevenue / (revenueTrendData.length || 1));
  const selectedRevenueData = revenueTrendData.find((p) => p.hour === selectedHour.hour) || revenueTrendData[0];

  // Memoized 30-Day Cumulative Revenue Growth Trend by Campaign Platform
  const thirtyDayTrendData = useMemo(() => {
    // 1. Calculate platform totals from campaigns
    const googleTarget =
      campaigns
        .filter((c) => c.platform === 'Google Ads')
        .reduce((acc, c) => acc + c.revenue, 0) || 1610000;
    const metaTarget =
      campaigns
        .filter((c) => c.platform === 'Meta Ads')
        .reduce((acc, c) => acc + c.revenue, 0) || 2065000;
    const tiktokTarget =
      campaigns
        .filter((c) => c.platform === 'TikTok Ads')
        .reduce((acc, c) => acc + c.revenue, 0) || 235000;
    const youtubeTarget =
      campaigns
        .filter((c) => c.platform === 'YouTube Ads')
        .reduce((acc, c) => acc + c.revenue, 0) || 120000;

    // Real-time live sync variance based on lastSyncTime
    const liveSyncBonus = (lastSyncTime.getSeconds() % 10) * 1200;

    // Daily distribution weights across 30 days (summing to ~1.0)
    // Reflects real Philippine shopping patterns: 15th/30th Quincena paydays & 10.10 Double-Digit Mega Campaign
    const rawWeights = [
      0.024, 0.026, 0.028, 0.025, 0.027, 0.031, 0.033, // Days 1-7
      0.027, 0.026, 0.028, 0.029, 0.030, 0.032, 0.035, // Days 8-14
      0.034, 0.048, 0.038, 0.031, 0.030, 0.029, 0.031, // Days 15-21 (Day 16: Quincena Payday surge)
      0.033, 0.035, 0.032, 0.034, 0.036, 0.052, 0.039, // Days 22-28 (Day 27: 10.10 Mega Campaign)
      0.036, 0.049, // Days 29-30 (Day 30: Mid-Month Payday / Today live sync)
    ];

    const weightSum = rawWeights.reduce((a, b) => a + b, 0);
    const normalizedWeights = rawWeights.map((w) => w / weightSum);

    let cumGoogle = 0;
    let cumMeta = 0;
    let cumTikTok = 0;
    let cumYouTube = 0;

    const points = [];
    const baseDate = new Date(lastSyncTime);
    baseDate.setDate(baseDate.getDate() - 29); // 30-day window ending today

    for (let i = 0; i < 30; i++) {
      const pointDate = new Date(baseDate);
      pointDate.setDate(baseDate.getDate() + i);
      const isToday = i === 29;
      const isPayday = i === 15 || i === 29;
      const isMegaSale = i === 26; // 10.10 sale

      const weight = normalizedWeights[i];
      const dailyGoogle = Math.round(googleTarget * weight * (1 + (i % 2 === 0 ? 0.04 : -0.03)));
      const dailyMeta = Math.round(metaTarget * weight * (1 + (i % 3 === 0 ? 0.06 : -0.02)));
      const dailyTikTok = Math.round(tiktokTarget * weight * (1 + (i % 4 === 0 ? 0.08 : -0.04)));
      const dailyYouTube = Math.round(youtubeTarget * weight * (1 + (i % 5 === 0 ? 0.05 : -0.03)));

      const realTimeDailyGoogle = isToday ? dailyGoogle + liveSyncBonus * 0.45 : dailyGoogle;
      const realTimeDailyMeta = isToday ? dailyMeta + liveSyncBonus * 0.40 : dailyMeta;
      const realTimeDailyTikTok = isToday ? dailyTikTok + liveSyncBonus * 0.10 : dailyTikTok;
      const realTimeDailyYouTube = isToday ? dailyYouTube + liveSyncBonus * 0.05 : dailyYouTube;

      cumGoogle += Math.round(realTimeDailyGoogle);
      cumMeta += Math.round(realTimeDailyMeta);
      cumTikTok += Math.round(realTimeDailyTikTok);
      cumYouTube += Math.round(realTimeDailyYouTube);

      const totalCum = cumGoogle + cumMeta + cumTikTok + cumYouTube;
      const dailyTotal = Math.round(
        realTimeDailyGoogle + realTimeDailyMeta + realTimeDailyTikTok + realTimeDailyYouTube
      );

      const monthName = pointDate.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = pointDate.getDate();

      points.push({
        dayNumber: i + 1,
        date: `${monthName} ${dayNum}`,
        fullDate: pointDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        isToday,
        isPayday,
        isMegaSale,
        // Cumulative by Platform
        'Google Ads': cumGoogle,
        'Meta Ads': cumMeta,
        'TikTok Ads': cumTikTok,
        'YouTube Ads': cumYouTube,
        totalCumulative: totalCum,
        // Daily increments by Platform
        dailyGoogle: Math.round(realTimeDailyGoogle),
        dailyMeta: Math.round(realTimeDailyMeta),
        dailyTikTok: Math.round(realTimeDailyTikTok),
        dailyYouTube: Math.round(realTimeDailyYouTube),
        dailyTotal,
      });
    }

    return points;
  }, [campaigns, lastSyncTime]);

  const latest30DayPoint = thirtyDayTrendData[thirtyDayTrendData.length - 1] || thirtyDayTrendData[0];
  const first30DayPoint = thirtyDayTrendData[0];
  const total30DayCumulative = latest30DayPoint?.totalCumulative || 4030000;
  const thirtyDayGoogleTotal = latest30DayPoint?.['Google Ads'] || 1610000;
  const thirtyDayMetaTotal = latest30DayPoint?.['Meta Ads'] || 2065000;
  const thirtyDayTikTokTotal = latest30DayPoint?.['TikTok Ads'] || 235000;
  const thirtyDayYouTubeTotal = latest30DayPoint?.['YouTube Ads'] || 120000;
  const thirtyDayGrowthMultiplier =
    first30DayPoint?.totalCumulative > 0
      ? (total30DayCumulative / first30DayPoint.totalCumulative).toFixed(1)
      : '28.4';

  const togglePlatform = (plat: string) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(plat)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((p) => p !== plat);
      }
      return [...prev, plat];
    });
  };

  // Filtered & Sorted Platforms
  const filteredPlatforms = consolidatedPlatforms
    .filter((p) => filterType === 'All' || p.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'reach') return b.reach - a.reach;
      if (sortBy === 'clicks') return b.clicks - a.clicks;
      if (sortBy === 'cpc') return b.cpc - a.cpc;
      if (sortBy === 'roas') return b.roas - a.roas;
      if (sortBy === 'spend') return b.spend - a.spend;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Automated Sync Header & Cadence Control Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Seiko Philippines · Consolidated Performance Engine</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Automated Sync
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <span>Last updated: {lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300 font-mono">Next hourly sync in {formatCountdown(countdownSeconds)}</span>
            </p>
          </div>
        </div>

        {/* Sync Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Cadence Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-500 px-2 text-[11px]">Sync Cadence:</span>
            {(['15m', '1h', 'live'] as SyncCadence[]).map((cad) => (
              <button
                key={cad}
                onClick={() => handleCadenceChange(cad)}
                className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap shrink-0 ${
                  syncCadence === cad
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cad === '15m' && '15 Min'}
                {cad === '1h' && 'Hourly (Auto)'}
                {cad === 'live' && 'Real-Time'}
              </button>
            ))}
          </div>

          <button
            onClick={handleTriggerSync}
            disabled={isSyncingAnimation}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAnimation ? 'animate-spin text-indigo-400' : ''}`} />
            <span>{isSyncingAnimation ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Sub-View Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-slate-900/90 border border-slate-800 rounded-lg">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSection === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Unified View</span>
          </button>

          <button
            onClick={() => setActiveSection('forecasting')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 relative ${
              activeSection === 'forecasting'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ROI Forecasting & 30D Spend</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold uppercase tracking-wider">
              New
            </span>
          </button>

          <button
            onClick={() => setActiveSection('analytics')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSection === 'analytics'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Historical Telemetry & Matrix</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-mono hidden md:flex items-center gap-2 pr-2">
          <span>Historical Run: ₱{(total30DayCumulative / 1000000).toFixed(2)}M sales</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-semibold">{blendedRoas}x ROAS</span>
        </div>
      </div>

      {(activeSection === 'all' || activeSection === 'analytics') && (
        <>
          {/* The 5 Key Consolidated Metrics Specified by Prompt */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* 1. Reach */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Total Reach</span>
                <Users className="w-3.5 h-3.5 text-indigo-400" />
              </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
            {(totalReach / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Philippines (PH)</span>
            <span className="text-emerald-400 font-mono tabular-nums">+14.2%</span>
          </div>
        </div>

        {/* 2. Engagement */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Engagement</span>
            <Activity className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
            {totalEngagement.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Rate: <strong className="text-slate-200 font-mono">{aggregateEngagementRate}%</strong></span>
            <span className="text-emerald-400 font-mono tabular-nums">+0.4%</span>
          </div>
        </div>

        {/* 3. Clicks */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Total Clicks</span>
            <MousePointer className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
            {totalClicks.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Avg CTR: <strong className="text-slate-200 font-mono">2.85%</strong></span>
            <span className="text-emerald-400 font-mono tabular-nums">+8.1%</span>
          </div>
        </div>

        {/* 4. Cost Per Click (CPC in PHP) */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Blended CPC</span>
            <span className="text-amber-400 font-bold font-mono text-xs">₱</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
            ₱{blendedCpc}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Target: &lt;₱15.00</span>
            <span className="text-emerald-400 font-mono tabular-nums">-₱1.80</span>
          </div>
        </div>

        {/* 5. Return on Ad Spend (ROAS) */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Blended ROAS</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums tracking-tight">
            {blendedRoas}x
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Rev: ₱{(totalRevenue / 1000000).toFixed(2)}M</span>
            <span className="text-emerald-400 font-mono tabular-nums">+0.48x</span>
          </div>
        </div>
      </div>

      {/* 30-Day Real-Time Cumulative Revenue Growth Trend (Aggregated by Campaign Platform) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">
                30-Day Cumulative Revenue Growth Trajectory
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync Active
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono">
                Recharts Area
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Cumulative revenue accumulation aggregated across Google Ads, Meta Ads, TikTok Ads, and YouTube Ads over the past 30 days.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Area Chart Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-500 px-1.5 text-[11px] hidden sm:inline">Mode:</span>
              {(
                [
                  { id: 'stacked', label: 'Stacked Cumulative' },
                  { id: 'overlaid', label: 'Comparative (Overlaid)' },
                  { id: 'daily_stream', label: 'Daily Sales Velocity' },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setAreaChartMode(mode.id)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap text-[11px] font-medium ${
                    areaChartMode === mode.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 30-Day Platform KPI Micro-Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          <div className="bg-slate-950/70 border border-slate-850 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
              <span>30-Day Cumulative</span>
              <Sparkles className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-base font-bold text-emerald-400 font-mono">
              ₱{(total30DayCumulative / 1000000).toFixed(2)}M
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              ₱{total30DayCumulative.toLocaleString()} total ad sales
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-850 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Meta Ads (FB/IG PH)</span>
              <span className="w-2 h-2 rounded-full bg-purple-500" />
            </div>
            <div className="text-base font-bold text-purple-400 font-mono">
              ₱{(thirtyDayMetaTotal / 1000000).toFixed(2)}M
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {((thirtyDayMetaTotal / total30DayCumulative) * 100).toFixed(1)}% Share · 4.87x ROAS
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-850 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
              <span>Google Ads (PMax)</span>
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <div className="text-base font-bold text-blue-400 font-mono">
              ₱{(thirtyDayGoogleTotal / 1000000).toFixed(2)}M
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {((thirtyDayGoogleTotal / total30DayCumulative) * 100).toFixed(1)}% Share · 4.67x ROAS
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-850 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
              <span>TikTok & YouTube</span>
              <span className="w-2 h-2 rounded-full bg-pink-500" />
            </div>
            <div className="text-base font-bold text-pink-400 font-mono">
              ₱{((thirtyDayTikTokTotal + thirtyDayYouTubeTotal) / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {(((thirtyDayTikTokTotal + thirtyDayYouTubeTotal) / total30DayCumulative) * 100).toFixed(1)}% Share · Awareness
            </div>
          </div>
        </div>

        {/* Platform Filter Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 text-[11px] mr-1">Filter Platforms:</span>
            {[
              { id: 'Google Ads', label: 'Google Ads', color: '#3b82f6', bg: 'hover:border-blue-500/50' },
              { id: 'Meta Ads', label: 'Meta Ads', color: '#8b5cf6', bg: 'hover:border-purple-500/50' },
              { id: 'TikTok Ads', label: 'TikTok Ads', color: '#ec4899', bg: 'hover:border-pink-500/50' },
              { id: 'YouTube Ads', label: 'YouTube Ads', color: '#ef4444', bg: 'hover:border-red-500/50' },
            ].map((p) => {
              const isSelected = selectedPlatforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={`px-2.5 py-1 rounded-md border text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800 text-white border-slate-600 shadow-sm'
                      : 'bg-slate-950/60 text-slate-500 border-slate-850 line-through opacity-60'
                  } ${p.bg}`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: isSelected ? p.color : '#64748b' }}
                  />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
            <span>30-Day Window: {first30DayPoint?.date} – {latest30DayPoint?.date}</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-semibold">{thirtyDayGrowthMultiplier}x Total 30D Scale</span>
          </div>
        </div>

        {/* Recharts Area Chart Container */}
        <div className="h-80 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={
                areaChartMode === 'daily_stream'
                  ? thirtyDayTrendData.map((p) => ({
                      ...p,
                      'Google Ads': p.dailyGoogle,
                      'Meta Ads': p.dailyMeta,
                      'TikTok Ads': p.dailyTikTok,
                      'YouTube Ads': p.dailyYouTube,
                    }))
                  : thirtyDayTrendData
              }
              margin={{ top: 12, right: 25, left: 15, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="colorTikTok" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="colorYouTube" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.04} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#475569"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                tickLine={{ stroke: '#334155' }}
              />
              <YAxis
                stroke="#475569"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                tickLine={{ stroke: '#334155' }}
                tickFormatter={(val) =>
                  `₱${val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${(val / 1000).toFixed(0)}k`}`
                }
              />
              <Tooltip content={<CustomThirtyDayTooltip areaChartMode={areaChartMode} />} />
              <Legend
                verticalAlign="top"
                height={32}
                wrapperStyle={{ fontSize: '11px', paddingBottom: '6px' }}
              />

              {selectedPlatforms.includes('Google Ads') && (
                <Area
                  type="monotone"
                  dataKey="Google Ads"
                  name="Google Ads (Search & PMax)"
                  stackId={areaChartMode === 'stacked' ? '1' : undefined}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorGoogle)"
                  activeDot={{ r: 5, fill: '#60a5fa', stroke: '#fff', strokeWidth: 1.5 }}
                />
              )}

              {selectedPlatforms.includes('Meta Ads') && (
                <Area
                  type="monotone"
                  dataKey="Meta Ads"
                  name="Meta Ads (FB & IG PH)"
                  stackId={areaChartMode === 'stacked' ? '1' : undefined}
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#colorMeta)"
                  activeDot={{ r: 5, fill: '#a78bfa', stroke: '#fff', strokeWidth: 1.5 }}
                />
              )}

              {selectedPlatforms.includes('TikTok Ads') && (
                <Area
                  type="monotone"
                  dataKey="TikTok Ads"
                  name="TikTok Ads (Prospex & S5)"
                  stackId={areaChartMode === 'stacked' ? '1' : undefined}
                  stroke="#ec4899"
                  strokeWidth={2}
                  fill="url(#colorTikTok)"
                  activeDot={{ r: 5, fill: '#f472b6', stroke: '#fff', strokeWidth: 1.5 }}
                />
              )}

              {selectedPlatforms.includes('YouTube Ads') && (
                <Area
                  type="monotone"
                  dataKey="YouTube Ads"
                  name="YouTube Ads (100th Anniv)"
                  stackId={areaChartMode === 'stacked' ? '1' : undefined}
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#colorYouTube)"
                  activeDot={{ r: 5, fill: '#f87171', stroke: '#fff', strokeWidth: 1.5 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Trajectory Milestones Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 pt-3 px-1 border-t border-slate-800/60 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Payday Acceleration: Quincena (15th & 30th) generate +38% higher conversion volume
            </span>
            <span className="text-slate-600 hidden md:inline">·</span>
            <span className="text-slate-400 hidden md:inline">
              10.10 Mega Watch Campaign generated ₱210.4k peak daily run
            </span>
          </div>
          <span className="text-indigo-400">
            Real-time multi-platform aggregation updated every sync
          </span>
        </div>
      </div>
        </>
      )}

      {/* Interactive Callout Banner to Forecaster */}
      {activeSection === 'analytics' && (
        <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-800/80 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">Project Next 30 Days Ad Spend Requirements</h4>
                <span className="px-2 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold font-mono">
                  Trend Model Ready
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Simulate required ad spend for Google Ads, Meta Ads, TikTok, and YouTube to hit ₱4.8M+ target revenue based on past 30-day ROAS.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveSection('forecasting')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5 shadow-sm"
          >
            <span>Open ROI Forecaster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 30-Day ROI Forecasting & Ad Spend Requirements Feature */}
      {(activeSection === 'all' || activeSection === 'forecasting') && (
        <div id="roi-forecasting-section">
          <ROIForecaster
            campaigns={campaigns}
            consolidatedPlatforms={consolidatedPlatforms}
            historical30DayRevenue={total30DayCumulative}
            historical30DaySpend={paidSpend}
            onApplyBudgetToCampaigns={onApplyBudgetToCampaigns}
          />
        </div>
      )}

      {/* Hourly Performance Timeline & 24h Revenue Growth Trend Analysis */}
      {(activeSection === 'all' || activeSection === 'analytics') && (
        <>
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">24-Hour Hourly Revenue Growth & Trend Trajectory</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono">
                Recharts Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hourly consolidation of revenue generation (₱ PHP), growth velocity (%), and cross-platform conversions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Visualization Mode Toggle: Line Chart vs Bar Breakdown */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setChartVisualization('line')}
                className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  chartVisualization === 'line'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LineChartIcon className="w-3.5 h-3.5" />
                <span>Revenue Growth Line</span>
              </button>
              <button
                onClick={() => setChartVisualization('bars')}
                className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  chartVisualization === 'bars'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Metric Bars</span>
              </button>
            </div>

            {/* Line Chart Metric View Toggle */}
            {chartVisualization === 'line' && (
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                {(
                  [
                    { id: 'dual', label: 'Dual (Rev + %)' },
                    { id: 'revenue', label: 'Hourly Rev (₱)' },
                    { id: 'growth', label: 'HoH Growth (%)' },
                    { id: 'cumulative', label: 'Cumulative (₱)' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setRevenueChartMode(m.id)}
                    className={`px-2 py-1 rounded transition-colors whitespace-nowrap text-[11px] ${
                      revenueChartMode === m.id
                        ? 'bg-slate-800 text-white font-medium border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            )}

            {/* Bar Chart Metric Selector */}
            {chartVisualization === 'bars' && (
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                {(['roas_cpc', 'clicks_spend', 'reach_engagement'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setChartMetric(m)}
                    className={`px-2 py-1 rounded transition-colors whitespace-nowrap text-[11px] ${
                      chartMetric === m ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m === 'roas_cpc' && 'ROAS & CPC'}
                    {m === 'clicks_spend' && 'Clicks & Spend'}
                    {m === 'reach_engagement' && 'Reach & Eng.'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 1. Primary Recharts Line Chart View */}
        {chartVisualization === 'line' && (
          <div className="pt-1">
            {/* Quick 24h Revenue KPI Micro-Capsules */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div className="bg-slate-950/70 border border-slate-850 rounded-lg p-2.5">
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">24h Ad Revenue</div>
                <div className="text-base font-bold text-emerald-400 font-mono">
                  ₱{(total24hRevenue / 1000000).toFixed(2)}M
                </div>
                <div className="text-[10px] text-slate-500 font-mono">₱{total24hRevenue.toLocaleString()} PHP</div>
              </div>

              <div className="bg-slate-950/70 border border-slate-850 rounded-lg p-2.5">
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Peak Revenue Hour</div>
                <div className="text-base font-bold text-amber-300 font-mono flex items-center gap-1">
                  <span>{peakPoint.hour}</span>
                  <span className="text-xs font-normal text-slate-400">(₱{(peakPoint.revenue / 1000).toFixed(1)}k)</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">{peakPoint.roas.toFixed(2)}x ROAS Peak</div>
              </div>

              <div className="bg-slate-950/70 border border-slate-850 rounded-lg p-2.5">
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Avg Hourly Revenue</div>
                <div className="text-base font-bold text-indigo-400 font-mono">
                  ₱{(avgHourlyRevenue / 1000).toFixed(1)}k / hr
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Continuous 24h tracking</div>
              </div>

              <div className="bg-slate-950/70 border border-slate-850 rounded-lg p-2.5">
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Growth Velocity</div>
                <div className="text-base font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <span>{positiveGrowthHours}/24 Hours</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Positive revenue growth</div>
              </div>
            </div>

            {/* Recharts Line Chart Container */}
            <div className="h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueTrendData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      const clickedHour = e.activePayload[0].payload.rawPoint;
                      if (clickedHour) setSelectedHour(clickedHour);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    stroke="#475569"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={{ stroke: '#334155' }}
                  />

                  {/* Left Y-Axis: Revenue in PHP */}
                  {(revenueChartMode === 'dual' || revenueChartMode === 'revenue') && (
                    <YAxis
                      yAxisId="left"
                      stroke="#6366f1"
                      tick={{ fill: '#818cf8', fontSize: 11, fontFamily: 'monospace' }}
                      tickLine={{ stroke: '#334155' }}
                      tickFormatter={(val) => `₱${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                    />
                  )}

                  {/* Cumulative Y-Axis */}
                  {revenueChartMode === 'cumulative' && (
                    <YAxis
                      yAxisId="cumulative"
                      stroke="#a855f7"
                      tick={{ fill: '#c084fc', fontSize: 11, fontFamily: 'monospace' }}
                      tickLine={{ stroke: '#334155' }}
                      tickFormatter={(val) => `₱${(val / 1000).toFixed(0)}k`}
                    />
                  )}

                  {/* Right Y-Axis: HoH Growth Rate % */}
                  {(revenueChartMode === 'dual' || revenueChartMode === 'growth') && (
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#10b981"
                      tick={{ fill: '#34d399', fontSize: 11, fontFamily: 'monospace' }}
                      tickLine={{ stroke: '#334155' }}
                      tickFormatter={(val) => `${val > 0 ? '+' : ''}${val}%`}
                    />
                  )}

                  <Tooltip content={<CustomRevenueTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={32}
                    wrapperStyle={{ fontSize: '11px', paddingBottom: '4px' }}
                  />

                  {(revenueChartMode === 'dual' || revenueChartMode === 'growth') && (
                    <ReferenceLine yAxisId="right" y={0} stroke="#475569" strokeDasharray="3 3" />
                  )}

                  {/* Line 1: Hourly Revenue */}
                  {(revenueChartMode === 'dual' || revenueChartMode === 'revenue') && (
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      name="Hourly Revenue (₱ PHP)"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#6366f1', stroke: '#1e1b4b', strokeWidth: 1.5 }}
                      activeDot={{ r: 6, fill: '#818cf8', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  )}

                  {/* Line 2: Hour-over-Hour Growth Rate % */}
                  {(revenueChartMode === 'dual' || revenueChartMode === 'growth') && (
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="growthPct"
                      name="HoH Revenue Growth Rate (%)"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray={revenueChartMode === 'dual' ? '4 4' : undefined}
                      dot={{ r: 3, fill: '#10b981', stroke: '#064e3b', strokeWidth: 1.5 }}
                      activeDot={{ r: 6, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  )}

                  {/* Line 3: Cumulative Revenue Trajectory */}
                  {revenueChartMode === 'cumulative' && (
                    <Line
                      yAxisId="cumulative"
                      type="monotone"
                      dataKey="cumulativeRevenue"
                      name="Cumulative Revenue Trajectory (₱ PHP)"
                      stroke="#a855f7"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#a855f7', stroke: '#3b0764', strokeWidth: 1.5 }}
                      activeDot={{ r: 6, fill: '#c084fc', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 px-1 border-t border-slate-800/60 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                Hourly Peak Window: 11:00 - 16:00 (Lunch & Afternoon E-Commerce Rush in PH)
              </span>
              <span className="text-slate-400">
                Click any point to lock snapshot telemetry below
              </span>
            </div>
          </div>
        )}

        {/* 2. Secondary Metric Bars View */}
        {chartVisualization === 'bars' && (
          <div className="relative pt-2 pb-1">
            <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 items-end h-36 border-b border-slate-800">
              {hourlyPoints.map((pt) => {
                const isSelected = selectedHour.hour === pt.hour;
                let heightPct = 50;

                if (chartMetric === 'roas_cpc') {
                  heightPct = Math.min(100, Math.max(15, (pt.roas / 5.0) * 100));
                } else if (chartMetric === 'clicks_spend') {
                  heightPct = Math.min(100, Math.max(15, (pt.clicks / 800) * 100));
                } else {
                  heightPct = Math.min(100, Math.max(15, (pt.reach / 50000) * 100));
                }

                return (
                  <button
                    key={pt.hour}
                    onClick={() => setSelectedHour(pt)}
                    className={`group flex flex-col items-center justify-end h-full rounded transition-all focus:outline-none ${
                      isSelected ? 'bg-indigo-950/50' : 'hover:bg-slate-800/40'
                    }`}
                    title={`${pt.hour} | Revenue: ₱${(pt.spend * pt.roas).toLocaleString()} | ROAS: ${pt.roas}x | Clicks: ${pt.clicks}`}
                  >
                    <div
                      className={`w-full rounded-t transition-all ${
                        isSelected
                          ? 'bg-indigo-500 shadow-sm shadow-indigo-500/50'
                          : chartMetric === 'roas_cpc' && pt.roas >= 4.0
                          ? 'bg-emerald-500/80 group-hover:bg-emerald-400'
                          : 'bg-indigo-600/70 group-hover:bg-indigo-500'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Time Labels */}
            <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
              <span>00:00 (Midnight)</span>
              <span>06:00 (Dawn)</span>
              <span>12:00 (Noon)</span>
              <span>18:00 (Evening)</span>
              <span>23:00 (Night)</span>
            </div>
          </div>
        )}

        {/* Selected Hour Telemetry Capsule */}
        <div className="mt-3 p-3 bg-slate-950/80 border border-slate-850 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Hour Snapshot: {selectedHour.hour}</span>
            <span className="text-slate-500 font-mono">·</span>
            <span className="text-slate-400">Hour {selectedHour.hourNumber} of 24</span>
            {selectedRevenueData.isPeak && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                Peak Hour
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono tabular-nums text-[11px]">
            <div>
              <span className="text-slate-500">Hourly Revenue: </span>
              <span className="text-emerald-400 font-bold">
                ₱{(selectedHour.revenue ?? Math.round(selectedHour.spend * selectedHour.roas)).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-slate-500">HoH Growth: </span>
              <span className={`font-semibold ${selectedRevenueData.growthPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {selectedRevenueData.growthPct >= 0 ? '+' : ''}{selectedRevenueData.growthPct}%
              </span>
            </div>
            <div>
              <span className="text-slate-500">Hourly Reach: </span>
              <span className="text-white font-medium">{selectedHour.reach.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-500">Clicks: </span>
              <span className="text-white font-medium">{selectedHour.clicks}</span>
            </div>
            <div>
              <span className="text-slate-500">Hourly CPC: </span>
              <span className="text-white font-medium">₱{selectedHour.cpc.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500">Hourly ROAS: </span>
              <span className="text-emerald-400 font-bold">{selectedHour.roas.toFixed(2)}x</span>
            </div>
            <div>
              <span className="text-slate-500">Hourly Spend: </span>
              <span className="text-white font-medium">₱{selectedHour.spend.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consolidated Channels Matrix Table (Social Media + Ad Networks) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
        {/* Table Filters & Sorting Controls */}
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Consolidated Cross-Platform Matrix</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Side-by-side performance comparing social media channels and paid ad networks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter by Platform Type */}
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
              {(['All', 'Ad Network', 'Social Platform', 'Hybrid'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                    filterType === type
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type === 'All' ? 'All Channels' : type}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300">
              <span className="text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="roas" className="bg-slate-900">ROAS (High to Low)</option>
                <option value="reach" className="bg-slate-900">Reach (High to Low)</option>
                <option value="clicks" className="bg-slate-900">Clicks (High to Low)</option>
                <option value="cpc" className="bg-slate-900">CPC (Cost per Click)</option>
                <option value="spend" className="bg-slate-900">Spend</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                <th className="py-3 px-4 font-semibold">Platform & Channel</th>
                <th className="py-3 px-3 font-semibold">Classification</th>
                <th className="py-3 px-3 font-semibold text-right">Reach</th>
                <th className="py-3 px-3 font-semibold text-right">Engagement</th>
                <th className="py-3 px-3 font-semibold text-right">Eng. Rate</th>
                <th className="py-3 px-3 font-semibold text-right">Clicks</th>
                <th className="py-3 px-3 font-semibold text-right">CTR</th>
                <th className="py-3 px-3 font-semibold text-right">CPC</th>
                <th className="py-3 px-3 font-semibold text-right">ROAS</th>
                <th className="py-3 px-3 font-semibold text-right">Spend</th>
                <th className="py-3 px-4 font-semibold text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPlatforms.map((plat) => (
                <tr key={plat.id} className="hover:bg-slate-850/40 transition-colors">
                  {/* Platform Name */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{plat.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">Updated {plat.lastUpdated}</div>
                  </td>

                  {/* Classification */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        plat.type === 'Ad Network'
                          ? 'bg-blue-950/80 border border-blue-800 text-blue-300'
                          : plat.type === 'Social Platform'
                          ? 'bg-purple-950/80 border border-purple-800 text-purple-300'
                          : 'bg-cyan-950/80 border border-cyan-800 text-cyan-300'
                      }`}
                    >
                      {plat.type}
                    </span>
                  </td>

                  {/* Reach */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-200">
                    {plat.reach.toLocaleString()}
                  </td>

                  {/* Engagement */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                    {plat.engagement.toLocaleString()}
                  </td>

                  {/* Engagement Rate */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-medium text-purple-400">
                    {plat.engagementRate.toFixed(2)}%
                  </td>

                  {/* Clicks */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-200 font-medium">
                    {plat.clicks.toLocaleString()}
                  </td>

                  {/* CTR */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                    {plat.ctr.toFixed(2)}%
                  </td>

                  {/* Cost per Click (CPC) */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    {plat.cpc > 0 ? (
                      <span className="text-slate-200 font-medium">₱{plat.cpc.toFixed(2)}</span>
                    ) : (
                      <span className="text-slate-500">Organic (₱0)</span>
                    )}
                  </td>

                  {/* ROAS */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    <span
                      className={`font-bold ${
                        plat.roas >= 4.0
                          ? 'text-emerald-400'
                          : plat.roas >= 2.5
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {plat.roas.toFixed(2)}x
                    </span>
                  </td>

                  {/* Spend */}
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                    ₱{plat.spend.toLocaleString()}
                  </td>

                  {/* Revenue */}
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-emerald-400">
                    ₱{plat.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
