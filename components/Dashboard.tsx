
import React from 'react';
import { Lead } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  leads: Lead[];
}

const DATA = [
  { name: 'Mon', sent: 400, replied: 240, revenue: 1200 },
  { name: 'Tue', sent: 300, replied: 139, revenue: 900 },
  { name: 'Wed', sent: 200, replied: 380, revenue: 2400 },
  { name: 'Thu', sent: 278, replied: 390, revenue: 1800 },
  { name: 'Fri', sent: 189, replied: 480, revenue: 3200 },
  { name: 'Sat', sent: 239, replied: 380, revenue: 2100 },
  { name: 'Sun', sent: 349, replied: 430, revenue: 2800 },
];

export const Dashboard: React.FC<DashboardProps> = ({ leads }) => {
  const stats = [
    { label: 'Pipeline Value', value: '$42,500', change: '+24%', color: 'indigo' },
    { label: 'Avg Lead Score', value: '82', change: '+4', color: 'emerald' },
    { label: 'Reply Efficiency', value: '14.2%', change: '-2%', color: 'rose' },
    { label: 'Pilot Emails', value: '1,240', change: '+180', color: 'amber' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-110`}></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">{stat.label}</p>
            <div className="flex items-end justify-between relative z-10">
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-black text-slate-800">Pilot Performance</h3>
              <p className="text-xs text-slate-400 font-medium">Daily outreach vs engagement metrics</p>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-indigo-50 rounded-full">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span className="text-[10px] font-black text-indigo-600 uppercase">Emails Sent</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase">Replies</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 700, fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sent" stroke="#4f46e5" fillOpacity={1} fill="url(#colorSent)" strokeWidth={3} />
                <Area type="monotone" dataKey="replied" stroke="#10b981" fillOpacity={0} strokeWidth={3} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div>
            <h3 className="text-lg font-black text-white mb-2">Revenue Growth</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">Projected impact of AI Pilot automation on your Q3 targets.</p>
          </div>
          <div className="h-48 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target</p>
              <p className="text-lg font-black text-white">$150,000</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Achieved</p>
              <p className="text-lg font-black text-emerald-400">28.3%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
