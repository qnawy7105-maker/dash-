import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  CheckCircle,
  XCircle,
  Package,
  DollarSign,
  Tag,
  Clock
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { cn } from '../lib/utils';

export const ProductManager = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'products'));
    return () => unsub();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';
    try {
      await updateDoc(doc(db, 'products', id), { status: newStatus });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `products/${id}`);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `products/${id}`);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) || 
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Product Inventory Management</h2>
          <p className="text-xs text-slate-400 font-medium">Control your herbal catalog and stock levels.</p>
        </div>
        <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
          <Plus size={16} /> Add New Entry
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-slate-50 border-none rounded-lg text-xs focus:ring-1 focus:ring-emerald transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-emerald-600 transition-colors">
            <Filter size={14} />
          </button>
          <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] px-2 py-1.5 text-slate-600 font-bold outline-none">
            <option>All Segments</option>
            <option>Teas</option>
            <option>Supplements</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-[9px] tracking-[0.2em] font-black border-b border-slate-200">
              <th className="px-6 py-3">Product Identity</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Segment</th>
              <th className="px-6 py-3">Valuation</th>
              <th className="px-6 py-3">Inventory</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={product.id} 
                  className="hover:bg-white/40 transition-colors group"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center border border-slate-200">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="text-slate-400" size={16} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs">{product.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">ID: {product.sku || product.id.slice(0,8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <button 
                      onClick={() => toggleStatus(product.id, product.status)}
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase transition-all border",
                        product.status === 'active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                      )}
                    >
                      {product.status === 'active' ? <CheckCircle size={10} /> : <Clock size={10} />}
                      {product.status}
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                       {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-3">
                   <div className="font-bold text-slate-800 text-xs">${product.price?.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-3">
                    <div className={cn("text-[11px] font-bold", (product.stock || 0) < 10 ? "text-amber-600" : "text-slate-400")}>
                      {product.stock || 0} UNITS
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-slate-900 hover:text-white rounded-lg transition-colors"><Edit2 size={14} /></button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {!loading && filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-sage italic">
                  No products found. Start by adding a new blend.
                </td>
              </tr>
            )}
            {loading && (
               <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="w-6 h-6 border-2 border-sage/20 border-t-olive rounded-full animate-spin mx-auto"></div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
