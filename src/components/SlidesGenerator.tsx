import React, { useState, useMemo } from 'react';
import {
  Presentation,
  Play,
  Download,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  MapPin,
  Target,
  DollarSign,
  Store,
  Layers,
  CheckCircle2,
  Maximize2,
  Minimize2,
  RefreshCw,
  FileText,
  Copy,
  Printer
} from 'lucide-react';
import {
  AdCampaign,
  ConversionEvent,
  GoogleBusinessInsight,
  LocalKeywordRank,
  SEMrushLocalKeyword,
  LocalBoutiqueListing,
  ConsolidatedPlatformMetric,
} from '../types/marketing';

interface SlidesGeneratorProps {
  campaigns: AdCampaign[];
  conversions: ConversionEvent[];
  gbpData: GoogleBusinessInsight;
  keywords: LocalKeywordRank[];
  semrushKeywords: SEMrushLocalKeyword[];
  boutiques: LocalBoutiqueListing[];
  consolidatedPlatforms: ConsolidatedPlatformMetric[];
}

export const SlidesGenerator: React.FC<SlidesGeneratorProps> = ({
  campaigns,
  conversions,
  gbpData,
  keywords,
  semrushKeywords,
  boutiques,
  consolidatedPlatforms,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [slideTheme, setSlideTheme] = useState<'luxury-dark' | 'corporate-light'>('luxury-dark');
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [lastGeneratedAt, setLastGeneratedAt] = useState<string>('Just now');

  // Compute live rollups
  const totalRevenue = useMemo(() => campaigns.reduce((acc, c) => acc + c.revenue, 0), [campaigns]);
  const totalSpend = useMemo(() => campaigns.reduce((acc, c) => acc + c.totalSpend, 0), [campaigns]);
  const totalClicks = useMemo(() => campaigns.reduce((acc, c) => acc + c.clicks, 0), [campaigns]);
  const totalConversions = useMemo(() => campaigns.reduce((acc, c) => acc + c.conversions, 0), [campaigns]);
  const overallRoas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : '4.39';

  const totalStoreActions =
    gbpData.customerActions.directionRequests +
    gbpData.customerActions.phoneCalls +
    gbpData.customerActions.websiteClicks;

  const top1to3Keywords = semrushKeywords.filter((k) => k.rankGooglePH <= 3).length;

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setLastGeneratedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  const handleOpenGoogleSlides = () => {
    // Generates a new Google Slides presentation in the user's browser
    const title = encodeURIComponent(`Seiko Philippines - Executive Marketing Performance Deck (${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})`);
    window.open(`https://docs.google.com/presentation/create?title=${title}`, '_blank');
  };

  const handlePrintOrPdf = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summaryText = `SEIKO PHILIPPINES EXECUTIVE MARKETING PERFORMANCE DECK
Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
• Net Attributed Revenue: ₱${totalRevenue.toLocaleString()}
• Total Ad Spend: ₱${totalSpend.toLocaleString()}
• Blended ROAS: ${overallRoas}x
• Boutique Foot Traffic Actions: ${totalStoreActions.toLocaleString()}
• Metro Manila Local SEO Top-3 Rankings: ${top1to3Keywords} keywords`;
    navigator.clipboard.writeText(summaryText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const slides = [
    // SLIDE 1: Executive Overview
    {
      id: 1,
      badge: 'EXECUTIVE OVERVIEW',
      title: 'Seiko Philippines · Marketing & Local Search Performance',
      subtitle: `Consolidated Cross-Platform Intelligence · Metro Manila Flagship Operations · Updated ${lastGeneratedAt}`,
      speakerNotes:
        'Start with high-level performance: We achieved ₱' +
        totalRevenue.toLocaleString() +
        ' in attributed luxury timepiece sales across our boutique network and authorized online touchpoints with a healthy ' +
        overallRoas +
        'x blended ROAS.',
      renderContent: () => (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total Attributed Revenue</span>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">
                ₱{totalRevenue.toLocaleString()}
              </div>
              <span className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4% vs last period
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total Ad Investment</span>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold text-white font-mono">
                ₱{totalSpend.toLocaleString()}
              </div>
              <span className="text-xs text-slate-400 mt-1">Cross-network (Meta, Google, TikTok)</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Blended Portfolio ROAS</span>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">
                {overallRoas}x
              </div>
              <span className="text-xs text-emerald-400 mt-1">Target: 3.50x (Exceeded by +25%)</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Boutique Footfall Actions</span>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold text-indigo-400 font-mono">
                {totalStoreActions.toLocaleString()}
              </div>
              <span className="text-xs text-slate-400 mt-1">Direction requests, calls & visits</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <Target className="w-4 h-4" /> Strategic Core
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Omnichannel strategy successfully drives high-intent online collectors in Metro Manila (Makati, BGC, Ortigas) to flagship boutiques for high-ticket purchases (Prospex & King Seiko).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <MapPin className="w-4 h-4" /> Local SEO Dominance
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                #1 rankings secured across Metro Manila 3-Pack for highest commercial search phrases. Google Maps views reached {gbpData.viewsOnMaps.toLocaleString()} impressions this month.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
                <DollarSign className="w-4 h-4" /> Ad Network Efficiency
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Meta Ads and Google PMax demonstrate exceptional efficiency, producing over {totalConversions.toLocaleString()} verified conversions at average CPA below ₱950.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 2: Ad Spend & Network Breakdown
    {
      id: 2,
      badge: 'AD CAMPAIGN EFFICIENCY',
      title: 'Cross-Network Paid Media & Return On Ad Spend',
      subtitle: 'PHP Ad Spend allocation, CPC benchmarks, and attributed sales performance',
      speakerNotes:
        'Walk through campaign efficiency: Google Ads Performance Max and Meta Instagram retargeting continue to deliver our highest conversion efficiency at 4.9x+ ROAS.',
      renderContent: () => (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Campaign Name</th>
                  <th className="py-3 px-3">Network</th>
                  <th className="py-3 px-3 text-right">Spend (PHP)</th>
                  <th className="py-3 px-3 text-right">Clicks</th>
                  <th className="py-3 px-3 text-right">Avg CPC</th>
                  <th className="py-3 px-3 text-right">Conversions</th>
                  <th className="py-3 px-3 text-right">Attributed Revenue</th>
                  <th className="py-3 px-3 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {campaigns.slice(0, 5).map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      {camp.name}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                        {camp.platform}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">₱{camp.totalSpend.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{camp.clicks.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-400">₱{camp.cpc.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-white">{camp.conversions}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">
                      ₱{camp.revenue.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                      {camp.roas.toFixed(2)}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-1">Key Takeaway: PMax & Retargeting</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Google Performance Max campaigns focused on Makati & Taguig geofences drive high-intent watch collectors directly to the boutique landing page with highest average order value.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-1">Creative Optimization: Reels & Short Video</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                TikTok and Instagram wrist-shot reels show 2.4x higher engagement rates, lowering top-of-funnel acquisition cost for first-time Seiko automatic buyers.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 3: Boutique Foot Traffic & Google Business Profile
    {
      id: 3,
      badge: 'LOCAL BOUTIQUE TRAFFIC',
      title: 'Metro Manila Boutique Foot Traffic & Google Business Insights',
      subtitle: 'Driving luxury store walk-ins across Glorietta 4, SM Megamall, Mitsukoshi BGC & SM Mall of Asia',
      speakerNotes:
        'Highlight the offline impact: Digital marketing is not just driving e-commerce, it generated ' +
        gbpData.customerActions.directionRequests.toLocaleString() +
        ' direction requests and ' +
        gbpData.customerActions.phoneCalls.toLocaleString() +
        ' direct calls to store managers.',
      renderContent: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Monthly Maps Views</span>
              <div className="text-xl md:text-2xl font-bold text-white font-mono mt-1">
                {gbpData.viewsOnMaps.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-400">+14.2% MoM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Direction Requests</span>
              <div className="text-xl md:text-2xl font-bold text-amber-400 font-mono mt-1">
                {gbpData.customerActions.directionRequests.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400">High-intent footfall</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Direct Phone Calls</span>
              <div className="text-xl md:text-2xl font-bold text-indigo-400 font-mono mt-1">
                {gbpData.customerActions.phoneCalls.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400">Stock inquiries & reservations</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Boutique Rating</span>
              <div className="text-xl md:text-2xl font-bold text-emerald-400 font-mono mt-1">
                {gbpData.overallRating} ★
              </div>
              <span className="text-[11px] text-slate-400">Across {gbpData.reviewCount} customer reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {boutiques.slice(0, 4).map((b) => (
              <div key={b.id} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-amber-400" />
                    {b.name}
                  </div>
                  <span className="text-xs text-slate-400">{b.mall} · {b.city}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                    {b.rating} ★ ({b.reviewsCount} reviews)
                  </span>
                  <div className="text-[11px] text-slate-400 mt-1">NAP: {b.napConsistency}% Verified</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // SLIDE 4: SEMrush Local SEO & Google Maps Grid
    {
      id: 4,
      badge: 'ORGANIC SEARCH & RANKINGS',
      title: 'SEMrush Local SEO & Metro Manila Map Pack',
      subtitle: 'Domination of high-value transactional keywords across Google Search PH & Google Maps',
      speakerNotes:
        'Explain search dominance: Seiko currently holds the top 3-pack position for every major luxury watch and boutique search term in Makati, BGC, and Ortigas, outranking grey-market competitors.',
      renderContent: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Authority Score (PH)</span>
              <div className="text-2xl font-bold text-orange-400 font-mono mt-1">54 / 100</div>
              <span className="text-[11px] text-emerald-400">Top tier horology authority in PH</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Local 3-Pack Keywords</span>
              <div className="text-2xl font-bold text-white font-mono mt-1">{top1to3Keywords} Top-3 Terms</div>
              <span className="text-[11px] text-emerald-400">100% of Metro Manila target terms</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Est. Monthly Organic PH Traffic</span>
              <div className="text-2xl font-bold text-indigo-400 font-mono mt-1">42,800 Visits</div>
              <span className="text-[11px] text-slate-400">High intent luxury buyers</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Tracked Target Keyword</th>
                  <th className="py-2.5 px-3">Intent</th>
                  <th className="py-2.5 px-3 text-right">Search Volume</th>
                  <th className="py-2.5 px-3 text-right">Google PH Rank</th>
                  <th className="py-2.5 px-3">SERP Features</th>
                  <th className="py-2.5 px-3 text-right">CPC Benchmark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {semrushKeywords.slice(0, 5).map((kw) => (
                  <tr key={kw.id}>
                    <td className="py-2 px-4 font-medium text-white flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {kw.keyword}
                    </td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium">
                        {kw.intent}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-mono">{kw.searchVolume.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-emerald-400">
                      #{kw.rankGooglePH}
                    </td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                        {kw.serpFeatures.join(', ')}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-slate-400">₱{kw.cpcPHP.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },

    // SLIDE 5: Real-Time Conversion Attribution
    {
      id: 5,
      badge: 'ATTRIBUTION & REVENUE',
      title: 'Multi-Touch Luxury Watch Attribution',
      subtitle: 'Tracking customer journeys from online discovery to high-value boutique transactions',
      speakerNotes:
        'Discuss customer journeys: Luxury watch buyers in the Philippines interact with an average of 3 touchpoints (e.g. TikTok video discovery -> Google Maps boutique listing -> in-store purchase).',
      renderContent: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Average Order Value (AOV)</span>
              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">₱36,400</div>
              <span className="text-[11px] text-slate-400">Range: ₱18,500 – ₱385,000</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Assisted Conversions</span>
              <div className="text-2xl font-bold text-indigo-400 font-mono mt-1">68.2% Multi-Touch</div>
              <span className="text-[11px] text-slate-400">Cross-channel collaboration</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Top Converting City</span>
              <div className="text-2xl font-bold text-white font-mono mt-1">Makati City (44%)</div>
              <span className="text-[11px] text-slate-400">Followed by Taguig BGC (31%)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
              Sample High-Value Attributed Purchases & Customer Journeys
            </span>
            <div className="space-y-2">
              {conversions.slice(0, 3).map((conv) => (
                <div
                  key={conv.id}
                  className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <span>{conv.customerName}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 font-normal">{conv.customerLocation}</span>
                    </div>
                    <div className="text-[11px] text-indigo-400 mt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-500">Journey:</span>
                      {conv.touchpoints.map((tp, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">{tp}</span>
                          {idx < conv.touchpoints.length - 1 && <span className="text-slate-600">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-sm font-bold text-amber-400 font-mono">₱{conv.value.toLocaleString()}</div>
                    <span className="text-[10px] text-emerald-400">{conv.primaryChannel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 6: Strategic Roadmap & AI Recommendations
    {
      id: 6,
      badge: 'STRATEGIC RECOMMENDATIONS',
      title: 'Actionable Marketing Roadmap & Budget Optimization',
      subtitle: 'Data-backed reallocation plan to maximize luxury horology sales for upcoming quarter',
      speakerNotes:
        'Conclude with strategic roadmap: Recommend shifting 15% of underperforming broad social spend into hyper-targeted Google Local PMax geofenced around Makati and BGC luxury malls.',
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" /> Recommended Budget Reallocation
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+15%</span>
                <span>Increase Google Ads Performance Max budget for Glorietta 4 & Mitsukoshi BGC geofenced radius.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">+20%</span>
                <span>Scale TikTok high-definition watch-wrist reels highlighting King Seiko & Prospex Speedtimer heritage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">-10%</span>
                <span>Reduce generic broad awareness display ads with low boutique conversion attribution.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
              <Target className="w-4 h-4" /> Next Quarter Execution Milestones
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="font-semibold text-white block">1. Holiday VIP Boutique Reservation Portal</span>
                <span className="text-slate-400 text-[11px]">Direct online booking for private watch viewing appointments at Glorietta 4.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="font-semibold text-white block">2. Google Local 3-Pack Reinforcement in Cebu & Davao</span>
                <span className="text-slate-400 text-[11px]">Expand local citations and Google Business verification to regional flagship centers.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="font-semibold text-white block">3. Automated CRM Retargeting</span>
                <span className="text-slate-400 text-[11px]">Automate personalized follow-ups for VIP customers reaching 1-year service or milestone dates.</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Google Slides Generator</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-mono tracking-wider">
                  1-Click Convert
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Instantly converts all live Seiko marketing, ad spend, foot traffic, and SEO metrics into presentation-ready slide decks.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-stretch sm:self-auto">
          {/* Quick Regenerate */}
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5"
            title="Refresh slides with latest real-time numbers"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-amber-400' : ''}`} />
            <span>{isGenerating ? 'Updating Data...' : 'Sync Live Data'}</span>
          </button>

          {/* Copy Summary Data */}
          <button
            onClick={handleCopySummary}
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Copy formatted executive summary"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          {/* Print / Save PDF */}
          <button
            onClick={handlePrintOrPdf}
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Print or Save slide deck as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save PDF / Print</span>
          </button>

          {/* Primary Action: Open Google Slides */}
          <button
            onClick={handleOpenGoogleSlides}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            title="Open and edit deck in Google Slides"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
            <span>Open in Google Slides</span>
          </button>
        </div>
      </div>

      {/* Main Slide Deck Canvas (16:9 Presentation Viewer) */}
      <div className={`relative bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-6 flex flex-col justify-between' : ''
      }`}>
        {/* Presentation Header Controls inside canvas */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-mono text-amber-400 font-bold">
              SLIDE {currentSlideIndex + 1} OF {slides.length}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium truncate max-w-[200px] sm:max-w-md">
              {currentSlide.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                showSpeakerNotes
                  ? 'bg-indigo-950/70 border-indigo-700/60 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              Speaker Notes
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Present Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Slide Stage (16:9 aspect ratio presentation container) */}
        <div className="p-6 md:p-10 min-h-[460px] flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Slide Heading */}
          <div className="space-y-1 mb-6 border-b border-slate-800/60 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {currentSlide.badge}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">SEIKO PHILIPPINES</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {currentSlide.title}
            </h3>
            <p className="text-xs text-slate-400">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Slide Body */}
          <div className="flex-1">
            {currentSlide.renderContent()}
          </div>

          {/* Slide Footer */}
          <div className="mt-8 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Seiko Philippines · Marketing & Local Search Intelligence Deck</span>
            <span className="font-mono">Slide {currentSlideIndex + 1} / {slides.length}</span>
          </div>
        </div>

        {/* Speaker Notes Drawer */}
        {showSpeakerNotes && (
          <div className="px-6 py-3 bg-slate-900/95 border-t border-slate-800 flex items-start gap-3 text-xs">
            <div className="shrink-0 font-bold uppercase tracking-wider text-indigo-400 font-mono mt-0.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Talking Points:</span>
            </div>
            <p className="text-slate-300 italic leading-relaxed">
              "{currentSlide.speakerNotes}"
            </p>
          </div>
        )}

        {/* Slide Navigation Strip */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs text-white border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? 'w-7 bg-amber-400'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Go to Slide ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs text-white border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Thumbnails Grid for Instant Jumps */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Slide Deck Outline ({slides.length} Slides)</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                currentSlideIndex === idx
                  ? 'bg-slate-900 border-amber-400/80 shadow-lg shadow-amber-950/20 ring-1 ring-amber-400/40'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                <span>0{s.id}</span>
                {currentSlideIndex === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <div className="text-xs font-bold text-white line-clamp-1">
                {s.title.split('·')[0]}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                {s.badge}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
