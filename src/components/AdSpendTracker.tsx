import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Sliders,
  DollarSign,
  Play,
  Pause,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { AdCampaign, AdPlatform } from '../types/marketing';

interface AdSpendTrackerProps {
  campaigns: AdCampaign[];
  onToggleStatus: (id: string) => void;
  onUpdateDailyBudget: (id: string, newBudget: number) => void;
  onOpenNewCampaign: () => void;
}

export const AdSpendTracker: React.FC<AdSpendTrackerProps> = ({
  campaigns,
  onToggleStatus,
  onUpdateDailyBudget,
  onOpenNewCampaign,
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
  const [tempBudget, setTempBudget] = useState<number>(0);

  // Platform aggregations
  const platforms: AdPlatform[] = ['Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'YouTube Ads'];

  const platformSummaries = platforms.map((plat) => {
    const list = campaigns.filter((c) => c.platform === plat);
    const spend = list.reduce((a, b) => a + b.totalSpend, 0);
    const revenue = list.reduce((a, b) => a + b.revenue, 0);
    const clicks = list.reduce((a, b) => a + b.clicks, 0);
    const impressions = list.reduce((a, b) => a + b.impressions, 0);
    const conversions = list.reduce((a, b) => a + b.conversions, 0);
    const roas = spend > 0 ? (revenue / spend) : 0;
    const cpa = conversions > 0 ? (spend / conversions) : 0;
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

    const color =
      plat === 'Google Ads'
        ? 'border-blue-500/30 text-blue-400'
        : plat === 'Meta Ads'
        ? 'border-indigo-500/30 text-indigo-400'
        : plat === 'TikTok Ads'
        ? 'border-cyan-500/30 text-cyan-400'
        : plat === 'LinkedIn Ads'
        ? 'border-sky-500/30 text-sky-400'
        : 'border-rose-500/30 text-rose-400';

    return {
      platform: plat,
      campaignCount: list.length,
      spend,
      revenue,
      roas,
      cpa,
      ctr,
      clicks,
      conversions,
      color,
    };
  });

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesPlatform = platformFilter === 'All' || c.platform === platformFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const totalFilteredSpend = filteredCampaigns.reduce((a, b) => a + b.totalSpend, 0);
  const totalFilteredRevenue = filteredCampaigns.reduce((a, b) => a + b.revenue, 0);
  const totalFilteredConversions = filteredCampaigns.reduce((a, b) => a + b.conversions, 0);

  const startEditBudget = (camp: AdCampaign) => {
    setEditingBudgetId(camp.id);
    setTempBudget(camp.dailyBudget);
  };

  const saveEditBudget = (id: string) => {
    onUpdateDailyBudget(id, Math.max(5, tempBudget));
    setEditingBudgetId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Cross-Platform Ad Spend</h2>
          <p className="text-sm text-slate-400">
            Real-time multi-channel spend pacing, blended ROAS attribution, and daily budget controls.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewCampaign}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            Launch Campaign
          </button>
        </div>
      </div>

      {/* Platform Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {platformSummaries.map((ps) => (
          <div
            key={ps.platform}
            className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-200">{ps.platform}</span>
                <span className="text-[11px] text-slate-500 font-mono tabular-nums">{ps.campaignCount} active</span>
              </div>
              <div className="text-lg font-bold text-white tabular-nums font-mono">
                ₱{ps.spend.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Rev: <span className="text-slate-200 font-mono tabular-nums">₱{ps.revenue.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">ROAS</div>
                <div
                  className={`font-bold font-mono tabular-nums ${
                    ps.roas >= 3.5 ? 'text-emerald-400' : ps.roas >= 2.0 ? 'text-amber-400' : 'text-slate-300'
                  }`}
                >
                  {ps.roas.toFixed(2)}x
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">CPA</div>
                <div className="font-semibold text-slate-300 font-mono tabular-nums">
                  ₱{ps.cpa.toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Spend Distribution vs Revenue Bar Chart */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Spend vs. Revenue Attribution by Channel</h3>
            <span className="text-xs text-slate-400">
              Filtered Total: ₱{totalFilteredSpend.toLocaleString()} spend generated ₱{totalFilteredRevenue.toLocaleString()} revenue
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> Spend
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Revenue
            </span>
          </div>
        </div>

        {/* SVG Comparative Chart */}
        <div className="space-y-3 pt-2">
          {platformSummaries.map((ps) => {
            const maxVal = Math.max(...platformSummaries.map((p) => p.revenue), 1);
            const spendPct = Math.round((ps.spend / maxVal) * 100);
            const revPct = Math.round((ps.revenue / maxVal) * 100);

            return (
              <div key={ps.platform} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300 w-28 shrink-0">{ps.platform}</span>
                  <div className="flex items-center gap-4 text-slate-400 font-mono tabular-nums">
                    <span>Spend: ₱{ps.spend.toLocaleString()}</span>
                    <span className="text-white font-medium">Rev: ₱{ps.revenue.toLocaleString()}</span>
                    <span className={ps.roas >= 3.5 ? 'text-emerald-400' : 'text-amber-400'}>
                      {ps.roas.toFixed(2)}x
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-slate-850 rounded flex gap-1 overflow-hidden">
                  <div
                    className="bg-indigo-600/90 h-full rounded-sm transition-all duration-300"
                    style={{ width: `${Math.max(4, spendPct)}%` }}
                    title={`Spend: ₱${ps.spend}`}
                  />
                  <div
                    className="bg-emerald-500/90 h-full rounded-sm transition-all duration-300"
                    style={{ width: `${Math.max(4, revPct)}%` }}
                    title={`Revenue: ₱${ps.revenue}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campaigns Table & Filter Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
        {/* Filter Controls (Functional Segmented Buttons & Search) */}
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {/* Platform filter tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
              {['All', 'Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads'].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setPlatformFilter(plat)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                    platformFilter === plat
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {plat === 'All' ? 'All Channels' : plat.replace(' Ads', '')}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
              {['All', 'Active', 'Paused'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                    statusFilter === st
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* High-Density Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400">
                <th className="py-3 px-4 font-semibold">Campaign Name</th>
                <th className="py-3 px-3 font-semibold">Platform</th>
                <th className="py-3 px-3 font-semibold text-center">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Daily Budget</th>
                <th className="py-3 px-3 font-semibold text-right">Spend</th>
                <th className="py-3 px-3 font-semibold text-right">Clicks</th>
                <th className="py-3 px-3 font-semibold text-right">CTR</th>
                <th className="py-3 px-3 font-semibold text-right">Conv.</th>
                <th className="py-3 px-3 font-semibold text-right">ROAS</th>
                <th className="py-3 px-3 font-semibold text-right">CPA</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-500">
                    No matching campaigns found. Try adjusting your platform or search filter.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-850/40 transition-colors">
                    {/* Campaign Name */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{camp.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{camp.objective}</span>
                        <span>·</span>
                        <span>Updated {camp.updatedAt}</span>
                      </div>
                    </td>

                    {/* Platform */}
                    <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                      {camp.platform}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onToggleStatus(camp.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                          camp.status === 'Active'
                            ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 hover:bg-emerald-900/60'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                        title="Click to toggle status"
                      >
                        {camp.status === 'Active' ? <Play className="w-2.5 h-2.5 fill-current" /> : <Pause className="w-2.5 h-2.5" />}
                        <span>{camp.status}</span>
                      </button>
                    </td>

                    {/* Daily Budget */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-200">
                      {editingBudgetId === camp.id ? (
                        <div className="inline-flex items-center gap-1">
                          <input
                            type="number"
                            value={tempBudget}
                            onChange={(e) => setTempBudget(Number(e.target.value))}
                            className="w-16 px-1.5 py-0.5 bg-slate-950 border border-indigo-500 rounded text-right text-xs text-white"
                            autoFocus
                          />
                          <button
                            onClick={() => saveEditBudget(camp.id)}
                            className="text-[10px] bg-indigo-600 px-1.5 py-0.5 rounded text-white"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditBudget(camp)}
                          className="hover:text-indigo-400 hover:underline"
                          title="Click to edit daily budget"
                        >
                          ₱{camp.dailyBudget.toLocaleString()}/day
                        </button>
                      )}
                    </td>

                    {/* Total Spend */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-100 font-medium">
                      ₱{camp.totalSpend.toLocaleString()}
                    </td>

                    {/* Clicks */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                      {camp.clicks.toLocaleString()}
                    </td>

                    {/* CTR */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                      {camp.ctr.toFixed(2)}%
                    </td>

                    {/* Conversions */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-200 font-medium">
                      {camp.conversions}
                    </td>

                    {/* ROAS */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums">
                      <span
                        className={`font-semibold ${
                          camp.roas >= 4.0
                            ? 'text-emerald-400'
                            : camp.roas >= 2.5
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {camp.roas.toFixed(2)}x
                      </span>
                    </td>

                    {/* CPA */}
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                      ₱{camp.cpa.toFixed(0)}
                    </td>

                    {/* Inline Quick Action */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => startEditBudget(camp)}
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                        title="Adjust Budget"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
