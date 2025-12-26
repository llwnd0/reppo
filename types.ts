
export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: 'New' | 'Contacted' | 'Replied' | 'Qualified' | 'Closed';
  lastActivity: string;
  score: number; // 0-100
}

export interface Campaign {
  id: string;
  name: string;
  leadsCount: number;
  openRate: number;
  replyRate: number;
  status: 'Active' | 'Paused' | 'Draft';
  steps: number;
}

export interface Message {
  id: string;
  leadId: string;
  sender: 'lead' | 'me';
  content: string;
  timestamp: string;
}

export enum AppSection {
  DASHBOARD = 'dashboard',
  LEADS = 'leads',
  CAMPAIGNS = 'campaigns',
  INBOX = 'inbox',
  OUTREACH = 'outreach',
  SETTINGS = 'settings'
}
