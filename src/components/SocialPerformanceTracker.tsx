import React, { useState } from 'react';
import {
  Share2,
  Users,
  Eye,
  Heart,
  MessageCircle,
  ExternalLink,
  Filter,
  Sparkles,
  Award,
} from 'lucide-react';
import { SocialChannelMetric, OrganicPost } from '../types/marketing';

interface SocialPerformanceTrackerProps {
  socialMetrics: SocialChannelMetric[];
  organicPosts: OrganicPost[];
}

export const SocialPerformanceTracker: React.FC<SocialPerformanceTrackerProps> = ({
  socialMetrics,
  organicPosts,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');

  const totalFollowers = socialMetrics.reduce((a, b) => a + b.followers, 0);
  const totalNetGrowth = socialMetrics.reduce((a, b) => a + b.netGrowth30d, 0);
  const totalReach = socialMetrics.reduce((a, b) => a + b.reach30d, 0);
  const avgEngagement = (
    socialMetrics.reduce((a, b) => a + b.engagementRate, 0) / socialMetrics.length
  ).toFixed(2);

  const filteredPosts = organicPosts.filter((post) => {
    const matchesFormat = selectedFormat === 'All' || post.format === selectedFormat;
    const matchesPlatform = selectedPlatform === 'All' || post.platform === selectedPlatform;
    return matchesFormat && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Social Media Performance</h2>
          <p className="text-sm text-slate-400">
            Cross-network organic audience velocity, brand reach, engagement ratios, and viral post analytics.
          </p>
        </div>

        {/* Global Social Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">Total Audience: </span>
            <span className="text-white font-bold tabular-nums">{totalFollowers.toLocaleString()}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">30d Growth: </span>
            <span className="text-emerald-400 font-bold tabular-nums">+{totalNetGrowth.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Social Channel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {socialMetrics.map((sm) => (
          <div
            key={sm.platform}
            className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{sm.platform}</span>
                </div>
                <div className="text-xs text-slate-400">{sm.handle}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white font-mono tabular-nums">
                  {sm.followers.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono tabular-nums">
                  +{sm.netGrowth30d.toLocaleString()} (30d)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">30d Reach</div>
                <div className="text-xs font-semibold text-slate-200 font-mono tabular-nums mt-0.5">
                  {(sm.reach30d / 1000).toFixed(1)}k
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Engagement</div>
                <div className="text-xs font-semibold text-emerald-400 font-mono tabular-nums mt-0.5">
                  {sm.engagementRate.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Shares</div>
                <div className="text-xs font-semibold text-slate-200 font-mono tabular-nums mt-0.5">
                  {sm.sharesCount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performing Organic Content Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Top Organic Content & Viral Creatives</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              High-converting organic posts that drive organic brand search and assisted conversions.
            </p>
          </div>

          {/* Format & Platform Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
              {['All', 'Facebook', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn'].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setSelectedPlatform(plat)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                    selectedPlatform === plat
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
              {['All', 'Carousel', 'Reel/Short', 'Static Image', 'Video', 'Text/Article'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                    selectedFormat === fmt
                      ? 'bg-slate-800 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400">
                <th className="py-3 px-4 font-semibold">Post Title & Angle</th>
                <th className="py-3 px-3 font-semibold">Channel</th>
                <th className="py-3 px-3 font-semibold">Format</th>
                <th className="py-3 px-3 font-semibold text-right">Impressions</th>
                <th className="py-3 px-3 font-semibold text-right">Likes</th>
                <th className="py-3 px-3 font-semibold text-right">Comments</th>
                <th className="py-3 px-3 font-semibold text-right">Shares</th>
                <th className="py-3 px-3 font-semibold text-right">Engagement</th>
                <th className="py-3 px-4 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-850/40 transition-colors">
                  <td className="py-3 px-4 max-w-sm">
                    <div className="font-medium text-white line-clamp-1">{post.title}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                    {post.platform}
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">
                      {post.format}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-200">
                    {post.impressions.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                    {post.likes.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                    {post.comments.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                    {post.shares.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-emerald-400">
                    {post.engagementRate.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400 font-mono tabular-nums whitespace-nowrap">
                    {post.publishedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
