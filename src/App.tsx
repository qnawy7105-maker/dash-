import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, auth } from './lib/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { ProductManager } from './components/ProductManager';
import { AIContentGenerator } from './components/AIContentGenerator';
import { CMSPanel } from './components/CMSPanel';
import { QuizManager } from './components/QuizManager';
import { ThemeSettings } from './components/ThemeSettings';
import { MediaLibrary } from './components/MediaLibrary';
import { useUIStore } from './lib/store';
import { cn } from './lib/utils';
import { LogIn, Bell, Settings as SettingsIcon, Search, Menu, Moon, Sun } from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mb-4">
      <SettingsIcon className="text-sage w-10 h-10 animate-spin-slow" />
    </div>
    <h2 className="text-2xl font-bold text-olive">{title}</h2>
    <p className="text-sage max-w-sm mt-2">This module is being connected to the database. Premium features available soon.</p>
  </div>
);

export default function App() {
  const { currentView, sidebarOpen, setSidebarOpen, isDarkMode, toggleDarkMode } = useUIStore();
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingAuth(false);
    });
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardOverview />;
      case 'ai': return <AIContentGenerator />;
      case 'products': return <ProductManager />;
      case 'quiz': return <QuizManager />;
      case 'sections': return <CMSPanel />;
      case 'homepage': return <CMSPanel />;
      case 'theme': return <ThemeSettings />;
      case 'media': return <MediaLibrary />;
      default: return <PlaceholderView title={currentView.charAt(0).toUpperCase() + currentView.slice(1)} />;
    }
  };

  if (loadingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-beige">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-sage/20 border-t-olive rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-olive">HS</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-beige p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass max-w-md w-full p-10 rounded-[2.5rem] text-center"
        >
          <div className="w-20 h-20 bg-olive rounded-3xl mx-auto flex items-center justify-center mb-8 rotate-12 shadow-2xl">
            <LogIn className="text-cream w-10 h-10 -rotate-12" />
          </div>
          <h1 className="text-3xl font-bold text-olive mb-2">HerbaSense Admin</h1>
          <p className="text-sage mb-10">Premium access to your herbal empire starts here.</p>
          <button 
            onClick={login}
            className="w-full bg-olive text-cream py-4 rounded-2xl font-bold hover:bg-olive/90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-olive/20"
          >
            Authenticate via Google
          </button>
          <p className="mt-6 text-[10px] text-sage uppercase tracking-widest">Enterprise Security Enabled</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-800 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">{currentView.replace(/([A-Z])/g, ' $1').trim()} Operational Overview</h2>
              <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100 hidden md:block">
                LIVE STOREFRONT
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-64 h-9 pl-10 pr-4 bg-slate-100 border-none rounded-full text-xs focus:ring-2 focus:ring-emerald flex items-center transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{user.displayName}</p>
                <p className="text-[10px] text-slate-500 uppercase font-medium">System Architect</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-emerald p-0.5 overflow-hidden">
                <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50">
          <AnimatePresence mode="wait">
            <motion.div
              className="max-w-[1600px] mx-auto"
              key={currentView}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
