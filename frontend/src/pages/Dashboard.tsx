import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { claimService } from '../services/api';

export default function Dashboard() {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    claimService.getClaims()
      .then(res => setClaims(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 bg-background">
      <div className="p-xl max-w-[1600px] mx-auto pb-[100px]">
        {/* Page Header */}
        <div className="mb-xl flex items-end justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Welcome, Lead Adjuster.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Platform-wide analysis summary as of today.</p>
          </div>
          <div className="flex gap-sm">
            <div className="px-md py-sm glass-panel rounded-xl flex items-center gap-md">
              <span className="material-symbols-outlined text-primary" data-icon="calendar_today">calendar_today</span>
              <span className="font-label-md text-label-md">Oct 24, 2023 - Oct 31, 2023</span>
            </div>
          </div>
        </div>
        
        {/* Row 1: High Density Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          <div className="glass-panel p-lg rounded-xl relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined !text-[64px]" data-icon="description">description</span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-sm">Total Claims</p>
            <div className="flex items-baseline gap-sm">
              <h3 className="font-headline-lg text-headline-lg">{claims.length > 0 ? claims.length : '1,248'}</h3>
              <span className="text-emerald-400 font-label-md text-label-md flex items-center">
                <span className="material-symbols-outlined !text-[16px]" data-icon="trending_up">trending_up</span> 12%
              </span>
            </div>
          </div>
          
          <div className="glass-panel p-lg rounded-xl relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined !text-[64px]" data-icon="auto_awesome">auto_awesome</span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-sm">Analyzed by AI</p>
            <div className="flex items-baseline gap-sm">
              <h3 className="font-headline-lg text-headline-lg">98%</h3>
              <span className="text-on-surface-variant font-label-md text-label-md">Target: 95%</span>
            </div>
          </div>
          
          <div className="glass-panel p-lg rounded-xl relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined !text-[64px]" data-icon="warning">warning</span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-sm">High Risk Flagged</p>
            <div className="flex items-baseline gap-sm">
              <h3 className="font-headline-lg text-headline-lg text-error">42</h3>
              <span className="text-rose-400 font-label-md text-label-md flex items-center">
                <span className="material-symbols-outlined !text-[16px]" data-icon="priority_high">priority_high</span> Urgent
              </span>
            </div>
          </div>
          
          <div className="glass-panel p-lg rounded-xl relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined !text-[64px]" data-icon="timer">timer</span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-sm">Avg Analysis Time</p>
            <div className="flex items-baseline gap-sm">
              <h3 className="font-headline-lg text-headline-lg">4.2m</h3>
              <span className="text-emerald-400 font-label-md text-label-md flex items-center">
                <span className="material-symbols-outlined !text-[16px]" data-icon="trending_down">trending_down</span> -0.8m
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Insights and Distribution */}
        <div className="grid grid-cols-12 gap-lg lg:h-[600px]">
          {/* AI Insights Panel (2/3 width) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">
            {/* Critical Alerts */}
            <div className="glass-panel rounded-xl p-lg bg-surface-container-high/50 border-l-4 border-l-primary">
              <div className="flex items-center justify-between mb-md">
                <div className="flex items-center gap-md">
                  <span className="material-symbols-outlined text-primary" data-icon="psychology">psychology</span>
                  <h4 className="font-title-lg text-title-lg">AI Critical Insight</h4>
                </div>
                <span className="bg-primary-container/20 text-primary px-sm py-xs rounded text-[10px] uppercase font-bold tracking-widest">Processing</span>
              </div>
              <p className="text-body-md text-on-surface-variant">Pattern detected: Increase in rear-end collision severity reports in Northern District. Cross-referencing with local weather data suggests 15% fraud probability on pending cases.</p>
            </div>
            
            {/* Recent Claims Table */}
            <div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden">
              <div className="p-lg border-b border-outline-variant flex items-center justify-between">
                <h4 className="font-title-lg text-title-lg">Recent Claims</h4>
                <button className="text-primary font-label-md text-label-md hover:underline">View All</button>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                {loading ? (
                  <div className="flex justify-center py-10">
                    <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low/50 sticky top-0">
                      <tr className="font-label-md text-label-md text-on-surface-variant uppercase border-b border-outline-variant">
                        <th className="px-lg py-md font-normal">Claim ID</th>
                        <th className="px-lg py-md font-normal">Vehicle</th>
                        <th className="px-lg py-md font-normal">Risk Level</th>
                        <th className="px-lg py-md font-normal">Date</th>
                        <th className="px-lg py-md font-normal text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/30">
                      {claims.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-10 text-center text-on-surface-variant">No claims found.</td>
                        </tr>
                      ) : (
                        claims.map(claim => (
                          <tr key={claim.id} className="hover:bg-surface-container-high/30 transition-colors group">
                            <td className="px-lg py-md font-code text-code text-primary">#{claim.id}</td>
                            <td className="px-lg py-md text-body-md">
                              {claim.vehicle_year} {claim.vehicle_brand} {claim.vehicle_model}
                            </td>
                            <td className="px-lg py-md">
                              <span className={`inline-flex items-center px-sm py-1 rounded-full text-[10px] font-bold ${
                                claim.status === 'ANALYZED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {claim.status === 'ANALYZED' ? 'LOW' : 'PENDING'}
                              </span>
                            </td>
                            <td className="px-lg py-md text-on-surface-variant text-body-md">
                              {new Date(claim.created_at || Date.now()).toLocaleDateString()}
                            </td>
                            <td className="px-lg py-md text-right">
                              <Link to={`/claims/${claim.id}`} className="text-primary font-label-md hover:underline">
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          
          {/* Claim Distribution & Quick Start (1/3 width) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg h-full">
            {/* Claim Distribution Chart Placeholder */}
            <div className="glass-panel rounded-xl flex-1 p-lg flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between mb-lg">
                <h4 className="font-title-lg text-title-lg">Claim Distribution</h4>
                <span className="material-symbols-outlined text-on-surface-variant" data-icon="info">info</span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-lg relative">
                {/* SVG Chart Placeholder */}
                <div className="w-48 h-48 rounded-full border-[20px] border-surface-container-highest relative flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 192 192">
                    <circle cx="96" cy="96" fill="transparent" r="86" stroke="#3b82f6" strokeDasharray="540" strokeDashoffset="120" strokeLinecap="round" strokeWidth="20"></circle>
                    <circle cx="96" cy="96" fill="transparent" r="86" stroke="#fbbf24" strokeDasharray="540" strokeDashoffset="400" strokeLinecap="round" strokeWidth="20"></circle>
                    <circle cx="96" cy="96" fill="transparent" r="86" stroke="#f43f5e" strokeDasharray="540" strokeDashoffset="480" strokeLinecap="round" strokeWidth="20"></circle>
                  </svg>
                  <div className="text-center">
                    <p className="font-headline-md text-headline-md">1.2k</p>
                    <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest">Total</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-md w-full">
                  <div className="text-center">
                    <p className="font-label-md text-emerald-400">Low</p>
                    <p className="font-title-lg">68%</p>
                  </div>
                  <div className="text-center border-x border-outline-variant/30 px-md">
                    <p className="font-label-md text-amber-400">Med</p>
                    <p className="font-title-lg">22%</p>
                  </div>
                  <div className="text-center">
                    <p className="font-label-md text-rose-400">High</p>
                    <p className="font-title-lg">10%</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Start CTA */}
            <div className="glass-panel rounded-xl p-lg bg-gradient-to-br from-primary-container/20 to-secondary-container/10 border-primary/30 group">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-title-lg text-title-lg text-primary mb-sm">Accelerate Analysis</h4>
                  <p className="text-body-md text-on-surface-variant">Batch upload claim documentation for rapid AI scoring and fraud detection.</p>
                </div>
                <Link to="/claims/new" className="mt-lg w-full bg-primary text-on-primary py-md rounded-xl font-bold flex items-center justify-center gap-md hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined" data-icon="bolt">bolt</span>
                  Start New Analysis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
