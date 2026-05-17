import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Home, 
  Layers, 
  HelpCircle, 
  ShoppingBag, 
  FolderTree, 
  ChevronRight, 
  Image, 
  Settings, 
  BarChart3,
  MessageSquare,
  Bell,
  Sparkles,
  Search,
  Globe,
  Palette,
  Type,
  FileText,
  Users
} from 'lucide-react';
import { useUIStore } from '../lib/store';
import { cn } from '../lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'homepage', label: 'Homepage Control', icon: Home },
  { id: 'sections', label: 'Sections Manager', icon: Layers },
  { id: 'quiz', label: 'Quiz System', icon: HelpCircle },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'categories', label: 'Categories', icon: FolderTree },
  { id: 'media', label: 'Media Library', icon: Image },
  { id: 'theme', label: 'Theme & Colors', icon: Palette },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'seo', label: 'SEO Settings', icon: Search },
  { id: 'pages', label: 'Pages Manager', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai', label: 'AI Content Generator', icon: Sparkles },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const { currentView, setCurrentView, sidebarOpen } = useUIStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 80 }}
      className="h-screen bg-olive text-white border-r border-slate-200 shadow-xl z-50 flex flex-col sticky top-0 overflow-hidden"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald rounded-lg flex items-center justify-center shadow-inner">
          <div className="w-4 h-4 bg-white rounded-full opacity-80" />
        </div>
        {sidebarOpen && (
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl tracking-tight whitespace-nowrap"
          >
            Botanica<span className="text-emerald-light">AI</span>
          </motion.h1>
        )}
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto no-scrollbar">
        {sidebarOpen && (
           <div className="bg-emerald/10 border-l-4 border-emerald-light p-3 rounded-r-lg mb-4">
             <p className="text-emerald-light text-[10px] font-bold uppercase tracking-widest">Admin Core</p>
           </div>
        )}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative",
              currentView === item.id 
                ? "bg-white/10 text-white" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("w-5 h-5 flex-shrink-0", currentView === item.id ? "text-emerald-light" : "opacity-70 group-hover:opacity-100 transition-opacity")} />
            {sidebarOpen && (
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
            {currentView === item.id && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute right-3 w-1.5 h-1.5 bg-emerald-light rounded-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mb-4 mx-3">
        <div className="bg-emerald/20 p-4 rounded-2xl border border-emerald-light/20">
          <p className="text-[10px] text-emerald-light font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-light animate-pulse"></span> AI Assistant Active
          </p>
          <p className="text-[11px] text-white/70 leading-relaxed">
            Generate herbal descriptions or optimize SEO instantly.
          </p>
        </div>
      </div>
    </motion.aside>
  );
};
