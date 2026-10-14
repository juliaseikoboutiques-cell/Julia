import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Presentation } from 'lucide-react';
import {
  AdCampaign,
  ConversionEvent,
  GoogleBusinessInsight,
  LocalKeywordRank,
  SEMrushLocalKeyword,
  LocalBoutiqueListing,
} from '../types/marketing';
import { initialBranchGBPData } from '../data/initialData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: AdCampaign[];
  conversions: ConversionEvent[];
  gbpData: GoogleBusinessInsight;
  keywords: LocalKeywordRank[];
  semrushKeywords?: SEMrushLocalKeyword[];
  boutiques?: LocalBoutiqueListing[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  conversions,
  gbpData,
  keywords,
  semrushKeywords = [],
  boutiques = [],
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalSpend = campaigns.reduce((a, b) => a + b.totalSpend, 0);
  const totalRevenue = campaigns.reduce((a, b) => a + b.revenue, 0);
  const blendedRoas = (totalRevenue / Math.max(1, totalSpend)).toFixed(2);

  const generateCSV = () => {
    let csv = "OmniPulse Marketing Performance Export\n\n";
    csv += "--- AD CAMPAIGNS ---\n";
    csv += "Campaign Name,Platform,Status,Daily Budget,Total Spend,Clicks,Impressions,Conversions,Revenue,ROAS,CPA\n";
    campaigns.forEach((c) => {
      csv += `"${c.name}","${c.platform}","${c.status}",${c.dailyBudget},${c.totalSpend},${c.clicks},${c.impressions},${c.conversions},${c.revenue},${c.roas},${c.cpa}\n`;
    });

    csv += "\n--- REAL-TIME CONVERSIONS ---\n";
    csv += "ID,Customer Name,Location,Value,Channel,Touchpoints\n";
    conversions.forEach((conv) => {
      csv += `"${conv.id}","${conv.customerName}","${conv.customerLocation}",${conv.value},"${conv.primaryChannel}","${conv.touchpoints.join(' > ')}"\n`;
    });

    csv += "\n--- LOCAL SEO KEYWORD RANKINGS ---\n";
    csv += "Keyword,Average Rank,Local 3-Pack Presence %,Search Volume\n";
    keywords.forEach((k) => {
      csv += `"${k.keyword}",${k.averageRank},${k.top3PackPct}%,${k.searchVolume}\n`;
    });

    csv += "\n--- SEMRUSH LOCAL KEYWORD TRACKING (GOOGLE PH) ---\n";
    csv += "Keyword,Intent,Google PH Rank,Search Volume,Change,CPC (PHP),Difficulty %,Target Landing URL\n";
    semrushKeywords.forEach((s) => {
      csv += `"${s.keyword}","${s.intent}",#${s.rankGooglePH},${s.searchVolume},${s.change},${s.cpcPHP},${s.kd}%,"${s.landingUrl}"\n`;
    });

    csv += "\n--- SEIKO BOUTIQUE NETWORK — ALL-BRANCH GBP PERFORMANCE (SEPTEMBER 2026 ACTUALS) ---\n";
    csv += "Branch Name,Region,Total Views,MoM Views Growth %,Total Actions,Calls,Directions,Website Clicks,Conversion Rate %,Benchmark Variance,Average Star Rating,Positive Review %,Performance Status,Performance Tier,Traffic Share %,Core Strength & Challenge,Strategic Action Plan\n";
    initialBranchGBPData.forEach((b) => {
      csv += `"${b.branchName}","${b.region}",${b.totalViews},"${b.momViewsGrowth}",${b.totalActions},${b.calls},${b.directions},${b.websiteClicks},${b.conversionRate}%,"${b.benchmarkVariance}",${b.averageStarRating},${b.positiveReviewPct}%,"${b.performanceStatus}","${b.performanceTier}",${b.trafficShare}%,"${b.coreStrengthAndChallenge.replace(/"/g, '""')}","${b.strategicActionPlan.replace(/"/g, '""')}"\n`;
    });
    csv += `"NETWORK TOTAL / AVG","13 Stores",64502,"+48.8%",751,180,532,39,1.16%,"-0.84%",3.74,61.9%,"Below Benchmark","All Tiers",100%,"Dominant Channel: Directions (70.8%)","Focus on SM North category audit, Megamall review response, and Mitsukoshi VIP catalog integration"\n`;

    csv += "\n--- OFFICIAL BOUTIQUE NETWORK (NAP DIRECTORY AUDIT) ---\n";
    csv += "Boutique Name,Location,Phone,Rating,NAP Consistency %,Status\n";
    boutiques.forEach((b) => {
      csv += `"${b.name}","${b.mall} - ${b.city}","${b.phone}",${b.rating}★,${b.napConsistency}%,"${b.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `seiko-philippines-report-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateJSON = () => {
    const exportData = {
      brand: 'Seiko Philippines',
      exportedAt: new Date().toISOString(),
      currency: 'PHP',
      summary: {
        totalSpendPHP: totalSpend,
        totalRevenuePHP: totalRevenue,
        blendedRoas,
        gbpRating: gbpData.overallRating,
        gbpTotalReviews: gbpData.reviewCount,
      },
      campaigns,
      conversions,
      googleBusinessProfile: gbpData,
      localGeoKeywords: keywords,
      semrushLocalKeywords: semrushKeywords,
      officialBoutiques: boutiques,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `seiko-philippines-data-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executiveBrief = `SEIKO PHILIPPINES · MARKETING & LOCAL SEARCH INTELLIGENCE REPORT
Date: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
Market: Metro Manila, Philippines (Glorietta 4, SM Megamall, BGC, SM MOA)

1. CROSS-PLATFORM AD SPEND & ATTRIBUTION (PHP)
- Total Ad Spend: ₱${totalSpend.toLocaleString()}
- Attributed Watch Sales Revenue: ₱${totalRevenue.toLocaleString()}
- Blended ROAS: ${blendedRoas}x
- Active Campaigns: ${campaigns.filter((c) => c.status === 'Active').length} across Google Ads, Meta (IG/FB PH), and TikTok

2. SEMRUSH LOCAL SEO & GOOGLE PH VISIBILITY
- Authority Score: 76/100 (Google PH)
- Top 3-Pack Share of Voice: 54.8% Market Dominance
- Ranking Keywords: 4,820 Google PH keywords (186 in Local 3-Pack)
- Official Boutiques: ${boutiques.length} verified flagship locations with 99.2% NAP Consistency

3. GOOGLE BUSINESS PROFILE & LOCAL SEARCH
- Flagship Profile: ${gbpData.profileName} (4.9★ across ${gbpData.reviewCount} verified reviews)
- Total Boutique Inbound Actions: ${(
    gbpData.customerActions.websiteClicks +
    gbpData.customerActions.directionRequests +
    gbpData.customerActions.phoneCalls +
    gbpData.customerActions.bookings
  ).toLocaleString()} actions (Directions, Calls, VIP Bookings)
- Metro Manila 3-Pack Share of Voice: 54.0% market leader across Metro Manila luxury watch retail
`;

  const copyBrief = () => {
    navigator.clipboard.writeText(executiveBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Export Marketing Intelligence Report</h3>
            <p className="text-xs text-slate-400">
              Download clean CSV spreadsheets, raw JSON telemetry, or formatted executive memos.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Executive Summary Preview Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {executiveBrief}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={generateCSV}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-white font-semibold rounded-lg flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Download CSV</span>
            </button>

            <button
              onClick={generateJSON}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-white font-semibold rounded-lg flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download JSON</span>
            </button>
          </div>

          {/* 1-Click Convert to Google Slides button */}
          <button
            onClick={() => {
              const title = encodeURIComponent(`Seiko Philippines - Executive Marketing Performance Deck`);
              window.open(`https://docs.google.com/presentation/create?title=${title}`, '_blank');
            }}
            className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Presentation className="w-4 h-4 text-slate-950" />
            <span>Convert to Google Slides Deck</span>
          </button>

          <button
            onClick={copyBrief}
            className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Executive Brief to Clipboard'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
