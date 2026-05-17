import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Upload, Search, Folder, MoreHorizontal, Grid, List as ListIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const MediaLibrary = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const items = [
    { id: 1, name: 'hero_herbal_main.jpg', size: '2.4mb', type: 'image', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'product_sage_tea.png', size: '1.2mb', type: 'image', url: 'https://images.unsplash.com/photo-1544787210-2213d2427507?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'quiz_bg_calm.jpg', size: '3.1mb', type: 'image', url: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'logo_herbasense_dark.svg', size: '12kb', type: 'vector', url: '' },
    { id: 5, name: 'customer_review_1.jpg', size: '890kb', type: 'image', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-olive">Media Library</h2>
          <p className="text-sage">Manage your brand assets and optimize website imagery.</p>
        </div>
        <button className="bg-olive text-cream px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-olive/90 transition-all shadow-lg shadow-olive/20">
          <Upload size={20} /> Upload Media
        </button>
      </div>

      <div className="glass p-4 rounded-2xl flex justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={18} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full h-10 pl-10 pr-4 bg-white/50 border border-sage/10 rounded-xl text-sm outline-none focus:ring-1 focus:ring-olive/20"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-sage/10 rounded-lg text-olive transition-colors"><Folder size={18} /></button>
          </div>
        </div>
        <div className="flex bg-beige/50 p-1 rounded-xl border border-sage/10">
           <button 
            onClick={() => setView('grid')}
            className={cn("p-1.5 rounded-lg transition-all", view === 'grid' ? "bg-white text-olive shadow-sm" : "text-sage")}
           >
             <Grid size={18} />
           </button>
           <button 
            onClick={() => setView('list')}
            className={cn("p-1.5 rounded-lg transition-all", view === 'list' ? "bg-white text-olive shadow-sm" : "text-sage")}
           >
             <ListIcon size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((item) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={item.id}
                className="glass rounded-2xl p-3 group relative cursor-pointer"
              >
                <div className="aspect-square bg-beige rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                  {item.url ? (
                    <img src={item.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <ImageIcon className="text-sage" size={32} />
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-olive truncate">{item.name}</p>
                    <p className="text-[10px] text-sage uppercase">{item.size} • {item.type}</p>
                  </div>
                  <button className="text-sage hover:text-olive"><MoreHorizontal size={16} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-[2rem] overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-sage/5">
                   <tr className="text-[10px] text-sage uppercase font-bold tracking-widest leading-none">
                     <th className="px-6 py-4">Asset</th>
                     <th className="px-6 py-4">Type</th>
                     <th className="px-6 py-4">Size</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-sage/10">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-beige rounded-lg flex-shrink-0 animate-pulse"></div>
                           <span className="text-sm font-bold text-olive">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-xs text-sage">{item.type}</td>
                      <td className="px-6 py-3 text-xs text-sage">{item.size}</td>
                      <td className="px-6 py-3 text-right">
                        <button className="p-2 hover:bg-olive hover:text-cream rounded-lg transition-colors"><MoreHorizontal size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
};
