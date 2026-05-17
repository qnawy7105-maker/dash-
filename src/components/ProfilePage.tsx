import React from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Shield, Mail, Calendar, Key } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export const ProfilePage = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('herbasense_admin_session');
      window.location.reload(); // Hard reset for clean state
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">User Security Profile</h2>
        <p className="text-xs text-slate-400 font-medium">Manage your administrative access and credentials.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-olive relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-24 h-24 rounded-3xl bg-white p-1 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
              ) : (
                <div className="w-full h-full bg-emerald text-white flex items-center justify-center font-bold text-3xl uppercase rounded-2xl">
                  {user.email?.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-14 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{user.displayName || user.email?.split('@')[0]}</h3>
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-1">System Architect • Level 5 Auth</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100"
            >
              <LogOut size={14} /> Terminate Session
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-3 text-slate-400 mb-2">
                 <Mail size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Email Identity</span>
               </div>
               <p className="text-sm font-bold text-slate-800">{user.email}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-3 text-slate-400 mb-2">
                 <Shield size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Auth Method</span>
               </div>
               <p className="text-sm font-bold text-slate-800">{user.providerData[0]?.providerId === 'google.com' ? 'Google SSO' : 'Email/Pass Credentials'}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-3 text-slate-400 mb-2">
                 <Calendar size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Creation Date</span>
               </div>
               <p className="text-sm font-bold text-slate-800">{new Date(user.metadata.creationTime || '').toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-3 text-slate-400 mb-2">
                 <Key size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Unique System ID</span>
               </div>
               <p className="text-[10px] font-mono font-bold text-slate-800 break-all">{user.uid}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
        <div className="relative z-10 flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
             <Shield className="text-white" size={32} />
           </div>
           <h4 className="text-xl font-bold mb-2">Enterprise Security Protocol</h4>
           <p className="text-xs opacity-70 max-w-sm mb-6 leading-relaxed">Your account is protected by Botanica Enterprise Shield. All actions are logged and audited in real-time.</p>
           <button className="bg-white text-emerald-700 px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">View Security Logs</button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-all"></div>
      </div>
    </div>
  );
};
