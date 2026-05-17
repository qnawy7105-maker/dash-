import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Settings as SettingsIcon, 
  ArrowRight, 
  Plus, 
  MessageSquare, 
  Zap, 
  Database,
  BrainCircuit,
  Trash2,
  Edit3
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { cn } from '../lib/utils';

export const QuizManager = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'quiz', 'main'), (snapshot) => {
      if (snapshot.exists()) {
        setConfig(snapshot.data());
      }
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'quiz/main'));
    return () => unsub();
  }, []);

  const defaultQuestions = [
    { id: 1, text: "How do you feel today?", options: ["Stressed", "Tired", "Energetic"] },
    { id: 2, text: "What is your primary wellness goal?", options: ["Sleep Better", "Detox", "Focus"] },
    { id: 3, text: "Do you prefer strong flavors?", options: ["Yes", "No", "Sometimes"] },
  ];

  const questions = config?.questions || defaultQuestions;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-olive">Intelligence Quiz Logic</h2>
          <p className="text-sage">Design the customer journey from symptoms to herbal recommendations.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-sage/20 px-6 py-3 rounded-2xl font-bold text-olive flex items-center gap-2 hover:bg-beige transition-all">
            <Zap size={18} /> Run Simulator
          </button>
          <button className="bg-olive text-cream px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-olive/90 transition-all shadow-lg shadow-olive/20">
            <Plus size={20} /> Add Question
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center gap-4 py-4 px-6 bg-sage/5 rounded-2xl border border-dashed border-sage/20">
            <div className="w-10 h-10 bg-olive text-cream rounded-full flex items-center justify-center font-bold">1</div>
            <div className="flex-1">
              <p className="font-bold text-olive">Entry Point</p>
              <p className="text-xs text-sage italic">User starts the quiz from Homepage CTA</p>
            </div>
            <ArrowRight className="text-sage" size={20} />
          </div>

          <div className="space-y-4">
            {questions.map((q: any, i: number) => (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2.5rem] relative"
              >
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-olive shadow-lg rounded-2xl flex items-center justify-center text-cream">
                          <MessageSquare size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] text-sage uppercase font-bold tracking-widest mb-1">Question {i + 1}</p>
                          <h4 className="text-xl font-bold text-olive">{q.text}</h4>
                        </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2.5 bg-beige/50 text-olive rounded-xl hover:bg-olive hover:text-cream transition-all"><Edit3 size={18} /></button>
                       <button className="p-2.5 bg-beige/50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {q.options.map((opt: string) => (
                      <div key={opt} className="bg-white border border-sage/10 rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:border-olive/20 transition-all">
                        <span className="text-sm font-medium text-olive">{opt}</span>
                        <ArrowRight size={14} className="text-sage opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    ))}
                    <button className="border-2 border-dashed border-sage/10 rounded-2xl p-4 flex items-center justify-center text-sage hover:text-olive hover:border-olive/20 transition-all text-sm font-medium">
                      + Add Option
                    </button>
                 </div>

                 <div className="mt-8 pt-8 border-t border-sage/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-sage">
                      <BrainCircuit size={14} /> Logic: Map to <span className="font-bold text-olive uppercase">Flavor Profile</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="h-[1px] w-12 bg-sage/20"></div>
                       <ArrowRight className="text-sage" size={16} />
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
             <button className="group flex flex-col items-center gap-3">
               <div className="w-12 h-12 bg-cream border-2 border-dashed border-sage/20 rounded-full flex items-center justify-center text-sage group-hover:bg-olive group-hover:text-cream group-hover:border-olive transition-all">
                  <Plus size={24} />
               </div>
               <span className="text-xs font-bold text-sage uppercase tracking-widest">Connect next step</span>
             </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem]">
            <h4 className="font-bold text-olive mb-6 flex items-center gap-2"><Database size={18} /> Global Analytics</h4>
            <div className="space-y-4">
              <div className="bg-sage/5 p-4 rounded-2xl border border-sage/10">
                <p className="text-[10px] text-sage font-bold uppercase tracking-widest mb-1">Total Completions</p>
                <p className="text-2xl font-bold text-olive">12,482</p>
                <div className="mt-2 text-[10px] text-green-600 font-bold flex items-center gap-1">
                  <Zap size={10} fill="currentColor" /> +14% from last week
                </div>
              </div>
              <div className="bg-sage/5 p-4 rounded-2xl border border-sage/10">
                <p className="text-[10px] text-sage font-bold uppercase tracking-widest mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-olive">8.2%</p>
                <div className="mt-2 text-[10px] text-sage font-bold uppercase tracking-widest">Top Goal: Relax</div>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] bg-olive text-cream">
            <h4 className="font-bold text-cream mb-4 flex items-center gap-2"><SettingsIcon size={18} /> Recommendation Engine</h4>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              Your AI has mapped these responses to <span className="underline decoration-gold underline-offset-4">Chamomile & Valerian</span> blends for 82% of users.
            </p>
            <button className="w-full bg-cream text-olive py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl shadow-black/10">
              Tune AI Logic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
