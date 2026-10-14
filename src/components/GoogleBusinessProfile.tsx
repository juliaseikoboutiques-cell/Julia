import React, { useState } from 'react';
import {
  MapPin,
  Star,
  Phone,
  Navigation,
  Globe,
  MessageSquare,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Search,
  Sparkles,
  Send,
} from 'lucide-react';
import { GoogleBusinessInsight } from '../types/marketing';

interface GoogleBusinessProfileProps {
  gbpData: GoogleBusinessInsight;
  onAddReviewResponse: (reviewId: string, replyText: string) => void;
}

export const GoogleBusinessProfile: React.FC<GoogleBusinessProfileProps> = ({
  gbpData,
  onAddReviewResponse,
}) => {
  const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Positive' | 'Neutral' | 'Critical'>('All');
  const [respondingReviewId, setRespondingReviewId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');

  const totalActions =
    gbpData.customerActions.websiteClicks +
    gbpData.customerActions.directionRequests +
    gbpData.customerActions.phoneCalls +
    gbpData.customerActions.chatMessages +
    gbpData.customerActions.bookings;

  const searchPct = Math.round((gbpData.viewsOnSearch / (gbpData.viewsOnSearch + gbpData.viewsOnMaps)) * 100);
  const mapsPct = 100 - searchPct;

  const filteredReviews = gbpData.reviews.filter((r) => {
    return sentimentFilter === 'All' || r.sentiment === sentimentFilter;
  });

  const handleStartReply = (id: string, defaultName: string) => {
    setRespondingReviewId(id);
    setResponseText(
      `Hi ${defaultName.split(' ')[0]}, thank you for visiting the Seiko Boutique Glorietta 4 Flagship! We are delighted to provide you with authentic Japanese horological craftsmanship and official Seiko Philippine warranty service.`
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
      {/* Profile Overview Card */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-rose-600/20 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">{gbpData.profileName}</h2>
                {gbpData.verified && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Listing
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <span>{gbpData.location}</span>
              </p>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-6 self-start md:self-auto border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <span className="text-2xl font-bold text-white font-mono tabular-nums">
                  {gbpData.overallRating.toFixed(1)}
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-400 font-mono tabular-nums">
                {gbpData.reviewCount} verified reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Action Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Website Clicks */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Website Visits</span>
            <Globe className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            {gbpData.customerActions.websiteClicks.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">+14.2% MoM</div>
        </div>

        {/* Direction Requests */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Directions</span>
            <Navigation className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            {gbpData.customerActions.directionRequests.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">+9.8% MoM</div>
        </div>

        {/* Phone Calls */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Phone Calls</span>
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            {gbpData.customerActions.phoneCalls.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono tabular-nums mt-1">+24.5% peak calls</div>
        </div>

        {/* Bookings */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Appointments</span>
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            {gbpData.customerActions.bookings.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Direct via Google Reserve</div>
        </div>

        {/* Chat Messages */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Chat Inquiries</span>
            <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            {gbpData.customerActions.chatMessages.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">98% responded &lt;5m</div>
        </div>
      </div>

      {/* Discovery Split & Top Search Queries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Search vs Maps Breakdown */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Search & Maps Discovery Split</h3>
            <p className="text-xs text-slate-400 mb-4">
              Where users discovered your Google Business Profile over the last 30 days ({gbpData.monthlySearches.toLocaleString()} total views).
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Google Search Views</span>
                  <span className="font-mono text-white tabular-nums font-semibold">
                    {gbpData.viewsOnSearch.toLocaleString()} ({searchPct}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${searchPct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Google Maps Views</span>
                  <span className="font-mono text-white tabular-nums font-semibold">
                    {gbpData.viewsOnMaps.toLocaleString()} ({mapsPct}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${mapsPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Direct Search: <strong className="text-slate-200 font-mono tabular-nums">{gbpData.directSearches.toLocaleString()}</strong></span>
            <span>Discovery Search: <strong className="text-slate-200 font-mono tabular-nums">{gbpData.discoverySearches.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Top Triggering Search Queries */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Top Search Queries Triggering Profile</h3>
              <p className="text-xs text-slate-400">High-intent search terms driving Local 3-Pack appearances.</p>
            </div>
            <Search className="w-4 h-4 text-slate-500" />
          </div>

          <div className="space-y-2.5">
            {gbpData.topSearchQueries.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/60 border border-slate-850 hover:border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-mono w-4">#{idx + 1}</span>
                  <span className="font-medium text-slate-200">{item.query}</span>
                </div>
                <div className="flex items-center gap-4 font-mono tabular-nums">
                  <span className="text-white">{item.impressions.toLocaleString()} views</span>
                  <span className={`text-[11px] ${item.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.changePct >= 0 ? `+${item.changePct}%` : `${item.changePct}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews & Sentiment Management */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Google Customer Reviews & Sentiment</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review velocity, automated sentiment classification, and 1-click professional response engine.
            </p>
          </div>

          {/* Sentiment Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
            {(['All', 'Positive', 'Neutral', 'Critical'] as const).map((sent) => (
              <button
                key={sent}
                onClick={() => setSentimentFilter(sent)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  sentimentFilter === sent
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sent}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-slate-800/60">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="p-4 space-y-2 hover:bg-slate-850/20 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-xs">{rev.author}</span>
                    <span className="text-[11px] text-slate-500 font-mono tabular-nums">{rev.date}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        rev.sentiment === 'Positive'
                          ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-400'
                          : rev.sentiment === 'Neutral'
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-rose-950/60 border border-rose-800/80 text-rose-400'
                      }`}
                    >
                      {rev.sentiment}
                    </span>
                  </div>
                  <div className="flex text-amber-400 mt-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {!rev.responded && respondingReviewId !== rev.id && (
                  <button
                    onClick={() => handleStartReply(rev.id, rev.author)}
                    className="px-2.5 py-1 text-xs font-medium text-indigo-400 bg-indigo-950/60 border border-indigo-800/80 rounded hover:bg-indigo-900/60 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Quick Reply</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{rev.text}</p>

              {/* Already responded */}
              {rev.responded && rev.replyText && (
                <div className="mt-2 p-2.5 rounded bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <div className="text-[11px] text-slate-400 font-medium mb-1">Your Official Response:</div>
                  <p className="italic text-slate-300">{rev.replyText}</p>
                </div>
              )}

              {/* In-line Reply Editor */}
              {respondingReviewId === rev.id && (
                <div className="mt-3 p-3 bg-slate-950 border border-indigo-900/60 rounded-lg space-y-2">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Generate & Post Response</span>
                  </div>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={3}
                    className="w-full text-xs bg-slate-900 border border-slate-800 rounded p-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setRespondingReviewId(null)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSubmitReply(rev.id)}
                      className="px-3 py-1 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Post Reply</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
