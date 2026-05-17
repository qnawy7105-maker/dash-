import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Copy, RefreshCw, Type, FileText, Search, Tag, FolderTree } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { cn } from '../lib/utils';

export const AIContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('Product Description');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context }),
      });
      const data = await response.json();
      setResult(data.text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveToLibrary = async () => {
    try {
      await addDoc(collection(db, 'media'), {
        type: 'ai_text',
        content: result,
        context,
        createdAt: new Date().toISOString(),
      });
      alert('Saved to media library!');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'media');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-olive">AI Intelligence Assistant</h2>
        <p className="text-sage">Generate premium copy, SEO metadata, and product descriptions in seconds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="glass p-6 rounded-3xl">
            <h4 className="font-bold text-olive mb-4 flex items-center gap-2">
              <Type size={18} /> Content Type
            </h4>
            <div className="space-y-2">
              {['Product Description', 'Blog Article', 'SEO Meta', 'Social Caption', 'Email Newsletter'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setContext(t)}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-xl text-sm transition-all",
                    context === t ? "bg-olive text-cream" : "bg-beige/50 text-sage hover:bg-sage/10"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-3xl">
            <h4 className="font-bold text-olive mb-4 flex items-center gap-2">
              <Sparkles size={18} /> AI Tips
            </h4>
            <p className="text-xs text-sage leading-relaxed">
              Use specific adjectives like "organic", "soothing", "ethically sourced" to get better results for HerbaSense.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass p-6 rounded-3xl">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              className="w-full h-40 bg-beige/30 border-2 border-sage/10 rounded-2xl p-4 text-olive placeholder:text-sage focus:outline-none focus:border-olive/20 transition-colors resize-none"
            />
            <div className="mt-4 flex justify-between items-center">
              <p className="text-xs text-sage italic">Gemini 2.0 Flash Enterprise Model</p>
              <button 
                onClick={generate}
                disabled={loading}
                className="bg-olive text-cream px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-olive/90 disabled:opacity-50 transition-all shadow-lg shadow-olive/20"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Generate Magic
              </button>
            </div>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-[2.5rem] bg-olive text-cream leading-relaxed relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 flex gap-2">
                <button 
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Copy size={16} />
                </button>
                <button 
                  onClick={saveToLibrary}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FolderTree size={16} />
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                {result.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
