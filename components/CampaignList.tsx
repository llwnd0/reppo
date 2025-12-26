
import React from 'react';
import { Campaign } from '../types';

// Fixed missing 'steps' property in mock data
const CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Q3 Enterprise Outreach', leadsCount: 450, openRate: 64.2, replyRate: 12.5, status: 'Active', steps: 4 },
  { id: '2', name: 'Product Launch Pilot', leadsCount: 120, openRate: 88.0, replyRate: 24.1, status: 'Active', steps: 3 },
  { id: '3', name: 'SaaS Founder sequence', leadsCount: 890, openRate: 42.1, replyRate: 5.4, status: 'Paused', steps: 5 },
  { id: '4', name: 'Waitlist Nurture', leadsCount: 2300, openRate: 35.5, replyRate: 2.1, status: 'Draft', steps: 2 },
];

export const CampaignList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Your Campaigns</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          <span>Create Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAMPAIGNS.map((campaign) => (
          <div key={campaign.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{campaign.name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                  campaign.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                  campaign.status === 'Paused' ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Leads</p>
                <p className="text-lg font-bold text-slate-800">{campaign.leadsCount}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Open Rate</p>
                <p className="text-lg font-bold text-emerald-600">{campaign.openRate}%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reply Rate</p>
                <p className="text-lg font-bold text-indigo-600">{campaign.replyRate}%</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors">
                View Stats
              </button>
              <button className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold rounded-lg transition-colors">
                Edit Flow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
