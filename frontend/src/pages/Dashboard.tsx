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
    <div className="flex-1 p-xl overflow-y-auto pb-[100px]">
      <div className="flex justify-between items-start mb-xl">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Claims Dashboard</h2>
          <p className="text-on-surface-variant font-body-md">Overview of all vehicle insurance claims and AI analysis status.</p>
        </div>
        <Link 
          to="/claims/new" 
          className="flex items-center gap-2 px-md py-sm bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:opacity-90 transition-opacity glowing-btn"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Initialize New Claim
        </Link>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
            <p className="font-label-md text-on-surface-variant">Loading claims...</p>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container/50 text-on-surface-variant text-xs uppercase tracking-wider font-label-md">
                <th className="py-4 px-6 font-normal">Claim ID</th>
                <th className="py-4 px-6 font-normal">Vehicle</th>
                <th className="py-4 px-6 font-normal">Date</th>
                <th className="py-4 px-6 font-normal">Status</th>
                <th className="py-4 px-6 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {claims.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-on-surface-variant">
                    No claims found. Click "Initialize New Claim" to start.
                  </td>
                </tr>
              ) : (
                claims.map(claim => (
                  <tr key={claim.id} className="border-b border-outline-variant/30 hover:bg-surface-container-highest/50 transition-colors group">
                    <td className="py-4 px-6 text-primary font-code">#{claim.id}</td>
                    <td className="py-4 px-6 text-on-surface">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-on-surface-variant">directions_car</span>
                        <div>
                          <p className="font-medium">{claim.vehicle_year} {claim.vehicle_brand}</p>
                          <p className="text-xs text-on-surface-variant">{claim.vehicle_model}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant">
                      {new Date(claim.created_at || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${
                        claim.status === 'ANALYZED' 
                          ? 'bg-secondary/10 text-secondary border-secondary/20' 
                          : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link 
                        to={`/claims/${claim.id}`} 
                        className="inline-flex items-center gap-1 text-primary hover:text-primary-fixed transition-colors font-label-md"
                      >
                        View Details
                        <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
