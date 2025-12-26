
import React, { useState } from 'react';
import { Lead } from '../types';

interface InboxViewProps {
  leads: Lead[];
}

const MOCK_MESSAGES = [
  { id: '1', leadId: '3', content: "Hi! This sounds interesting. Do you have a deck or more info on pricing?", timestamp: '2:15 PM', unread: true },
  { id: '2', leadId: '4', content: "Let's connect next Tuesday at 10 AM. Does that work for you?", timestamp: '11:30 AM', unread: false },
  { id: '3', leadId: '2', content: "Thanks for reaching out, Sarah. We are actually looking for exactly this right now.", timestamp: 'Yesterday', unread: false },
];

export const InboxView: React.FC<InboxViewProps> = ({ leads }) => {
  const [selectedMsgId, setSelectedMsgId] = useState(MOCK_MESSAGES[0].id);
  const selectedMsg = MOCK_MESSAGES.find(m => m.id === selectedMsgId);
  const lead = leads.find(l => l.id === selectedMsg?.leadId);

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Sidebar List */}
      <div className="w-80 border-r border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="font-black text-slate-800">Messages</h2>
          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">3 New</span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {MOCK_MESSAGES.map((msg) => {
            const l = leads.find(le => le.id === msg.leadId);
            return (
              <button 
                key={msg.id}
                onClick={() => setSelectedMsgId(msg.id)}
                className={`w-full p-6 text-left hover:bg-slate-50 transition-colors flex flex-col space-y-2 relative ${selectedMsgId === msg.id ? 'bg-indigo-50/30' : ''}`}
              >
                {msg.unread && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full"></div>}
                <div className="flex justify-between items-start">
                  <p className="font-bold text-slate-900 text-sm truncate pr-4">{l?.name || 'Unknown'}</p>
                  <span className="text-[10px] text-slate-400 font-medium flex-shrink-0">{msg.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{msg.content}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {selectedMsg && lead ? (
          <>
            <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{lead.name}</h3>
                  <p className="text-xs text-slate-500">{lead.role} at {lead.company}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold transition-all">View Profile</button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 transition-all">Book Meeting</button>
              </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              {/* Lead Message */}
              <div className="flex flex-col items-start space-y-2">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-lg">
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedMsg.content}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium px-2">{selectedMsg.timestamp}</span>
              </div>

              {/* AI Suggestion Box */}
              <div className="bg-indigo-600/5 border border-indigo-200 p-6 rounded-3xl space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-indigo-600 rounded-lg">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">Pilot Suggestion</h4>
                </div>
                <p className="text-sm text-indigo-900 font-medium italic">"I'd love to share our pricing deck. Are you available for a quick 5-min walk-through on Monday?"</p>
                <div className="flex space-x-3">
                  <button className="text-[11px] font-bold bg-indigo-600 text-white px-4 py-1.5 rounded-lg">Use This</button>
                  <button className="text-[11px] font-bold text-indigo-600 hover:bg-indigo-600/10 px-4 py-1.5 rounded-lg transition-colors">Re-generate</button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative">
                <textarea 
                  placeholder="Type your reply..."
                  className="w-full bg-slate-50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none h-32"
                />
                <button className="absolute right-4 bottom-4 p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Select a conversation</h3>
            <p className="text-slate-500 max-w-xs">Pick a message from the list to start communicating with your leads.</p>
          </div>
        )}
      </div>
    </div>
  );
};
