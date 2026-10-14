import React, { useState } from 'react';
import {
  Zap,
  Radio,
  ArrowRight,
  Filter,
  DollarSign,
  Clock,
  MapPin,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ConversionEvent, AttributionModel } from '../types/marketing';

interface RealTimeConversionsProps {
  conversions: ConversionEvent[];
  isLiveSimulating: boolean;
  setIsLiveSimulating: React.Dispatch<React.SetStateAction<boolean>>;
  attributionModel: AttributionModel;
  setAttributionModel: (model: AttributionModel) => void;
  onAddSimulatedConversion: () => void;
}

export const RealTimeConversions: React.FC<RealTimeConversionsProps> = ({
  conversions,
  isLiveSimulating,
  setIsLiveSimulating,
  attributionModel,
  setAttributionModel,
  onAddSimulatedConversion,
}) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');

  const totalEventValue = conversions.reduce((a, b) => a + b.value, 0);
  const avgOrderValue = conversions.length > 0 ? (totalEventValue / conversions.length).toFixed(0) : '0';

  // Attribution Model Calculations
  const channelAttributionBreakdown = React.useMemo(() => {
    const channelTotals: Record<string, number> = {
      'Google Ads': 0,
      'Meta Ads': 0,
      'TikTok Ads': 0,
      'LinkedIn Ads': 0,
      'Google Local Search': 0,
      'Direct': 0,
    };

    conversions.forEach((conv) => {
      if (attributionModel === 'last-touch') {
        const lastChannel = conv.touchpoints[conv.touchpoints.length - 1];
        if (lastChannel.includes('Google Ads') || lastChannel.includes('PMax')) channelTotals['Google Ads'] += conv.value;
        else if (lastChannel.includes('Meta') || lastChannel.includes('Instagram')) channelTotals['Meta Ads'] += conv.value;
        else if (lastChannel.includes('TikTok')) channelTotals['TikTok Ads'] += conv.value;
        else if (lastChannel.includes('LinkedIn')) channelTotals['LinkedIn Ads'] += conv.value;
        else if (lastChannel.includes('GBP') || lastChannel.includes('Local')) channelTotals['Google Local Search'] += conv.value;
        else channelTotals['Direct'] += conv.value;
      } else if (attributionModel === 'first-touch') {
        const first = conv.touchpoints[0];
        if (first.includes('Google Ads') || first.includes('PMax')) channelTotals['Google Ads'] += conv.value;
        else if (first.includes('Meta') || first.includes('Instagram')) channelTotals['Meta Ads'] += conv.value;
        else if (first.includes('TikTok')) channelTotals['TikTok Ads'] += conv.value;
        else if (first.includes('LinkedIn')) channelTotals['LinkedIn Ads'] += conv.value;
        else if (first.includes('GBP') || first.includes('Local')) channelTotals['Google Local Search'] += conv.value;
        else channelTotals['Direct'] += conv.value;
      } else {
        // Linear / blended split
        const share = conv.value / conv.touchpoints.length;
        conv.touchpoints.forEach((tp) => {
          if (tp.includes('Google Ads') || tp.includes('PMax')) channelTotals['Google Ads'] += share;
          else if (tp.includes('Meta') || tp.includes('Instagram')) channelTotals['Meta Ads'] += share;
          else if (tp.includes('TikTok')) channelTotals['TikTok Ads'] += share;
          else if (tp.includes('LinkedIn')) channelTotals['LinkedIn Ads'] += share;
          else if (tp.includes('GBP') || tp.includes('Local')) channelTotals['Google Local Search'] += share;
          else channelTotals['Direct'] += share;
        });
      }
    });

    return channelTotals;
  }, [conversions, attributionModel]);

  const filteredConversions = conversions.filter((c) => {
    return selectedTypeFilter === 'All' || c.type === selectedTypeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Real-Time Conversion Metrics</span>
            {isLiveSimulating && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            )}
          </h2>
          <p className="text-sm text-slate-400">
            Multi-touch customer journey attribution, instant revenue telemetry, and funnel dropout analysis.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiveSimulating(!isLiveSimulating)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-2 transition-colors ${
              isLiveSimulating
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isLiveSimulating ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span>{isLiveSimulating ? 'Streaming Live Events' : 'Stream Paused'}</span>
          </button>

          <button
            onClick={onAddSimulatedConversion}
            className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-850 rounded-lg transition-colors"
          >
            + Trigger Event
          </button>
        </div>
      </div>

      {/* Attribution Model Switcher & Channel Weights */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <span>Multi-Touch Attribution Engine</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Select how conversion credit and revenue are distributed across customer touchpoints.
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/90 rounded-lg border border-slate-800 text-xs">
            {(['last-touch', 'first-touch', 'linear', 'w-shaped'] as AttributionModel[]).map((model) => (
              <button
                key={model}
                onClick={() => setAttributionModel(model)}
                className={`px-3 py-1.5 rounded font-medium transition-colors whitespace-nowrap shrink-0 ${
                  attributionModel === model
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {model === 'last-touch' && 'Last Touch (Default)'}
                {model === 'first-touch' && 'First Touch'}
                {model === 'linear' && 'Linear Split'}
                {model === 'w-shaped' && 'W-Shaped (40-20-40)'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Channel Revenue Share by Attribution Model */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
          {Object.entries(channelAttributionBreakdown).map(([ch, val]) => {
            const pct = totalEventValue > 0 ? ((val / totalEventValue) * 100).toFixed(1) : '0';
            return (
              <div key={ch} className="bg-slate-950/60 border border-slate-850 rounded-lg p-3">
                <div className="text-[11px] text-slate-400 truncate">{ch}</div>
                <div className="text-base font-bold text-white font-mono tabular-nums mt-1">
                  ₱{Math.round(val).toLocaleString()}
                </div>
                <div className="text-[11px] text-indigo-400 font-mono tabular-nums mt-0.5">
                  {pct}% share
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversion Funnel Analysis */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Real-Time Full-Funnel Conversion Velocity</h3>
        <p className="text-xs text-slate-400 mb-4">
          Drop-off rates from top-of-funnel ad impressions down to revenue-generating conversions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Step 1 */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">01. Impressions</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-1">420,000</div>
              <div className="text-xs text-slate-400 mt-0.5">Cross-channel reach</div>
            </div>
            <div className="text-[11px] text-indigo-400 font-mono tabular-nums mt-3">100% baseline</div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">02. Ad Clicks</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-1">11,400</div>
              <div className="text-xs text-slate-400 mt-0.5">2.71% aggregate CTR</div>
            </div>
            <div className="text-[11px] text-emerald-400 font-mono tabular-nums mt-3">2.71% through-rate</div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">03. Landing Visits</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-1">9,850</div>
              <div className="text-xs text-slate-400 mt-0.5">86.4% page load rate</div>
            </div>
            <div className="text-[11px] text-slate-400 font-mono tabular-nums mt-3">-13.6% bounce drop</div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">04. Qualified Leads / Intent</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-1">1,240</div>
              <div className="text-xs text-slate-400 mt-0.5">12.59% intent rate</div>
            </div>
            <div className="text-[11px] text-emerald-400 font-mono tabular-nums mt-3">+2.1% vs target</div>
          </div>

          {/* Step 5 */}
          <div className="bg-slate-950/70 border border-indigo-900/40 rounded-lg p-3.5 flex flex-col justify-between bg-gradient-to-b from-indigo-950/20 to-transparent">
            <div>
              <div className="text-[11px] text-indigo-400 uppercase tracking-wider font-semibold">05. Closed Conversions</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-1">{conversions.length + 288}</div>
              <div className="text-xs text-slate-400 mt-0.5">23.7% booking close</div>
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold font-mono tabular-nums mt-3">3.82x ROAS</div>
          </div>
        </div>
      </div>

      {/* Real-Time Live Feed Stream */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Live Customer Conversion Stream</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Chronological ledger of real-time client retainers, e-commerce purchases, and strategy call bookings.
            </p>
          </div>

          {/* Filter by Type */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
            {['All', 'Strategy Call Booked', 'E-commerce Purchase', 'Qualified Lead', 'SaaS Subscription'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTypeFilter(t)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  selectedTypeFilter === t
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t === 'All' ? 'All Events' : t.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Live Event Stream Rows */}
        <div className="divide-y divide-slate-800/60 max-h-[460px] overflow-y-auto">
          {filteredConversions.map((conv) => (
            <div
              key={conv.id}
              className="p-4 hover:bg-slate-850/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center shrink-0 text-indigo-400 font-bold font-mono text-[10px]">
                  {conv.value >= 100000 ? '₱300k+' : conv.value >= 50000 ? '₱50k+' : '₱20k+'}
                </div>
                <div>
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <span>{conv.customerName}</span>
                    <span className="text-slate-500 font-normal">·</span>
                    <span className="text-slate-400 font-normal">{conv.customerLocation}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                    <span className="text-indigo-400 font-medium">{conv.type}</span>
                    <span>·</span>
                    <span>Attributed path:</span>
                    {conv.touchpoints.map((tp, idx) => (
                      <React.Fragment key={idx}>
                        <span className="text-slate-300 font-mono">{tp}</span>
                        {idx < conv.touchpoints.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-slate-600 inline" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 font-mono">
                <div className="text-sm font-bold text-emerald-400 tabular-nums">
                  +₱{conv.value.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 tabular-nums">{conv.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
