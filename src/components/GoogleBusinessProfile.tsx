import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Star,
  Phone,
  Navigation,
  Globe,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Search,
  Sparkles,
  Send,
  Building2,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { GoogleBusinessInsight, BranchGBPPerformance } from '../types/marketing';
import { initialBranchGBPData } from '../data/initialData';

interface GoogleBusinessProfileProps {
  gbpData: GoogleBusinessInsight;
  onAddReviewResponse: (reviewId: string, replyText: string) => void;
  branchPerformance?: BranchGBPPerformance[];
}

export const GoogleBusinessProfile: React.FC<GoogleBusinessProfileProps> = ({
  gbpData,
  onAddReviewResponse,
  branchPerformance = initialBranchGBPData,
}) => {
  const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Positive' | 'Neutral' | 'Critical'>('All');
  const [regionFilter, setRegionFilter] = useState<'All' | 'Metro Manila' | 'Cebu'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Above Benchmark' | 'Below Benchmark'>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [reviewBranchFilter, setReviewBranchFilter] = useState<string>('All');
  const [expandedBranchId, setExpandedBranchId] = useState<string | null>('branch-mitsukoshi');
  const [activeView, setActiveView] = useState<'table' | 'intent' | 'reviews'>('table');
  const [respondingReviewId, setRespondingReviewId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');

  // Aggregated calculations based on actual 13 stores data
  const networkTotalViews = 64502;
  const networkTotalActions = 751;
  const networkTotalDirections = 532;
  const networkTotalCalls = 180;
  const networkTotalClicks = 39;
  const networkAvgConvRate = 1.16;
  const networkAvgRating = 3.74;
  const networkPositivePct = 61.9;

  const filteredBranches = useMemo(() => {
    return branchPerformance.filter((b) => {
      const matchesRegion = regionFilter === 'All' || b.region === regionFilter;
      const matchesStatus = statusFilter === 'All' || b.performanceStatus === statusFilter;
      const matchesSearch =
        b.branchName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        b.performanceTier.toLowerCase().includes(searchFilter.toLowerCase());
      return matchesRegion && matchesStatus && matchesSearch;
    });
  }, [branchPerformance, regionFilter, statusFilter, searchFilter]);

  const filteredReviews = useMemo(() => {
    return gbpData.reviews.filter((r) => {
      const matchesSentiment = sentimentFilter === 'All' || r.sentiment === sentimentFilter;
      const matchesBranch = reviewBranchFilter === 'All' || r.branchId === reviewBranchFilter;
      return matchesSentiment && matchesBranch;
    });
  }, [gbpData.reviews, sentimentFilter, reviewBranchFilter]);

  const handleStartReply = (id: string, defaultName: string) => {
    setRespondingReviewId(id);
    setResponseText(
      `Hi ${defaultName.split(' ')[0]}, thank you for visiting the Seiko Boutique! We are delighted to assist you with authentic Japanese watch craftsmanship and official Seiko Philippine warranty service.`
    );
  };

  const handleSubmitReply = (id: string) => {
    if (!responseText.trim()) return;
    onAddReviewResponse(id, responseText.trim());
    setRespondingReviewId(null);
    setResponseText('');
  };

  return (
    <div className="space-y-6">
      {/* Network Benchmark Executive Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                September 2026 Actuals
              </span>
              <span className="text-xs text-slate-400">13 Retail Boutiques (Metro Manila & Cebu)</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight mt-1">
              SEIKO BOUTIQUE NETWORK — ALL-BRANCH GBP PERFORMANCE
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Unified executive benchmarking of Google Business Profile traffic, customer high-intent actions, conversion efficiencies, and store reputation.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0 text-xs font-mono">
            <span className="text-slate-400">Retail Benchmark:</span>
            <span className="text-white font-bold">2.00% Conv.</span>
            <span className="text-rose-400 font-semibold">(Variance: -0.84%)</span>
          </div>
        </div>

        {/* 4 Primary Network Rollup KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-4">
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Network Total Views</span>
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">
              {networkTotalViews.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
              <TrendingUp className="w-3 h-3" /> +48.8% MoM Growth
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">All 13 Stores · Manila & Cebu</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total Customer Actions</span>
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
              {networkTotalActions.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Directions: <strong className="text-white">532</strong> (70.8%)
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Calls: 180 (24%) · Clicks: 39</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Avg Conversion Rate</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-indigo-400 font-mono mt-1">
              {networkAvgConvRate}%
            </div>
            <div className="text-[11px] text-rose-400 mt-0.5">
              -0.84% vs 2.0% Benchmark
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Elite Peak: Mitsukoshi 17.67%</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Reputation & Star Rating</span>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
              {networkAvgRating} ★
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              {networkPositivePct}% Positive Reviews
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Seaside Cebu 5.0★ · Megamall 2.9★</span>
          </div>
        </div>
      </div>

      {/* Sub-navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeView === 'table'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            All 13 Stores Benchmarking Table
          </button>
          <button
            onClick={() => setActiveView('intent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeView === 'intent'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Action Channel & Intent Analysis
          </button>
          <button
            onClick={() => setActiveView('reviews')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeView === 'reviews'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Customer Reviews ({gbpData.reviews.length})
          </button>
        </div>

        {/* Filter Controls for Table view */}
        {activeView === 'table' && (
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search branch name..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-36 sm:w-44"
            />

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Regions (13)</option>
              <option value="Metro Manila">Metro Manila (10)</option>
              <option value="Cebu">Cebu (3)</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Above Benchmark">Above Benchmark (7)</option>
              <option value="Below Benchmark">Below Benchmark (6)</option>
            </select>
          </div>
        )}
      </div>

      {/* VIEW 1: All 13 Stores Benchmarking Table with Action Plans */}
      {activeView === 'table' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3.5">Branch Name</th>
                  <th className="py-3 px-2.5">Region</th>
                  <th className="py-3 px-3 text-right">Views</th>
                  <th className="py-3 px-2.5 text-right">MoM %</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                  <th className="py-3 px-2.5 text-right">Calls</th>
                  <th className="py-3 px-2.5 text-right">Directions</th>
                  <th className="py-3 px-2.5 text-right">Clicks</th>
                  <th className="py-3 px-3 text-right">Conv. Rate</th>
                  <th className="py-3 px-2.5 text-right">Rating</th>
                  <th className="py-3 px-3">Performance Status</th>
                  <th className="py-3 px-2 text-center">Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                {filteredBranches.map((b) => {
                  const isExpanded = expandedBranchId === b.id;
                  const isAbove = b.performanceStatus === 'Above Benchmark';

                  return (
                    <React.Fragment key={b.id}>
                      <tr
                        onClick={() => setExpandedBranchId(isExpanded ? null : b.id)}
                        className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                          isExpanded ? 'bg-slate-800/40' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3.5 font-sans font-semibold text-white flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full inline-block shrink-0 ${
                              isAbove ? 'bg-emerald-400' : 'bg-rose-400'
                            }`}
                          />
                          <span>{b.branchName}</span>
                        </td>

                        <td className="py-2.5 px-2.5 font-sans text-slate-400 text-[11px]">
                          {b.region}
                        </td>

                        <td className="py-2.5 px-3 text-right font-medium text-white">
                          {b.totalViews.toLocaleString()}
                        </td>

                        <td
                          className={`py-2.5 px-2.5 text-right font-medium ${
                            b.momViewsGrowth.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {b.momViewsGrowth}
                        </td>

                        <td className="py-2.5 px-3 text-right font-bold text-amber-400">
                          {b.totalActions}
                        </td>

                        <td className="py-2.5 px-2.5 text-right text-slate-300">
                          {b.calls}
                        </td>

                        <td className="py-2.5 px-2.5 text-right text-slate-300">
                          {b.directions}
                        </td>

                        <td className="py-2.5 px-2.5 text-right text-slate-400">
                          {b.websiteClicks}
                        </td>

                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`font-bold ${
                              b.conversionRate >= 2.0
                                ? 'text-emerald-400'
                                : b.conversionRate >= 1.0
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {b.conversionRate.toFixed(2)}%
                          </span>
                        </td>

                        <td className="py-2.5 px-2.5 text-right font-sans">
                          {b.averageStarRating > 0 ? (
                            <span className="text-amber-400 font-bold">{b.averageStarRating.toFixed(2)}★</span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">No reviews</span>
                          )}
                        </td>

                        <td className="py-2.5 px-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              isAbove
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                                : 'bg-rose-950/80 text-rose-300 border-rose-800/60'
                            }`}
                          >
                            {b.performanceStatus}
                          </span>
                        </td>

                        <td className="py-2.5 px-2 text-center text-slate-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4 mx-auto" /> : <ChevronDown className="w-4 h-4 mx-auto" />}
                        </td>
                      </tr>

                      {/* Expandable Strategic Action Plan Drawer */}
                      {isExpanded && (
                        <tr className="bg-slate-950/90 border-b border-slate-800">
                          <td colSpan={12} className="py-3 px-5 font-sans">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1.5">
                                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  <span>Core Strength & Challenge ({b.performanceTier})</span>
                                </span>
                                <p className="text-slate-300 leading-relaxed">
                                  {b.coreStrengthAndChallenge}
                                </p>
                                <div className="text-[11px] text-slate-400 pt-1 font-mono">
                                  Traffic Share: <strong>{b.trafficShare}%</strong> · Action Split: {b.directionShare}% Directions, {b.callShare}% Calls
                                </div>
                              </div>

                              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1.5">
                                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Strategic Action Plan</span>
                                </span>
                                <p className="text-slate-300 leading-relaxed">
                                  {b.strategicActionPlan}
                                </p>
                                <div className="text-[11px] text-slate-400 pt-1 font-mono">
                                  Positive Review %: <strong>{b.positiveReviewPct}%</strong> · Variance vs Benchmark: <span className={b.benchmarkVariance.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}>{b.benchmarkVariance}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Showing {filteredBranches.length} of 13 official Seiko boutiques</span>
            <span>Click any row to reveal detailed diagnosis and store-specific action plan</span>
          </div>
        </div>
      )}

      {/* VIEW 2: Action Channel & Intent Distribution */}
      {activeView === 'intent' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Directions Channel</span>
                <Navigation className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">532 Actions</div>
              <div className="text-xs text-amber-400 font-semibold">70.8% Dominant Share</div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                Directions dominate customer intent across every branch. Stores like EVIA and NUSTAR receive 100% of their customer engagements through map routing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Phone Inquiry Channel</span>
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">180 Calls</div>
              <div className="text-xs text-emerald-400 font-semibold">24.0% Portfolio Share</div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                Highest call volumes generated at SM Megamall (52 calls) and SM North (32 calls), primarily for stock availability and repair inquiries.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Website Clicks Channel</span>
                <Globe className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">39 Clicks</div>
              <div className="text-xs text-blue-400 font-semibold">5.2% Portfolio Share</div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                Mitsukoshi BGC (18 clicks) and SM Cebu (10 clicks) drive over 70% of website visits, reflecting tech-savvy collectors reviewing catalog collections online.
              </p>
            </div>
          </div>

          {/* Tier Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Tier 1: Elite & High Converters (Above Benchmark)</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">Mitsukoshi BGC</span>
                  <span className="font-mono text-emerald-400 font-bold">17.67% Conv (94 actions)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">Glorietta Makati Flagship</span>
                  <span className="font-mono text-emerald-400 font-bold">13.53% Conv (23 actions)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">NUSTAR Resort Cebu</span>
                  <span className="font-mono text-emerald-400 font-bold">11.66% Conv (47 actions)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">The Shoppes at Solaire</span>
                  <span className="font-mono text-emerald-400 font-bold">4.76% Conv (50 actions)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">Ayala Fairview Terraces</span>
                  <span className="font-mono text-emerald-400 font-bold">4.12% Conv (32 actions)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Tier 3: Mega Anchor & High-Traffic Centers</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">SM North EDSA</span>
                  <span className="font-mono text-slate-300">29,681 views (46% share) · 0.22% Conv</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">SM Megamall</span>
                  <span className="font-mono text-slate-300">8,483 views · 1.26% Conv (107 actions)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">Festival Mall Alabang</span>
                  <span className="font-mono text-slate-300">8,275 views · 1.21% Conv (100 actions)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">Gateway Mall 2 Cubao</span>
                  <span className="font-mono text-slate-300">5,767 views · 0.99% Conv (57 actions)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                  <span className="font-semibold text-white">SM Seaside Cebu</span>
                  <span className="font-mono text-slate-300">4,004 views · 1.15% Conv (5.0★ rating)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Reviews & Reputation Management */}
      {activeView === 'reviews' && (
        <div className="space-y-4">
          {/* Dual Filter Controls: Branch Filter and Sentiment Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white whitespace-nowrap">Select Boutique:</span>
              <select
                value={reviewBranchFilter}
                onChange={(e) => setReviewBranchFilter(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="All">All Boutiques ({gbpData.reviews.length} reviews)</option>
                {branchPerformance.map((b) => {
                  const count = gbpData.reviews.filter((r) => r.branchId === b.id).length;
                  return (
                    <option key={b.id} value={b.id}>
                      {b.branchName} ({count > 0 ? `${count} reviews · ${b.averageStarRating > 0 ? `${b.averageStarRating}★` : 'unrated'}` : 'no reviews'})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs self-start sm:self-auto">
              <span className="text-slate-400 text-[11px] mr-1">Sentiment:</span>
              {(['All', 'Positive', 'Neutral', 'Critical'] as const).map((sent) => (
                <button
                  key={sent}
                  onClick={() => setSentimentFilter(sent)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    sentimentFilter === sent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {sent}
                </button>
              ))}
            </div>
          </div>

          {/* Empty State for branches with no reviews */}
          {filteredReviews.length === 0 ? (
            <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <MessageSquare className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">No Reviews Logged Yet</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  {reviewBranchFilter !== 'All'
                    ? `This boutique has 0 customer reviews logged on its Google Business Profile.`
                    : `No reviews match the selected filter criteria.`}
                </p>
              </div>
              {reviewBranchFilter !== 'All' && (
                <div className="inline-block bg-slate-950 border border-slate-800 rounded-lg p-3 text-left max-w-md mx-auto text-xs space-y-1">
                  <span className="text-amber-400 font-semibold block">Strategic Action Plan:</span>
                  <span className="text-slate-300">
                    Deploy counter QR review cards and incentivize in-store staff to request verified customer ratings at checkout.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredReviews.map((rev) => (
                <div key={rev.id} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs transition-colors hover:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white">{rev.author}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-amber-300 border border-slate-700">
                        {rev.branchName}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 text-[11px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-current text-amber-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        rev.sentiment === 'Positive'
                          ? 'bg-emerald-950 text-emerald-400'
                          : rev.sentiment === 'Critical'
                          ? 'bg-rose-950 text-rose-400'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {rev.sentiment}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed italic bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                    "{rev.text}"
                  </p>

                  {rev.responded && rev.replyText && (
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Official Seiko Philippines Response:</span>
                      </span>
                      <p className="text-slate-400">{rev.replyText}</p>
                    </div>
                  )}

                  {!rev.responded && respondingReviewId !== rev.id && (
                    <button
                      onClick={() => handleStartReply(rev.id, rev.author)}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold text-[11px] flex items-center gap-1 pt-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Reply as Official Seiko Philippines</span>
                    </button>
                  )}

                  {respondingReviewId === rev.id && (
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => setRespondingReviewId(null)}
                          className="px-2.5 py-1 text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitReply(rev.id)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded"
                        >
                          Send Official Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
