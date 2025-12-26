
import React, { useState, useEffect } from 'react';
import { Lead } from '../types';
import { generateOutreachEmail } from '../services/geminiService';

interface EmailComposerProps {
  lead: Lead | null;
  onBack: () => void;
}

export const EmailComposer: React.FC<EmailComposerProps> = ({ lead, onBack }) => {
  const [goal, setGoal] = useState('Introduction to our sales automation platform');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState({ subject: '', body: '' });

  const handleGenerate = async () => {
    if (!lead) return;
    setIsGenerating(true);
    const result = await generateOutreachEmail(lead, goal);
    setDraft(result);
    setIsGenerating(false);
  };

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white rounded-2xl border border-dashed border-slate-300">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Lead Selected</h3>
        <p className="text-slate-500 mb-6">Select a lead from the list to start generating a pilot outreach.</p>
        <button onClick={onBack} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">Back to Leads</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-indigo-600 flex items-center space-x-2 font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span>Back to Leads</span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-tighter">Gemini 3.0 Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-4">Lead Profile</h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Name</p>
                <p className="text-sm font-semibold text-slate-800">{lead.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Role</p>
                <p className="text-sm font-semibold text-slate-800">{lead.role}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Company</p>
                <p className="text-sm font-semibold text-slate-800">{lead.company}</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-xl text-white shadow-lg shadow-indigo-200">
            <h4 className="text-sm font-bold mb-4">Pilot Instructions</h4>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-indigo-500/50 border border-indigo-400 rounded-lg p-3 text-sm placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/20 h-32 resize-none"
              placeholder="What is the goal of this outreach?"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-4 py-2.5 bg-white text-indigo-600 font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span>Generate Pilot Draft</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Email Composer</h3>
              <div className="flex space-x-2">
                <button className="p-1.5 hover:bg-slate-200 rounded text-slate-400 transition-colors">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
                <input 
                  type="text" 
                  value={draft.subject}
                  onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                  className="w-full border-b border-slate-100 py-1 font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Drafting subject..."
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Message</label>
                <textarea 
                  value={draft.body}
                  onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                  className="w-full h-[350px] resize-none focus:outline-none text-slate-700 leading-relaxed"
                  placeholder="Click 'Generate' to create a personalized outreach pilot..."
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                </button>
                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors">Save Draft</button>
                <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">Send Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
