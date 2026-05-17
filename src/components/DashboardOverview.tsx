import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  Circle
} from 'lucide-react';
import { cn } from '../lib/utils';

const MetricCard = ({ title, value, change, trend, icon: Icon, color = "emerald" }: any) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={48} />
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
    <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
    <div className="flex items-center gap-1.5 mt-2">
      <span className={cn("text-[10px] font-black px-1.5 py-0.5 rounded", 
        trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
      )}>
        {trend === 'up' ? '↑' : '↓'} {change}%
      </span>
      <span className="text-[10px] text-slate-400 font-bold">vs last month</span>
    </div>
  </div>
);

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Main Command Center</h2>
          <p className="text-xs text-slate-400 font-medium">Real-time herbal empire synchronization active.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            System Live
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Revenue" value="$42,850" change="12.5" trend="up" icon={TrendingUp} />
        <MetricCard title="Active Orders" value="184" change="8.2" trend="up" icon={ShoppingCart} />
        <MetricCard title="Quiz Success" value="2.4k" change="4.1" trend="up" icon={Users} />
        <MetricCard title="Avg Conversion" value="4.8%" change="0.2" trend="down" icon={ShoppingBag} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Activity Feed */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-emerald-600" />
              <h4 className="font-bold text-slate-800 text-sm">System Operations Log</h4>
            </div>
          </div>
          <div className="p-0">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                   <th className="px-6 py-3">Event Identity</th>
                   <th className="px-6 py-3">Type</th>
                   <th className="px-6 py-3">Timestamp</th>
                   <th className="px-6 py-3 text-right">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {[
                   { id: '#EV-9942', type: 'Purchase', user: 'Layla Ahmed', action: 'placed order for $124.00', time: '2 mins ago', status: 'Pending', color: 'amber' },
                   { id: '#EV-9941', type: 'Quiz', user: 'Zaid Kareem', action: 'completed Calm Protocol', time: '12 mins ago', status: 'Success', color: 'emerald' },
                   { id: '#EV-9940', type: 'System', user: 'Daemon', action: 'optimized SEO Meta v2.4', time: '45 mins ago', status: 'Complete', color: 'slate' },
                   { id: '#EV-9939', type: 'Stock', user: 'Warehouse', action: 'Low Stock: Lavender Tea', time: '1 hour ago', status: 'Alert', color: 'red' },
                 ].map((event) => (
                   <tr key={event.id} className="hover:bg-slate-50 transition-colors group text-xs">
                     <td className="px-6 py-4">
                       <div className="font-bold text-slate-800">{event.user}</div>
                       <div className="text-[9px] text-slate-400 font-bold uppercase">{event.id}</div>
                     </td>
                     <td className="px-6 py-4">
                       <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter">
                         {event.type}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-slate-400 font-medium">{event.time}</td>
                     <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-black uppercase border",
                          event.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          event.color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          event.color === 'red' ? 'bg-red-50 text-red-600 border-red-100' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        )}>
                          {event.status}
                        </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Right Sidebar Widget */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-4">Master Distribution</p>
               <h4 className="text-2xl font-black mb-2">12,042</h4>
               <p className="text-[11px] text-white/50 leading-relaxed mb-6 font-bold uppercase tracking-tight">Total Blends Distributed Globally via AI Logic</p>
               <div className="w-full bg-white/10 h-1.5 rounded-full mb-2">
                 <div className="bg-emerald-500 h-full w-[88%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               </div>
               <div className="flex justify-between text-[10px] font-black">
                 <span className="text-emerald-400">88% QUOTA ACHIEVED</span>
                 <span className="text-white/30">15.0K GOAL</span>
               </div>
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
             <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-4">Quick Protocols</h4>
             <div className="grid grid-cols-2 gap-3">
               <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-500 transition-colors group">
                 <Package className="text-slate-400 group-hover:text-emerald-600 transition-colors mb-2" size={20} />
                 <span className="text-[10px] font-black text-slate-800 uppercase">Inventory</span>
               </button>
               <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-500 transition-colors group">
                 <Circle className="text-slate-400 group-hover:text-emerald-600 transition-colors mb-2" size={20} />
                 <span className="text-[10px] font-black text-slate-800 uppercase">Snapshot</span>
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
