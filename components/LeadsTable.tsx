
import React from 'react';
import { Lead } from '../types';

interface LeadsTableProps {
  leads: Lead[];
  onCompose: (lead: Lead) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onCompose }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Filter leads..." 
              className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 w-72 transition-all shadow-sm group-hover:border-slate-300"
            />
            <svg className="w-4 h-4 absolute left-4 top-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter:</span>
            <select className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer">
              <option>All Status</option>
              <option>New Only</option>
              <option>High Priority</option>
            </select>
          </div>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 py-2.5 rounded-2xl text-sm font-black shadow-lg shadow-indigo-100 transition-all flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          <span>Import Leads</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-8 py-4">Lead Information</th>
              <th className="px-8 py-4">Context</th>
              <th className="px-8 py-4">Pilot Score</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-indigo-50/20 transition-all group cursor-default">
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-11 h-11 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center font-black text-sm transition-transform group-hover:scale-110">
                        {lead.name.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${lead.score > 80 ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 leading-none mb-1">{lead.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{lead.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="text-sm text-slate-700 font-bold leading-none mb-1">{lead.company}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-tight">{lead.role}</div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col space-y-1.5 w-24">
                    <div className="flex justify-between items-center text-[10px] font-black">
                      <span className={lead.score > 80 ? 'text-emerald-600' : 'text-amber-600'}>{lead.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${lead.score > 80 ? 'bg-emerald-500' : 'bg-amber-400'}`} 
                        style={{ width: `${lead.score}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl shadow-sm border ${
                    lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    lead.status === 'Contacted' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    lead.status === 'Replied' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onCompose(lead)}
                      className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest"
                    >
                      Draft
                    </button>
                    <button className="text-slate-300 hover:text-slate-600 p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <span>Displaying {leads.length} Active Leads</span>
        <div className="flex items-center space-x-3">
          <button className="hover:text-indigo-600 transition-colors">Previous</button>
          <div className="flex space-x-1">
            <span className="text-indigo-600">01</span>
            <span>/</span>
            <span>01</span>
          </div>
          <button className="hover:text-indigo-600 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};
