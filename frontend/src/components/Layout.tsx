import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/claims/new', icon: 'description', label: 'Claims Management' },
    { path: '#', icon: 'psychology', label: 'AI Insights' },
    { path: '#', icon: 'security', label: 'Risk Models' },
    { path: '#', icon: 'analytics', label: 'Reporting' },
    { path: '#', icon: 'settings', label: 'Settings' },
  ];

  return (
    <div className="flex bg-background text-on-background min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container">
      {/* Sidebar Navigation */}
      <aside className="w-[260px] h-screen fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col py-lg z-50">
        <div className="px-lg mb-3xl">
          <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">ClaimVision AI</h1>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider opacity-70 mt-1">Enterprise Suite</p>
        </div>
        
        <nav className="flex-1 flex flex-col gap-xs">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-md px-md py-sm transition-colors group ${
                  isActive
                    ? 'text-primary border-l-2 border-primary bg-primary-container/10 scale-[0.98]'
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto px-md flex flex-col gap-xs">
          <div className="px-md py-sm mb-md bg-primary-container/5 rounded-xl border border-primary/20">
            <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">System Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-label-md text-label-md text-on-surface">Active</span>
            </div>
          </div>
          <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-md text-label-md">Help Center</span>
          </a>
          <a className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Log Out</span>
          </a>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-[260px] min-h-screen relative overflow-hidden flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant z-40 flex justify-between items-center px-lg">
          <div className="flex items-center gap-lg w-1/3">
            <div className="relative w-full max-w-sm group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input 
                className="w-full bg-surface-container-highest/50 border-none rounded-xl pl-10 pr-4 py-2 text-body-md focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 outline-none" 
                placeholder="Search claims, VINs, or policy numbers..." 
                type="text" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-md">
            <button className="flex items-center gap-2 px-md py-2 bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              Export Report
            </button>
            <div className="h-8 w-px bg-outline-variant mx-2"></div>
            <button className="p-2 text-on-surface-variant hover:bg-surface-variant/20 rounded-xl transition-all relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-variant/20 rounded-xl transition-all">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-label-md text-on-surface">Alex Rivera</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Senior Adjuster</p>
              </div>
              <img 
                className="w-9 h-9 rounded-full border border-outline-variant object-cover" 
                alt="Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxrqwgNUJ6rAjZjEznBrHbESTinAAEk_SCAxadzuLFfhe8ARCu59NzPbt3UVBgBLEpLo8rJP3EPDO4egovqqpU51ZF2THMM_s22z88COObzrBT3sjbbxWAWmr0rIgvi1RZjCfN-DqjZSfy-5vlrufjK3bB0ZzebtUinsNGRCsQQ23qWxJvo6Z0iq9ISnTR_m5x7yfTAHKZ4RNc07lccVfUnjopBNyWI8WrBDRUAJilr0dPdWGMhyWu" 
              />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        {children}
        
        {/* Decorative Floating Gradient */}
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -z-10 rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      </main>
    </div>
  );
}
