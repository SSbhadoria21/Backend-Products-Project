import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { Package, Activity, Database, Sparkles, AlertCircle, ChevronDown, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function ProductBrowser() {
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulateSuccess, setSimulateSuccess] = useState(false);
  
  const fetchingLock = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  useEffect(() => {
    fetchInitialData();
  }, [selectedCategory]);

  useEffect(() => {
    if (inView && nextCursor && !isLoading && !isFetchingNextPage && !fetchingLock.current) {
      fetchMoreProducts();
    }
  }, [inView, nextCursor, isLoading, isFetchingNextPage]);

  // Stats are fetched once initially and when simulating insert.
  // Real-time polling removed to guarantee no background re-renders interrupt scrolling.

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, catRes, prodRes] = await Promise.all([
        axios.get(`${API_URL}/stats`),
        axios.get(`${API_URL}/categories`),
        axios.get(`${API_URL}/products`, {
          params: { category: selectedCategory || undefined }
        })
      ]);
      setStats(statsRes.data);
      setCategories(catRes.data);
      setProducts(prodRes.data.data);
      setNextCursor(prodRes.data.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreProducts = async () => {
    if (fetchingLock.current) return;
    try {
      fetchingLock.current = true;
      setIsFetchingNextPage(true);
      const res = await axios.get(`${API_URL}/products`, {
        params: { 
          category: selectedCategory || undefined,
          cursor: nextCursor 
        }
      });
      
      // Filter out any potential duplicates just in case
      setProducts(prev => {
        const newProducts = res.data.data.filter(
          newP => !prev.some(p => p.id === newP.id)
        );
        return [...prev, ...newProducts];
      });
      setNextCursor(res.data.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingNextPage(false);
      fetchingLock.current = false;
    }
  };

  const simulateInsert = async () => {
    try {
      setIsSimulating(true);
      setSimulateSuccess(false);
      await axios.post(`${API_URL}/simulate`);
      const statsRes = await axios.get(`${API_URL}/stats`);
      setStats(statsRes.data);
      setSimulateSuccess(true);
      setTimeout(() => setSimulateSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="text-gradient">Browser</span>{' '}
            <span className="text-gradient-primary">200k+ Records</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-400 leading-relaxed"
          >
            A high-performance demonstration of cursor-based pagination. 
            Seamlessly browse massive datasets without missing rows or encountering duplicates.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-shrink-0 relative group"
        >
          <AnimatePresence>
            {simulateSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, y: 0, scale: 0.9 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-medium text-green-400 shadow-xl whitespace-nowrap"
              >
                +50 Items Inserted!
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={simulateInsert}
            disabled={isSimulating}
            className="glow-button flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-xl shadow-indigo-500/25"
          >
            {isSimulating ? (
              <Activity className="animate-spin" size={20} />
            ) : (
              <Sparkles size={20} />
            )}
            Simulate Insert
          </button>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <StatsCard 
          delay={0.3}
          title="Total Records" 
          value={stats ? stats.totalProducts.toLocaleString() : "..."} 
          icon={<Database className="text-indigo-400" size={20} />} 
        />
        <StatsCard 
          delay={0.4}
          title="Available Categories" 
          value={stats ? stats.totalCategories.toString() : "..."} 
          icon={<Package className="text-fuchsia-400" size={20} />} 
        />
        <StatsCard 
          delay={0.5}
          title="Query Latency" 
          value="< 80ms" 
          icon={<Activity className="text-emerald-400" size={20} />} 
        />
      </div>

      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
          <h2 className="text-2xl font-semibold text-zinc-100">Live Catalog</h2>
        </div>
        
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-sm rounded-xl pl-4 pr-10 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer backdrop-blur-sm"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="glass-panel p-6 group cursor-default relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-6">
              <div className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                {product.category}
              </div>
              <div className="flex items-baseline text-indigo-400">
                <span className="text-sm font-semibold mr-0.5">$</span>
                <span className="text-xl font-bold">{Math.floor(product.price)}</span>
                <span className="text-xs font-medium">.{(product.price % 1).toFixed(2).substring(2)}</span>
              </div>
            </div>
            
            <h3 className="text-[17px] font-semibold text-zinc-100 mb-3 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
              {product.name}
            </h3>
            
            <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 font-medium">
              <Clock size={12} className="text-zinc-600" />
              <span>
                {new Date(product.createdAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700 mx-1" />
              <span>
                {new Date(product.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-panel p-6 animate-pulse">
              <div className="flex justify-between mb-6">
                <div className="w-20 h-6 bg-zinc-800 rounded-md" />
                <div className="w-16 h-6 bg-zinc-800 rounded-md" />
              </div>
              <div className="w-full h-5 bg-zinc-800 rounded-md mb-2" />
              <div className="w-2/3 h-5 bg-zinc-800 rounded-md" />
              <div className="mt-8 w-1/2 h-4 bg-zinc-800/50 rounded-md" />
            </div>
          ))}
        </div>
      )}

      <div ref={ref} className="h-24 w-full flex items-center justify-center mt-8">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 text-zinc-500 text-sm font-medium border border-zinc-800/50">
            <Activity className="animate-spin" size={14} /> Loading more
          </div>
        )}
      </div>

      {!isLoading && !nextCursor && products.length > 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-500">
          <div className="w-12 h-12 mb-4 rounded-full bg-zinc-900/50 flex items-center justify-center border border-zinc-800/50">
            <Package size={20} className="text-zinc-600" />
          </div>
          <p className="font-medium text-zinc-400">You've reached the end</p>
          <p className="text-sm mt-1">All products in this category have been loaded.</p>
        </div>
      )}
    </main>
  );
}

function StatsCard({ title, value, icon, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-panel p-6 flex items-center gap-5 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="p-3.5 bg-zinc-800/50 rounded-xl border border-zinc-700/50 shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-bold text-zinc-100 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
