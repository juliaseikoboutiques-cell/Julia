import React, { useState } from 'react';
import {
  MapPin,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Compass,
  Building,
  Target,
  Sparkles,
  Layers,
} from 'lucide-react';
import { LocalKeywordRank, GeoGridPoint } from '../types/marketing';

interface LocalSearchRankGridProps {
  keywordDataList: LocalKeywordRank[];
  onTriggerScan?: (keywordId: string) => void;
}

export const LocalSearchRankGrid: React.FC<LocalSearchRankGridProps> = ({
  keywordDataList,
  onTriggerScan,
}) => {
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>(keywordDataList[0]?.id || '');
  const [selectedPoint, setSelectedPoint] = useState<GeoGridPoint | null>(
    keywordDataList[0]?.gridPoints[12] || null // Center HQ point
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [customKeywordInput, setCustomKeywordInput] = useState<string>('');
  const [keywords, setKeywords] = useState<LocalKeywordRank[]>(keywordDataList);

  const currentKeyword = keywords.find((k) => k.id === selectedKeywordId) || keywords[0];

  const handleScanNow = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Simulate minor rank improvement / fresh refresh
      setKeywords((prev) =>
        prev.map((k) => {
          if (k.id !== currentKeyword.id) return k;
          return {
            ...k,
            averageRank: Number((Math.max(1.2, k.averageRank - 0.08)).toFixed(2)),
            top3PackPct: Math.min(96, k.top3PackPct + 4),
          };
        })
      );
    }, 1200);
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customKeywordInput.trim()) return;

    const newKw: LocalKeywordRank = {
      id: `kw-${Date.now()}`,
      keyword: customKeywordInput.trim().toLowerCase(),
      averageRank: 2.45,
      top3PackPct: 72,
      searchVolume: 1850,
      competitors: [
        { name: 'Seiko Boutique Glorietta 4 (Official Flagship)', shareOfVoice: 58.5, avgRank: 1.25 },
        { name: 'Lucerne Greenbelt 5 (Authorized)', shareOfVoice: 22.0, avgRank: 2.80 },
        { name: 'Chronos SM Megamall', shareOfVoice: 12.0, avgRank: 4.50 },
      ],
      gridPoints: currentKeyword.gridPoints.map((pt) => ({
        ...pt,
        rank: Math.min(9, Math.max(1, pt.rank + (Math.random() > 0.5 ? 1 : -1))),
      })),
    };

    setKeywords([newKw, ...keywords]);
    setSelectedKeywordId(newKw.id);
    setSelectedPoint(newKw.gridPoints[12]);
    setCustomKeywordInput('');
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) {
      return 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm shadow-emerald-500/30 border-emerald-400';
    }
    if (rank <= 7) {
      return 'bg-amber-500 text-slate-950 font-bold border-amber-400';
    }
    return 'bg-slate-800 text-slate-300 font-medium border-slate-700';
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Query Selection */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Local Search Geo-Grid Rank Tracker</span>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/80 text-indigo-400 font-mono">
              Metro Manila · Glorietta 4 Flagship Center
            </span>
          </h2>
          <p className="text-sm text-slate-400">
            Pinpoint Local 3-Pack rankings across key shopping districts and boutique hubs in Metro Manila.
          </p>
        </div>

        {/* Scan & Keyword Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleAddKeyword} className="flex items-center gap-1.5">
            <input
              type="text"
              placeholder="+ Track target query..."
              value={customKeywordInput}
              onChange={(e) => setCustomKeywordInput(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 text-xs font-semibold bg-slate-900 border border-slate-800 hover:bg-slate-850 rounded-lg text-slate-200 transition-colors"
            >
              Add
            </button>
          </form>

          <button
            onClick={handleScanNow}
            disabled={isScanning}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Grid...' : 'Run Fresh Scan'}</span>
          </button>
        </div>
      </div>

      {/* Target Keyword Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {keywords.map((kw) => (
          <button
            key={kw.id}
            onClick={() => {
              setSelectedKeywordId(kw.id);
              setSelectedPoint(kw.gridPoints[12]);
            }}
            className={`px-3 py-2 rounded-lg border transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              selectedKeywordId === kw.id
                ? 'bg-slate-900 border-indigo-500/80 text-white font-semibold'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-3 h-3 text-slate-500" />
            <span>{kw.keyword}</span>
            <span className="font-mono text-[11px] text-emerald-400 tabular-nums">
              Avg #{kw.averageRank.toFixed(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Metric Callouts for Current Keyword */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5">
          <div className="text-xs text-slate-400">Average Grid Rank (AGR)</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
            #{currentKeyword.averageRank.toFixed(2)}
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Top 1% in Metro Manila</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5">
          <div className="text-xs text-slate-400">Local 3-Pack Presence</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-1">
            {currentKeyword.top3PackPct}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Pins in Positions #1–#3</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5">
          <div className="text-xs text-slate-400">Monthly Local Search Volume</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
            {currentKeyword.searchVolume.toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-400 mt-0.5">Estimated PH searches</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5">
          <div className="text-xs text-slate-400">Local Share of Voice (SOV)</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
            {currentKeyword.competitors[0]?.shareOfVoice || 54.0}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Market leader position</div>
        </div>
      </div>

      {/* Interactive Geo-Grid Map Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* The 5x5 Geo Matrix Map */}
        <div className="lg:col-span-8 bg-slate-900/70 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Geographic Map View (Metro Manila)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any coordinate node to inspect hyper-local rankings and primary boutique competitors.
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> #1–#3 (3-Pack)
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> #4–#7
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> #8+
              </span>
            </div>
          </div>

          {/* Map canvas container */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-950 rounded-lg border border-slate-800/80 overflow-hidden p-6 flex flex-col justify-between">
            {/* Subtle background street grid lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />
              {/* Pasig River / Metro Manila waterway representation line */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 0 160 Q 200 190, 400 170 T 800 210"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  opacity="0.4"
                />
              </svg>
            </div>

            {/* 5x5 Geo-Grid Matrix */}
            <div className="relative z-10 w-full h-full grid grid-rows-5 gap-3">
              {[0, 1, 2, 3, 4].map((rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-5 gap-3">
                  {[0, 1, 2, 3, 4].map((colIdx) => {
                    const pt = currentKeyword.gridPoints.find((p) => p.row === rowIdx && p.col === colIdx);
                    if (!pt) return <div key={colIdx} />;
                    const isSelected = selectedPoint?.id === pt.id;
                    const isCenter = pt.row === 2 && pt.col === 2;

                    return (
                      <button
                        key={pt.id}
                        onClick={() => setSelectedPoint(pt)}
                        className={`group relative flex flex-col items-center justify-center rounded-lg border transition-all duration-200 ${
                          isSelected
                            ? 'ring-2 ring-indigo-400 scale-105 z-20'
                            : 'hover:scale-102 hover:border-slate-600'
                        }`}
                        title={`${pt.addressLabel} (Rank #${pt.rank})`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono border ${getRankColor(
                            pt.rank
                          )}`}
                        >
                          {pt.rank}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 truncate max-w-full px-1">
                          {isCenter ? '★ HQ' : pt.addressLabel.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Point Detail Drawer */}
        <div className="lg:col-span-4 space-y-4">
          {selectedPoint ? (
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-indigo-400 font-mono uppercase tracking-wider">Node Details</div>
                  <h4 className="text-base font-bold text-white mt-0.5">{selectedPoint.addressLabel}</h4>
                  <div className="text-xs text-slate-400 font-mono tabular-nums mt-0.5">
                    {selectedPoint.distanceKm === 0 ? 'Business HQ Location' : `${selectedPoint.distanceKm} km from center`}
                  </div>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-lg text-sm font-mono border ${getRankColor(
                    selectedPoint.rank
                  )}`}
                >
                  Rank #{selectedPoint.rank}
                </div>
              </div>

              <div className="space-y-2 text-xs pt-3 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Coordinates:</span>
                  <span className="text-slate-200 font-mono tabular-nums">
                    {selectedPoint.lat.toFixed(4)}° N, {selectedPoint.lng.toFixed(4)}° E
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Local 3-Pack Status:</span>
                  <span className={selectedPoint.rank <= 3 ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                    {selectedPoint.rank <= 3 ? 'Dominating (#1-3 Pack)' : 'Below 3-Pack Cutoff'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Top Competitor at Point:</span>
                  <span className="text-slate-200 font-medium">{selectedPoint.topCompetitor}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-300">
                <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>Geo-Specific Action Recommendation</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {selectedPoint.rank <= 3
                    ? `Maintain authority in ${selectedPoint.addressLabel} with monthly photo updates and localized reviews.`
                    : `To overtake ${selectedPoint.topCompetitor} in ${selectedPoint.addressLabel}, publish a case study with geo-tagged citations in this zip code.`}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 text-center text-slate-500 text-xs">
              Click any node on the map to inspect location telemetry.
            </div>
          )}

          {/* Local Competitors Share of Voice */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Local 3-Pack Share of Voice (SOV)
            </h4>
            <div className="space-y-3">
              {currentKeyword.competitors.map((comp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium ${idx === 0 ? 'text-indigo-400 font-semibold' : 'text-slate-300'}`}>
                      {comp.name}
                    </span>
                    <span className="font-mono tabular-nums text-slate-200">
                      {comp.shareOfVoice}% (Avg #{comp.avgRank.toFixed(1)})
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0 ? 'bg-indigo-500' : idx === 1 ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                      style={{ width: `${comp.shareOfVoice}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
