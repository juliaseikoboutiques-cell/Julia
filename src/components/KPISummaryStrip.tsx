import React from 'react';
import { DollarSign, TrendingUp, Target, Users, MapPin, Zap } from 'lucide-react';
import { AdCampaign, ConversionEvent, GoogleBusinessInsight } from '../types/marketing';

interface KPISummaryStripProps {
  campaigns: AdCampaign[];
  conversions: ConversionEvent[];
  gbpData: GoogleBusinessInsight;
  monthlyBudget?: number;
}

export const KPISummaryStrip: React.FC<KPISummaryStripProps> = ({
  campaigns,
  conversions,
  gbpData,
  monthlyBudget = 1000000, // ₱1.0M PHP monthly budget
}) => {
  const totalSpend = campaigns.reduce((acc, c) => acc + c.totalSpend, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
  const totalCampaignConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const totalEventsCount = conversions.length + totalCampaignConversions;
  const blendedRoas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : '0.00';
  const blendedCac = totalCampaignConversions > 0 ? (totalSpend / totalCampaignConversions).toFixed(0) : '0';
  const pacingPct = Math.min(100, Math.round((totalSpend / monthlyBudget) * 100));

  const totalLocalActions =
    gbpData.customerActions.websiteClicks +
    gbpData.customerActions.directionRequests +
    gbpData.customerActions.phoneCalls +
    gbpData.customerActions.bookings;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Blended ROAS */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">Blended ROAS</span>
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white tabular-nums font-mono">
            {blendedRoas}x
          </span>
          <span className="text-xs text-emerald-400 font-medium tabular-nums font-mono">+0.48x</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Seiko PH target: 3.80x</div>
      </div>

      {/* 2. Total Ad Spend */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">Ad Spend (PHP)</span>
          <span className="text-indigo-400 font-bold font-mono text-xs">₱</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white tabular-nums font-mono">
            ₱{(totalSpend / 1000).toFixed(0)}k
          </span>
          <span className="text-xs text-slate-400 tabular-nums font-mono">{pacingPct}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1 mt-1.5 overflow-hidden">
          <div
            className="bg-indigo-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${pacingPct}%` }}
          />
        </div>
      </div>

      {/* 3. Attributed Revenue */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">Attributed Revenue</span>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white tabular-nums font-mono">
            ₱{(totalRevenue / 1000000).toFixed(2)}M
          </span>
          <span className="text-xs text-emerald-400 font-medium tabular-nums font-mono">+24.2%</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">E-Commerce & Boutiques</div>
      </div>

      {/* 4. Blended CPA */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">Blended CPA</span>
          <Target className="w-3.5 h-3.5 text-sky-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white tabular-nums font-mono">
            ₱{Number(blendedCac).toLocaleString()}
          </span>
          <span className="text-xs text-emerald-400 font-medium tabular-nums font-mono">-₱85</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Cost per watch buyer / lead</div>
      </div>

      {/* 5. Total Conversions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">Conversions</span>
          <Users className="w-3.5 h-3.5 text-purple-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white tabular-nums font-mono">
            {totalEventsCount.toLocaleString()}
          </span>
          <span className="text-xs text-emerald-400 font-medium tabular-nums font-mono">+38 MoM</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Orders & VIP bookings</div>
      </div>

      {/* 6. Google Business Flagship Actions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-medium">Glorietta 4 Actions</span>
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white tabular-nums font-mono">
            {totalLocalActions.toLocaleString()}
          </span>
          <span className="text-xs text-emerald-400 font-medium tabular-nums font-mono">4.9★</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">Boutique visits & calls</div>
      </div>
    </div>
  );
};
