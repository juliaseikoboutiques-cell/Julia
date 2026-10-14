import React, { useState } from 'react';
import { X, Plus, Layers, Target, DollarSign } from 'lucide-react';
import { AdCampaign, AdPlatform } from '../types/marketing';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCampaign: (campaign: AdCampaign) => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  onClose,
  onAddCampaign,
}) => {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<AdPlatform>('Google Ads');
  const [dailyBudget, setDailyBudget] = useState<number>(100);
  const [objective, setObjective] = useState<AdCampaign['objective']>('Conversions');
  const [targetCpa, setTargetCpa] = useState<number>(45);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCampaign: AdCampaign = {
      id: `camp-${Date.now()}`,
      name: name.trim(),
      platform,
      status: 'Active',
      dailyBudget: Number(dailyBudget),
      totalSpend: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      cpc: 1.45,
      cpm: 32.0,
      ctr: 2.5,
      roas: 0.0,
      cpa: Number(targetCpa),
      objective,
      updatedAt: 'Just now',
    };

    onAddCampaign(newCampaign);
    onClose();
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
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Launch New Ad Campaign</h3>
            <p className="text-xs text-slate-400">
              Configure channel targeting, daily budget cap, and performance attribution targets.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Campaign Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Google PMax - Metro Manila Boutique Visits"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Ad Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as AdPlatform)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Google Ads">Google Ads</option>
                <option value="Meta Ads">Meta Ads (FB/IG PH)</option>
                <option value="TikTok Ads">TikTok Ads PH</option>
                <option value="LinkedIn Ads">LinkedIn Ads</option>
                <option value="YouTube Ads">YouTube Ads</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Objective</label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value as AdCampaign['objective'])}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Conversions">E-Commerce Watch Sales</option>
                <option value="Local Store Visits">Boutique Store Visits (Glorietta/BGC)</option>
                <option value="Lead Generation">VIP Viewing / Consultations</option>
                <option value="Traffic">Traffic & Brand Awareness</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Daily Budget (₱ PHP)</label>
              <input
                type="number"
                min="500"
                max="500000"
                value={dailyBudget}
                onChange={(e) => setDailyBudget(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target CPA (₱ PHP)</label>
              <input
                type="number"
                min="50"
                max="50000"
                value={targetCpa}
                onChange={(e) => setTargetCpa(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-sm transition-colors"
            >
              Deploy Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
