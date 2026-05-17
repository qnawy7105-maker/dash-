import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  GripVertical, 
  Trash2, 
  Plus, 
  Type, 
  Image as ImageIcon, 
  Layout, 
  Eye, 
  Save,
  ArrowRight,
  Sparkles,
  Edit2
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { cn } from '../lib/utils';

export const CMSPanel = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'sections'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setSections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'sections'));
    return () => unsub();
  }, []);

  const addSection = async () => {
    const id = Date.now().toString();
    try {
      await setDoc(doc(db, 'sections', id), {
        title: 'New Section',
        type: 'hero',
        content: { text: 'Welcome to HerbaSense', cta: 'Shop Now' },
        order: sections.length,
        visible: true
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'sections');
    }
  };

  const deleteSection = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'sections', id));
    } catch (e) { handleFirestoreError(e, OperationType.DELETE, `sections/${id}`); }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-olive">Homepage Sections</h2>
          <p className="text-sage">Drag to reorder your homepage layout in real-time.</p>
        </div>
        <button 
          onClick={addSection}
          className="bg-olive text-cream px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-olive/90 transition-all shadow-lg shadow-olive/20"
        >
          <Plus size={20} /> Add Section
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {sections.map((section, idx) => (
            <motion.div 
               layout
               key={section.id}
               className="glass p-4 rounded-3xl group"
            >
              <div className="flex items-center gap-4">
                <div className="cursor-grab active:cursor-grabbing text-sage hover:text-olive">
                  <GripVertical size={20} />
                </div>
                <div className="w-12 h-12 bg-olive shadow-inner rounded-xl flex items-center justify-center text-cream">
                  <Layout size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-olive">{section.title}</h4>
                    <span className="text-[10px] bg-sage/10 text-sage px-2 py-0.5 rounded-full font-bold uppercase">{section.type}</span>
                  </div>
                  <p className="text-xs text-sage mt-0.5">Order index: {idx}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-sage/10 rounded-lg text-olive transition-colors"><Edit2 size={16} /></button>
                  <button className="p-2 hover:bg-sage/10 rounded-lg text-olive transition-colors"><Eye size={16} /></button>
                  <button 
                    onClick={() => deleteSection(section.id)}
                    className="p-2 hover:bg-red-50/50 rounded-lg text-red-500 transition-colors"
                  ><Trash2 size={16} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] bg-olive text-cream">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles size={22} className="text-cream" /> AI Layout Suggestions
            </h3>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              Based on your current inventory, we suggest adding a "Seasonal Detox" banner below the Hero section to increase conversion by 12%.
            </p>
            <button className="w-full bg-cream text-olive py-3 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform">Apply Suggestion</button>
          </div>

          <div className="glass p-6 rounded-3xl border-dashed border-2 border-sage/20 bg-transparent flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 bg-beige rounded-2xl flex items-center justify-center mb-4 border border-sage/10">
              <Save className="text-sage" size={24} />
            </div>
            <h4 className="text-olive font-bold">Autosave Enabled</h4>
            <p className="text-xs text-sage mt-1">Every change is instantly pushed to the production website.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
