import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Database, UserCircle2 } from 'lucide-react';
import ProductBrowser from './pages/ProductBrowser.jsx';
import DeveloperProfile from './pages/DeveloperProfile.jsx';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <Database size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-zinc-100 tracking-tight">SSB_Product Data</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'}`}
          >
            Browser
          </Link>
          <Link 
            to="/developer" 
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${location.pathname === '/developer' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'}`}
          >
            <UserCircle2 size={16} /> Developer
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-x-hidden bg-zinc-950">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        <Navigation />

        <Routes>
          <Route path="/" element={<ProductBrowser />} />
          <Route path="/developer" element={<DeveloperProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
