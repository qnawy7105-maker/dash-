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
import { ProfilePage } from './components/ProfilePage';
import { useUIStore } from './lib/store';
import { cn } from './lib/utils';
import { LogIn, Bell, Settings as SettingsIcon, Search, Menu, Moon, Sun } from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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
  const { currentView, setCurrentView, sidebarOpen, setSidebarOpen, isDarkMode, toggleDarkMode } = useUIStore();
  const [user, setUser] = useState<any>({
    uid: 'admin-gmail-com',
    email: 'admin@gmail.com',
    displayName: 'admin@gmail.com',
    photoURL: null
  });
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123456789');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    // Session is now hardcoded for the requested admin credentials
    setLoadingAuth(false);
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem('herbasense_admin_session', JSON.stringify(result.user));
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  // Development bypass for demo purposes
  const directLogin = () => {
    const mockUser = {
      uid: 'dev-admin',
      email: 'admin@gmail.com',
      displayName: 'System Architect',
      photoURL: null
    };
    setUser(mockUser);
    localStorage.setItem('herbasense_admin_session', JSON.stringify(mockUser));
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Instant local bypass for requested admin credentials
    if (email === 'admin@gmail.com' && password === '123456789') {
      directLogin();
      return;
    }

    try {
      if (authMode === 'login') {
        const result = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('herbasense_admin_session', JSON.stringify(result.user));
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem('herbasense_admin_session', JSON.stringify(result.user));
      }
    } catch (err: any) {
      setAuthError(err.message);
    }
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
      case 'profile': return <ProfilePage />;
      default: return <PlaceholderView title={currentView.charAt(0).toUpperCase() + currentView.slice(1)} />;
    }
  };

  if (loadingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-emerald/20 border-t-emerald rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white max-w-sm w-full p-8 rounded-3xl shadow-2xl border border-slate-100"
        >
          <div className="w-14 h-14 bg-olive rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-emerald-900/20">
            <LogIn className="text-white w-7 h-7" />
          </div>
          <h1 className="text-xl font-black text-slate-900 mb-1 text-center tracking-tight uppercase">Botanica Console</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8 text-center">Secure Admin Protocol</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Terminal ID</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                placeholder="admin@gmail.com"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                placeholder="123456789"
              />
            </div>

            {authError && <p className="text-[10px] text-red-500 font-bold text-center mt-2">{authError}</p>}

            <button 
              onClick={(e) => handleEmailAuth(e as any)}
              className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 mt-2"
            >
              Enter Dashboard
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400"><span className="bg-white px-3">Protocol Bypass</span></div>
          </div>

          <button 
            onClick={loginWithGoogle}
            className="w-full border border-slate-200 text-slate-600 py-3 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
            Continue with Google
          </button>

          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="w-full mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors"
          >
            {authMode === 'login' ? "Deploy new credentials?" : "Return to login"}
          </button>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button 
              onClick={directLogin}
              className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-emerald-500 transition-colors w-full"
            >
              [ EMERGENCY OVERRIDE: BYPASS AUTH ]
            </button>
          </div>
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
            
            <div 
              className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-1.5 rounded-2xl transition-all"
              onClick={() => setCurrentView('profile')}
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{user.displayName || user.email?.split('@')[0]}</p>
                <p className="text-[10px] text-slate-500 uppercase font-medium">System Architect</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-emerald p-0.5 overflow-hidden flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald text-white flex items-center justify-center font-bold text-xs uppercase rounded-full">
                    {user.email?.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50">
          <div className="max-w-[1600px] mx-auto">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}
