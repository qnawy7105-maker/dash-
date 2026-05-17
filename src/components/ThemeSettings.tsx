import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Layout, MousePointer2, Wand2, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const ThemeSettings = () => {
  const [activeTheme, setActiveTheme] = useState('organic');
  
  const themes = [
    { id: 'organic', name: 'Herbal Organic', primary: '#5A6344', secondary: '#8DA18E', bg: '#F5F2ED' },
    { id: 'minimal', name: 'Modern Minimal', primary: '#1A1C19', secondary: '#8DA18E', bg: '#FFFFFF' },
    { id: 'royal', name: 'Premium Gold', primary: '#D4AF37', secondary: '#1A1C19', bg: '#FDFBF7' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-olive">Visual Identity & Theme</h2>
        <p className="text-sage">Customize your website's look and feel with one click.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold text-olive mb-6 flex items-center gap-2"><Palette size={20} /> Color Presets</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themes.map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => setActiveTheme(t.id)}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all text-left group",
                      activeTheme === t.id ? "border-olive bg-olive/5" : "border-sage/10 hover:border-sage/30 bg-white"
                    )}
                  >
                    <div className="flex gap-1 mb-3">
                       <div className="w-6 h-6 rounded-full" style={{ backgroundColor: t.primary }}></div>
                       <div className="w-6 h-6 rounded-full" style={{ backgroundColor: t.secondary }}></div>
                       <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: t.bg }}></div>
                    </div>
                    <p className={cn("font-bold text-sm", activeTheme === t.id ? "text-olive" : "text-sage group-hover:text-olive")}>{t.name}</p>
                    {activeTheme === t.id && <div className="mt-2 text-[10px] text-olive font-bold uppercase flex items-center gap-1"><Check size={10} /> Applied</div>}
                  </button>
                ))}
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold text-olive mb-6 flex items-center gap-2"><Type size={20} /> Typography</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-sage uppercase tracking-widest block mb-2">Heading Font</label>
                  <select className="w-full bg-beige/30 border border-sage/10 rounded-xl p-3 text-olive outline-none">
                    <option>Cairo (Arabic Preferred)</option>
                    <option>IBM Plex Sans Arabic</option>
                    <option>Playfair Display</option>
                  </select>
                </div>
                <div>
                   <label className="text-xs font-bold text-sage uppercase tracking-widest block mb-2">Body Font</label>
                   <select className="w-full bg-beige/30 border border-sage/10 rounded-xl p-3 text-olive outline-none">
                    <option>Inter</option>
                    <option>Montserrat</option>
                    <option>Roboto</option>
                  </select>
                </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[3rem] bg-olive text-cream text-center relative overflow-hidden">
             <div className="relative z-10">
                <Wand2 className="mx-auto mb-4 w-12 h-12 text-gold animate-pulse" />
                <h4 className="text-xl font-bold mb-2">AI Auto-Beautifier</h4>
                <p className="text-sm opacity-80 mb-6">Let our AI analyze your product images and suggest the perfect accent colors.</p>
                <button className="bg-cream text-olive px-6 py-3 rounded-2xl font-bold text-sm w-full hover:scale-105 transition-transform">Analyze Portfolio</button>
             </div>
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-olive to-dark-sage opacity-50"></div>
          </div>

          <div className="glass p-8 rounded-[2.5rem]">
            <h4 className="font-bold text-olive mb-4 flex items-center gap-2"><MousePointer2 size={18} /> Interaction Settings</h4>
            <div className="space-y-3">
              {[
                { label: 'Glassmorphism', active: true },
                { label: 'Soft Shadows', active: true },
                { label: 'Page Transitions', active: true },
                { label: 'Scroll Parallax', active: false },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center bg-sage/5 p-3 rounded-xl">
                  <span className="text-sm text-olive">{s.label}</span>
                  <div className={cn("w-10 h-5 rounded-full transition-colors relative cursor-pointer", s.active ? "bg-olive" : "bg-sage/20")}>
                    <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", s.active ? "left-6" : "left-1")}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
