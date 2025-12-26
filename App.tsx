
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LeadsTable } from './components/LeadsTable';
import { CampaignList } from './components/CampaignList';
import { EmailComposer } from './components/EmailComposer';
import { InboxView } from './components/InboxView';
import { AppSection, Lead } from './types';

const INITIAL_LEADS: Lead[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@techflow.io', company: 'TechFlow', role: 'Head of Engineering', status: 'New', lastActivity: '2 hours ago', score: 85 },
  { id: '2', name: 'Sarah Chen', email: 'sarah.c@cloudscale.net', company: 'CloudScale', role: 'Product Manager', status: 'Contacted', lastActivity: '1 day ago', score: 92 },
  { id: '3', name: 'Michael Ross', email: 'mross@legalforce.com', company: 'LegalForce', role: 'Partner', status: 'Replied', lastActivity: '3 hours ago', score: 78 },
  { id: '4', name: 'Elena Rodriguez', email: 'elena@greenenergy.co', company: 'Green Energy', role: 'COO', status: 'Qualified', lastActivity: '5 mins ago', score: 95 },
  { id: '5', name: 'David Kim', email: 'david.k@startuply.ai', company: 'Startuply', role: 'Founder', status: 'New', lastActivity: '4 days ago', score: 64 },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return <Dashboard leads={leads} />;
      case AppSection.LEADS:
        return (
          <LeadsTable 
            leads={leads} 
            onCompose={(lead) => {
              setSelectedLead(lead);
              setActiveSection(AppSection.OUTREACH);
            }} 
          />
        );
      case AppSection.CAMPAIGNS:
        return <CampaignList />;
      case AppSection.INBOX:
        return <InboxView leads={leads} />;
      case AppSection.OUTREACH:
        return (
          <EmailComposer 
            lead={selectedLead} 
            onBack={() => setActiveSection(AppSection.LEADS)} 
          />
        );
      case AppSection.SETTINGS:
        return (
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">System Settings</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-2">AI Preferences</h3>
                <p className="text-sm text-slate-500 mb-4">Control how the Gemini Pilot interacts with your leads.</p>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-pilot" className="rounded text-indigo-600" defaultChecked />
                  <label htmlFor="auto-pilot" className="text-sm font-medium text-slate-700">Enable Auto-Pilot suggestions for replies</label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard leads={leads} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1 overflow-y-auto h-screen">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold text-slate-800 capitalize tracking-tight">
              {activeSection.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2 mr-4">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="user" />
                 </div>
               ))}
            </div>
            <div className="h-9 w-9 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
              JD
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
