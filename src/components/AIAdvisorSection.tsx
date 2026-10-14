import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Send,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  AdCampaign,
  ConversionEvent,
  GoogleBusinessInsight,
  LocalKeywordRank,
  AIInsightItem,
} from '../types/marketing';

interface AIAdvisorSectionProps {
  campaigns: AdCampaign[];
  conversions: ConversionEvent[];
  gbpData: GoogleBusinessInsight;
  keywordData: LocalKeywordRank[];
}

export const AIAdvisorSection: React.FC<AIAdvisorSectionProps> = ({
  campaigns,
  conversions,
  gbpData,
  keywordData,
}) => {
  const [userQuery, setUserQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [insights, setInsights] = useState<AIInsightItem[]>([
    {
      title: "Scale Grand Seiko VIP Viewing Ads in Makati & BGC",
      type: "budget",
      severity: "high",
      recommendation: "Meta IG Retargeting for Grand Seiko Heritage & Evolution 9 viewings is yielding 5.94x ROAS with ₱980,000 revenue. Reallocating ₱25,000/week from TikTok top-of-funnel into Grand Seiko VIP private consultation booking ads will capture high-net-worth collectors in Makati and BGC.",
      expectedImpact: "+₱280,000/mo net watch retail revenue",
      confidence: 95,
    },
    {
      title: "Glorietta 4 & Megamall Boutique Direction Velocity",
      type: "local_seo",
      severity: "medium",
      recommendation: "Inbound boutique store direction requests on Google Maps reached 3,280/mo, spiking on Fridays and Saturdays. Promoting 'Seiko Boutique Glorietta 4' and 'SM Megamall' inventory availability via Google PMax drives immediate weekend in-store checkout.",
      expectedImpact: "+24% boutique walk-in sales",
      confidence: 92,
    },
    {
      title: "Seiko 5 Sports Streetwear Video Hook Refresh",
      type: "ad_creative",
      severity: "warning",
      recommendation: "TikTok Ads frequency for the SKX Automatic series reached 3.8 across Metro Manila watch enthusiast feeds. Deploy 3 new wrist-roll unboxing videos and automatic caliber ticking sound hooks to keep CPC below ₱5.00.",
      expectedImpact: "Boost TikTok CTR from 1.85% to 2.60%",
      confidence: 89,
    },
  ]);
  const [executiveSummary, setExecutiveSummary] = useState<string>(
    "Seiko Philippines marketing ecosystem is operating with stellar efficiency at 4.67x blended ROAS (₱3.53M revenue on ₱756k ad spend). Local search dominance in Metro Manila is top-tier with 4.9★ rating across 842 verified reviews at Glorietta 4 Flagship, generating 9,930 zero-ad-cost boutique foot-traffic actions."
  );

  const handleGenerateInsights = async (customPrompt?: string) => {
    setLoading(true);
    try {
      const payload = {
        marketingData: {
          totalSpend: campaigns.reduce((a, b) => a + b.totalSpend, 0),
          totalRevenue: campaigns.reduce((a, b) => a + b.revenue, 0),
          blendedRoas: (
            campaigns.reduce((a, b) => a + b.revenue, 0) /
            Math.max(1, campaigns.reduce((a, b) => a + b.totalSpend, 0))
          ).toFixed(2),
          campaigns: campaigns.map((c) => ({
            name: c.name,
            platform: c.platform,
            spend: c.totalSpend,
            roas: c.roas,
            cpa: c.cpa,
            status: c.status,
          })),
          localGbpRating: gbpData.overallRating,
          localGbpActions: gbpData.customerActions,
          topKeywords: keywordData.map((k) => ({
            keyword: k.keyword,
            avgRank: k.averageRank,
            top3Pct: k.top3PackPct,
          })),
        },
        userQuestion: customPrompt || userQuery,
      };

      const res = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.insights && Array.isArray(data.insights)) {
          setInsights(data.insights);
        }
        if (data.executiveSummary) {
          setExecutiveSummary(data.executiveSummary);
        }
      }
    } catch (err) {
      console.error('Failed to fetch AI insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (promptText: string) => {
    setUserQuery(promptText);
    handleGenerateInsights(promptText);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>AI Marketing Strategic Advisor</span>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/80 text-indigo-300 font-mono">
              Gemini 3.8 Flash
            </span>
          </h2>
          <p className="text-sm text-slate-400">
            Real-time multi-channel data audit, ROAS maximization models, and automated local SEO action plans.
          </p>
        </div>

        <button
          onClick={() => handleGenerateInsights()}
          disabled={loading}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Analyzing Data...' : 'Run Full Strategic Audit'}</span>
        </button>
      </div>

      {/* Executive Summary Card */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/40 border border-indigo-800/50 rounded-lg p-5">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Executive Marketing Intelligence Brief</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">{executiveSummary}</p>
      </div>

      {/* AI Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900/70 border border-slate-800 rounded-lg p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold uppercase tracking-wider ${
                    item.severity === 'high'
                      ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-400'
                      : item.severity === 'warning'
                      ? 'bg-amber-950/80 border border-amber-800 text-amber-400'
                      : 'bg-indigo-950/80 border border-indigo-800 text-indigo-400'
                  }`}
                >
                  {item.type.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                  {item.confidence}% confidence
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.recommendation}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Projected Outcome</div>
              <div className="text-xs font-semibold text-emerald-400 font-mono mt-0.5">
                {item.expectedImpact}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Custom Strategy Question */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Ask the AI Marketing Strategist</h3>
        <p className="text-xs text-slate-400 mb-3">
          Get real-time answers grounded in your active ad spend numbers, conversions, and local search rankings.
        </p>

        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {[
            'How can we scale Grand Seiko boutique viewings in Makati and BGC?',
            'Where is ad spend being wasted between TikTok and Meta Ads PH?',
            'How can we increase foot traffic to Seiko Boutique SM Megamall this weekend?',
          ].map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleQuickQuestion(promptText)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              "{promptText}"
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your strategic question (e.g., 'What is our optimal budget split for next month?')..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateInsights()}
            className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleGenerateInsights()}
            disabled={loading || !userQuery.trim()}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
