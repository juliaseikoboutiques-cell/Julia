import React, { useState } from 'react';
import {
  Search,
  Globe,
  MapPin,
  TrendingUp,
  TrendingDown,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  SlidersHorizontal,
  RefreshCw,
  Plus,
  ShieldCheck,
  Building,
  Phone,
  Clock,
  Sparkles,
  Award,
  BarChart2,
} from 'lucide-react';
import {
  SEMrushLocalKeyword,
  LocalBoutiqueListing,
  SEMrushLocalOverview,
  LocalKeywordRank,
  KeywordIntent,
  GoogleBusinessInsight,
} from '../types/marketing';
import { LocalSearchRankGrid } from './LocalSearchRankGrid';
import { GoogleBusinessProfile } from './GoogleBusinessProfile';

interface SEMrushLocalSEOProps {
  overview: SEMrushLocalOverview;
  keywords: SEMrushLocalKeyword[];
  boutiques: LocalBoutiqueListing[];
  geoGridKeywords: LocalKeywordRank[];
  gbpData?: GoogleBusinessInsight;
  onAddReviewResponse?: (reviewId: string, replyText: string) => void;
}

export const SEMrushLocalSEO: React.FC<SEMrushLocalSEOProps> = ({
  overview,
  keywords: initialKeywordsList,
  boutiques,
  geoGridKeywords,
  gbpData,
  onAddReviewResponse,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'positions' | 'geogrid' | 'gbp' | 'listings' | 'competitors'>('positions');
  const [keywordList, setKeywordList] = useState<SEMrushLocalKeyword[]>(initialKeywordsList);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [intentFilter, setIntentFilter] = useState<string>('All');
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'volume' | 'rank' | 'kd' | 'cpc'>('volume');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [newKeywordInput, setNewKeywordInput] = useState<string>('');

  const handleRefreshRankings = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Simulate fresh Google PH SERP check
      setKeywordList((prev) =>
        prev.map((k) => ({
          ...k,
          lastUpdated: 'Just now',
          change: Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : 0) : k.change,
        }))
      );
    }, 1200);
  };

  const handleAddNewKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeywordInput.trim()) return;

    const newKw: SEMrushLocalKeyword = {
      id: `sem-${Date.now()}`,
      keyword: newKeywordInput.trim().toLowerCase(),
      intent: 'Commercial',
      searchVolume: 4500,
      rankGooglePH: 1,
      previousRank: 2,
      change: 1,
      serpFeatures: ['3-Pack', 'Reviews', 'Sitelinks'],
      landingUrl: '/ph/products/search',
      cpcPHP: 11.20,
      kd: 36,
      lastUpdated: 'Just now',
    };

    setKeywordList([newKw, ...keywordList]);
    setNewKeywordInput('');
  };

  const filteredKeywords = keywordList
    .filter((k) => {
      const matchesSearch = k.keyword.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIntent = intentFilter === 'All' || k.intent === intentFilter;
      const matchesPos =
        positionFilter === 'All'
          ? true
          : positionFilter === '1'
          ? k.rankGooglePH === 1
          : positionFilter === 'top3'
          ? k.rankGooglePH <= 3
          : k.rankGooglePH <= 10;
      return matchesSearch && matchesIntent && matchesPos;
    })
    .sort((a, b) => {
      if (sortBy === 'volume') return b.searchVolume - a.searchVolume;
      if (sortBy === 'rank') return a.rankGooglePH - b.rankGooglePH;
      if (sortBy === 'kd') return b.kd - a.kd;
      if (sortBy === 'cpc') return b.cpcPHP - a.cpcPHP;
      return 0;
    });

  const getIntentBadge = (intent: KeywordIntent) => {
    switch (intent) {
      case 'Transactional':
        return 'text-emerald-400 bg-emerald-950/80 border border-emerald-800/80';
      case 'Commercial':
        return 'text-amber-400 bg-amber-950/80 border border-amber-800/80';
      case 'Navigational':
        return 'text-blue-400 bg-blue-950/80 border border-blue-800/80';
      case 'Informational':
        return 'text-purple-400 bg-purple-950/80 border border-purple-800/80';
      default:
        return 'text-slate-400 bg-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top SEMrush Style Authority Header Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  SEMrush Local · Seiko Philippines Official
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-950/80 border border-orange-700/80 text-orange-400 font-mono font-semibold">
                  Google PH (Mobile & Desktop)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Official domain: <span className="text-slate-200 font-mono">seikowatches.co.ph</span> · Regional HQ: Ayala Center, Makati
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefreshRankings}
              disabled={isRefreshing}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-orange-400' : ''}`} />
              <span>{isRefreshing ? 'Checking Google PH...' : 'Live SERP Refresh'}</span>
            </button>
          </div>
        </div>

        {/* 6 SEMrush Metric Capsules */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
          {/* 1. Authority Score */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-lg p-3">
            <div className="text-[11px] text-slate-400 font-medium">Authority Score</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-orange-400 font-mono tabular-nums">
                {overview.authorityScore}
              </span>
              <span className="text-[11px] text-slate-500">/100</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">High Trust (Top Tier PH)</div>
          </div>

          {/* 2. Organic Traffic */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-lg p-3">
            <div className="text-[11px] text-slate-400 font-medium">Organic Traffic (PH)</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
              {(overview.organicTrafficPH / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] text-emerald-400 font-mono tabular-nums mt-1">+18.5% MoM</div>
          </div>

          {/* 3. Ranking Keywords */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-lg p-3">
            <div className="text-[11px] text-slate-400 font-medium">Ranking Keywords</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
              {overview.rankingKeywordsCount.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Google PH SERPs</div>
          </div>

          {/* 4. Local 3-Pack SERPs */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-lg p-3">
            <div className="text-[11px] text-slate-400 font-medium">Local 3-Pack SERPs</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-1">
              {overview.local3PackKeywords}
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">96% dominant</div>
          </div>

          {/* 5. Backlinks & Citations */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-lg p-3">
            <div className="text-[11px] text-slate-400 font-medium">Backlinks & Citations</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
              {(overview.backlinks / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">{overview.referringDomains} domains</div>
          </div>

          {/* 6. Local SOV */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-lg p-3">
            <div className="text-[11px] text-slate-400 font-medium">3-Pack Share of Voice</div>
            <div className="text-2xl font-bold text-indigo-400 font-mono tabular-nums mt-1">
              {overview.top3PackShareOfVoice}%
            </div>
            <div className="text-[10px] text-slate-500 mt-1">#1 in Metro Manila</div>
          </div>
        </div>
      </div>

      {/* SEMrush Sub-View Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
        <button
          onClick={() => setActiveSubTab('positions')}
          className={`px-4 py-2 rounded-md font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
            activeSubTab === 'positions'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Position Tracking (Keywords & SERPs)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono">{keywordList.length}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('geogrid')}
          className={`px-4 py-2 rounded-md font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
            activeSubTab === 'geogrid'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Metro Manila Geo-Grid Heatmap</span>
        </button>

        {gbpData && onAddReviewResponse && (
          <button
            onClick={() => setActiveSubTab('gbp')}
            className={`px-4 py-2 rounded-md font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeSubTab === 'gbp'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Google Business Profile & Reviews</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono">4.9★</span>
          </button>
        )}

        <button
          onClick={() => setActiveSubTab('listings')}
          className={`px-4 py-2 rounded-md font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
            activeSubTab === 'listings'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Listing Management (NAP Consistency)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono">99.2%</span>
        </button>

        <button
          onClick={() => setActiveSubTab('competitors')}
          className={`px-4 py-2 rounded-md font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
            activeSubTab === 'competitors'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Competitor SERP Share of Voice</span>
        </button>
      </div>

      {/* Sub-View 1: SEMrush Position Tracking (Keywords & SERPs) */}
      {activeSubTab === 'positions' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden space-y-4 p-4">
          {/* Controls & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              {/* Intent Filter */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-500 px-1 text-[11px]">Intent:</span>
                {(['All', 'Transactional', 'Commercial', 'Navigational'] as const).map((intent) => (
                  <button
                    key={intent}
                    onClick={() => setIntentFilter(intent)}
                    className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                      intentFilter === intent
                        ? 'bg-slate-800 text-white font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {intent === 'All' ? 'All' : intent.slice(0, 5)}
                  </button>
                ))}
              </div>

              {/* Position Filter */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-500 px-1 text-[11px]">Rank:</span>
                {(['All', '1', 'top3'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPositionFilter(pos)}
                    className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                      positionFilter === pos
                        ? 'bg-slate-800 text-white font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {pos === 'All' ? 'All Ranks' : pos === '1' ? 'Rank #1' : 'Top 3-Pack'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Add Keyword Form */}
              <form onSubmit={handleAddNewKeyword} className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="+ Add query to track..."
                  value={newKeywordInput}
                  onChange={(e) => setNewKeywordInput(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1.5 text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors"
                >
                  Track
                </button>
              </form>

              {/* Search bar */}
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* SEMrush Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                  <th className="py-3 px-4 font-semibold">Keyword (Google PH)</th>
                  <th className="py-3 px-3 font-semibold">Intent</th>
                  <th className="py-3 px-3 font-semibold text-right">Search Volume</th>
                  <th className="py-3 px-3 font-semibold text-center">Google PH Rank</th>
                  <th className="py-3 px-3 font-semibold text-center">Change</th>
                  <th className="py-3 px-3 font-semibold">SERP Features</th>
                  <th className="py-3 px-3 font-semibold">Target Landing URL</th>
                  <th className="py-3 px-3 font-semibold text-right">CPC (PHP)</th>
                  <th className="py-3 px-4 font-semibold text-right">KD %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredKeywords.map((kw) => (
                  <tr key={kw.id} className="hover:bg-slate-850/40 transition-colors">
                    {/* Keyword */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{kw.keyword}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">Updated {kw.lastUpdated}</div>
                    </td>

                    {/* Intent Pill */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getIntentBadge(kw.intent)}`}>
                        {kw.intent}
                      </span>
                    </td>

                    {/* Search Volume */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-200 font-medium">
                      {kw.searchVolume.toLocaleString()}
                    </td>

                    {/* Google PH Rank */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-mono font-bold text-xs ${
                          kw.rankGooglePH === 1
                            ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30'
                            : kw.rankGooglePH <= 3
                            ? 'bg-emerald-600/80 text-white'
                            : 'bg-amber-500 text-slate-950'
                        }`}
                      >
                        #{kw.rankGooglePH}
                      </span>
                    </td>

                    {/* Change */}
                    <td className="py-3 px-3 text-center font-mono tabular-nums">
                      {kw.change > 0 ? (
                        <span className="text-emerald-400 font-semibold inline-flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />+{kw.change}
                        </span>
                      ) : kw.change < 0 ? (
                        <span className="text-rose-400 font-semibold inline-flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" />{kw.change}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>

                    {/* SERP Features */}
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap items-center gap-1 max-w-[200px]">
                        {kw.serpFeatures.map((feat, i) => (
                          <span
                            key={i}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                              feat === '3-Pack'
                                ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/80'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Landing URL */}
                    <td className="py-3 px-3 max-w-[180px]">
                      <span className="text-slate-400 font-mono text-[11px] truncate block hover:text-white transition-colors">
                        {kw.landingUrl}
                      </span>
                    </td>

                    {/* CPC */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                      ₱{kw.cpcPHP.toFixed(2)}
                    </td>

                    {/* KD % */}
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      <span
                        className={`font-semibold ${
                          kw.kd >= 60 ? 'text-rose-400' : kw.kd >= 40 ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {kw.kd}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-View 2: Geo-Grid Heatmap */}
      {activeSubTab === 'geogrid' && (
        <LocalSearchRankGrid keywordDataList={geoGridKeywords} />
      )}

      {/* Sub-View 2.5: Google Business Profile & Reviews */}
      {activeSubTab === 'gbp' && gbpData && onAddReviewResponse && (
        <GoogleBusinessProfile
          gbpData={gbpData}
          onAddReviewResponse={onAddReviewResponse}
        />
      )}

      {/* Sub-View 3: SEMrush Listing Management & NAP Consistency */}
      {activeSubTab === 'listings' && (
        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SEMrush Listing Management & Local NAP Audit</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified Name, Address, and Phone Number (NAP) consistency across 16 major directory platforms in the Philippines.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">
                  <span className="text-slate-400">Total Boutiques: </span>
                  <span className="text-white font-bold">{boutiques.length}</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">
                  <span className="text-slate-400">NAP Consistency: </span>
                  <span className="text-emerald-400 font-bold">99.2%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {boutiques.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-950/70 border border-slate-850 hover:border-slate-800 rounded-lg p-4 space-y-3 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{b.name}</h4>
                      <div className="text-xs text-slate-400 mt-0.5">{b.mall} · {b.city}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 border border-emerald-800 text-emerald-400">
                      {b.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{b.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="font-mono">{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{b.openingHours}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-semibold">{b.rating}★ ({b.reviewsCount} reviews)</span>
                    <span className="text-emerald-400">NAP Sync: {b.napConsistency}% ({b.directoriesCount}/16 directories)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-View 4: Competitor SERP Share of Voice */}
      {activeSubTab === 'competitors' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>SEMrush Local SERP Share of Voice (SOV) Analysis</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Market share breakdown in Google Philippines Local 3-Pack and organic watch search results.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { name: 'Seiko Philippines Official (Boutiques & Online)', sov: 54.8, keywords: 186, color: 'bg-emerald-500', isClient: true },
              { name: 'Lucerne Watch Boutique (Authorized Dealer)', sov: 18.2, keywords: 84, color: 'bg-blue-500', isClient: false },
              { name: 'Chronos / SM Department Store Watch Bar', sov: 12.4, keywords: 52, color: 'bg-amber-500', isClient: false },
              { name: 'The Hour Glass Manila (Luxury Retail)', sov: 6.8, keywords: 28, color: 'bg-purple-500', isClient: false },
              { name: 'Grey Market & Resellers (Shopee/Lazada unverified)', sov: 7.8, keywords: 41, color: 'bg-slate-600', isClient: false },
            ].map((comp, idx) => (
              <div key={idx} className="space-y-1.5 p-3 rounded-lg bg-slate-950/60 border border-slate-850">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${comp.isClient ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {comp.name}
                    </span>
                    {comp.isClient && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono">
                        You
                      </span>
                    )}
                  </div>
                  <div className="font-mono tabular-nums text-slate-300">
                    <strong className="text-white">{comp.sov}%</strong> SOV ({comp.keywords} 3-Pack keywords)
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${comp.color}`} style={{ width: `${comp.sov}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
