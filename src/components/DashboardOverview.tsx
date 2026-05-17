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
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', sales: 4000, quiz: 2400 },
  { name: 'Tue', sales: 3000, quiz: 1398 },
  { name: 'Wed', sales: 2000, quiz: 9800 },
  { name: 'Thu', sales: 2780, quiz: 3908 },
  { name: 'Fri', sales: 1890, quiz: 4800 },
  { name: 'Sat', sales: 2390, quiz: 3800 },
  { name: 'Sun', sales: 3490, quiz: 4300 },
];

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <div className="glass p-6 rounded-3xl relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-3 rounded-2xl bg-olive/5 text-olive group-hover:bg-olive group-hover:text-cream transition-colors")}>
        <Icon size={24} />
      </div>
      <div className={cn("flex items-center gap-1 text-sm font-medium", trend === 'up' ? 'text-green-600' : 'text-red-600')}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}%
      </div>
    </div>
    <p className="text-sage text-sm mb-1">{title}</p>
    <h3 className="text-3xl font-bold text-olive tracking-tight">{value}</h3>
  </div>
);

export const DashboardOverview = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-olive tracking-tight font-arabic">أهلاً بك، أدمن</h2>
          <p className="text-sage mt-1">Here's what's happening with HerbaSense today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-sage/20 px-4 py-2 rounded-xl text-sm font-medium text-olive hover:bg-beige transition-colors">Download Report</button>
          <button className="bg-olive text-cream px-4 py-2 rounded-xl text-sm font-medium hover:bg-olive/90 transition-colors">Manage Store</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$42,850" change="12.5" trend="up" icon={TrendingUp} />
        <StatCard title="Total Orders" value="1,240" change="8.2" trend="up" icon={ShoppingCart} />
        <StatCard title="Quiz Completions" value="8,420" change="2.4" trend="down" icon={Users} />
        <StatCard title="Active Products" value="156" change="14.3" trend="up" icon={ShoppingBag} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-bold text-olive">Sales vs Quiz Activity</h4>
              <p className="text-sm text-sage">Weekly performance analysis</p>
            </div>
            <select className="bg-beige/50 border-none rounded-lg text-sm px-3 py-1 text-olive focus:ring-1 focus:ring-olive/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5A6344" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#5A6344" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQuiz" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8DA18E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8DA18E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8DA18E" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8DA18E', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8DA18E', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#5A6344" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="quiz" stroke="#8DA18E" strokeWidth={3} fillOpacity={1} fill="url(#colorQuiz)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl">
          <h4 className="text-xl font-bold text-olive mb-6">Recent Activity</h4>
          <div className="space-y-6">
            {[
              { id: 1, type: 'order', user: 'Layla Ahmed', action: 'placed an order for', target: 'Mints Blend', time: '2 mins ago', icon: ShoppingCart },
              { id: 2, type: 'quiz', user: 'Zaid Kareem', action: 'completed quiz', target: 'Herbal IQ', time: '12 mins ago', icon: CheckCircle2 },
              { id: 3, type: 'alert', user: 'System', action: 'Low stock alert', target: 'Lavender Tea', time: '1 hour ago', icon: AlertCircle },
              { id: 4, type: 'order', user: 'Sara Omer', action: 'refunded', target: '#ORD-928', time: '3 hours ago', icon: Clock },
            ].map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", 
                  item.type === 'order' ? 'bg-blue-50 text-blue-600' : 
                  item.type === 'quiz' ? 'bg-green-50 text-green-600' : 
                  'bg-amber-50 text-amber-600'
                )}>
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-bold text-olive">{item.user}</span>{' '}
                    <span className="text-sage">{item.action}</span>{' '}
                    <span className="font-medium text-olive">{item.target}</span>
                  </p>
                  <p className="text-[10px] text-sage mt-1 uppercase tracking-wider">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-2xl bg-beige text-olive hover:bg-sage/10 transition-colors text-sm font-bold">View All Activity</button>
        </div>
      </div>
    </motion.div>
  );
};
