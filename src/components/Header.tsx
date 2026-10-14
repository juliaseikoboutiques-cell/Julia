import React from 'react';
import { Radio, Plus, Download, Sparkles, BarChart3, Clock, Presentation } from 'lucide-react';

interface HeaderProps {
  activeTab: 'consolidated' | 'overview' | 'ad-spend' | 'social' | 'conversions' | 'local-seo' | 'ai-advisor' | 'slides';
  setActiveTab: (tab: 'consolidated' | 'overview' | 'ad-spend' | 'social' | 'conversions' | 'local-seo' | 'ai-advisor' | 'slides') => void;
  isLiveSimulating: boolean;
  setIsLiveSimulating: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenNewCampaign: () => void;
  onOpenExport: () => void;
  lastSyncTime: Date;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isLiveSimulating,
  setIsLiveSimulating,
  onOpenNewCampaign,
  onOpenExport,
  lastSyncTime,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Wordmark Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 shadow-sm">
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <a href="/" className="text-base font-extrabold tracking-wider text-white whitespace-nowrap shrink-0 flex items-baseline gap-1.5">
              <span>SEIKO</span>
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">PHILIPPINES</span>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Single-line, concise) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('consolidated')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'consolidated' ? 'text-white font-semibold border-b-2 border-indigo-500' : 'text-slate-400'
              }`}
            >
              Consolidated Dashboard
            </button>
            <button
              onClick={() => setActiveTab('ad-spend')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'ad-spend' ? 'text-white font-semibold border-b-2 border-indigo-500' : 'text-slate-400'
              }`}
            >
              Ad Networks
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'social' ? 'text-white font-semibold border-b-2 border-indigo-500' : 'text-slate-400'
              }`}
            >
              Social Channels
            </button>
            <button
              onClick={() => setActiveTab('conversions')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'conversions' ? 'text-white font-semibold border-b-2 border-indigo-500' : 'text-slate-400'
              }`}
            >
              Conversions
            </button>
            <button
              onClick={() => setActiveTab('local-seo')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                activeTab === 'local-seo' ? 'text-orange-400 font-semibold border-b-2 border-orange-500' : 'text-slate-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
              <span>SEMrush Local SEO</span>
            </button>
            <button
              onClick={() => setActiveTab('slides')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                activeTab === 'slides'
                  ? 'text-amber-300 font-bold border-b-2 border-amber-400'
                  : 'text-amber-400/90 hover:text-amber-300'
              }`}
            >
              <Presentation className="w-3.5 h-3.5 text-amber-400" />
              <span>Generate Slides</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-advisor')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
                activeTab === 'ai-advisor' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500' : 'text-slate-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              AI Advisor
            </button>
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick action to open slides */}
            <button
              onClick={() => setActiveTab('slides')}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all"
              title="Convert data to presentation slides"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Slides Deck</span>
            </button>

            {/* Live stream indicator */}
            <button
              onClick={() => setIsLiveSimulating(!isLiveSimulating)}
              title={isLiveSimulating ? "Real-time updates active - click to pause" : "Real-time updates paused - click to enable"}
              className={`hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                isLiveSimulating
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isLiveSimulating ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span>{isLiveSimulating ? 'Hourly Auto-Sync' : 'Auto-Sync Off'}</span>
            </button>

            <button
              onClick={onOpenExport}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg border border-slate-800 transition-colors"
              title="Export Report & CSV"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewCampaign}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="lg:hidden flex items-center gap-2 px-4 py-2 border-t border-slate-800 overflow-x-auto text-xs">
        {(['consolidated', 'ad-spend', 'social', 'conversions', 'local-seo', 'slides', 'ai-advisor'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === tab
                ? tab === 'slides'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-indigo-600 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === 'slides' && <Presentation className="w-3 h-3" />}
            {tab === 'consolidated' && 'Dashboard'}
            {tab === 'ad-spend' && 'Ad Spend'}
            {tab === 'social' && 'Social'}
            {tab === 'conversions' && 'Conversions'}
            {tab === 'local-seo' && 'Local SEO'}
            {tab === 'slides' && 'Slides'}
            {tab === 'ai-advisor' && 'AI Advisor'}
          </button>
        ))}
      </div>
    </header>
  );
};
