import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { claimService } from '../services/api';

export default function ClaimDetails() {
  const { id } = useParams();
  const [claim, setClaim] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClaim();
  }, [id]);

  const fetchClaim = async () => {
    try {
      const res = await claimService.getClaim(id!);
      setClaim(res.data);
      if (res.data.status === 'ANALYZED') {
        const rep = await claimService.getReport(id!);
        setReport(rep.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      await claimService.analyzeClaim(id!);
      await fetchClaim();
    } catch (err) {
      console.error(err);
      alert('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  if (!claim) return (
    <div className="flex-1 flex items-center justify-center h-full min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
        <p className="font-label-md text-on-surface-variant">Loading claim data...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-xl overflow-y-auto pb-[100px]">
      <div className="flex justify-between items-start mb-xl">
        <div>
          <div className="flex items-center gap-sm mb-1">
            <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-wider rounded border border-tertiary/20">Auto Insurance</span>
            <span className={`px-2 py-1 ${report?.risk_level === 'High' ? 'bg-error/10 text-error border-error/20' : 'bg-primary/10 text-primary border-primary/20'} text-[10px] font-bold uppercase tracking-wider rounded border`}>
              {report?.risk_level || 'Pending'} Risk
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-md">
            Claim #{claim.id}
            <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
          </h2>
          <p className="text-on-surface-variant mt-1 font-body-md">Analyzed via Multimodal AI Pipeline</p>
        </div>

        <div className="flex gap-md">
          <button className="flex items-center gap-2 px-md py-sm bg-surface-container-highest border border-outline-variant text-on-surface font-label-md text-label-md rounded-xl hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share
          </button>
          <a 
            href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/claims/${claim.id}/json`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-md py-sm bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">data_object</span>
            View Raw JSON
          </a>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-lg mb-xl">
        <div className="glass-panel rounded-2xl p-lg flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Vehicle</span>
          <div>
            <p className="font-title-lg text-title-lg text-on-surface mt-2">{claim.vehicle_year} {claim.vehicle_brand}</p>
            <p className="text-sm text-on-surface-variant">{claim.vehicle_model}</p>
          </div>
        </div>
        
        <div className="glass-panel rounded-2xl p-lg flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Risk Level</span>
          <div className="flex items-end gap-2 mt-2">
            <p className={`font-headline-md text-headline-md ${report?.risk_level === 'High' ? 'text-error' : report?.risk_level === 'Medium' ? 'text-tertiary' : 'text-primary'}`}>{report?.risk_level || 'N/A'}</p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-lg flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Fraud Score</span>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-16 h-16 rounded-full border-4 border-surface-container-highest flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-tertiary" strokeDasharray={`${report?.risk_score || 0}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
              </svg>
              <span className="font-title-lg text-title-lg text-on-surface relative z-10">{report?.risk_score || 0}</span>
            </div>
            <span className="text-xs text-on-surface-variant leading-tight">out of<br/>100</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-lg flex flex-col justify-between bg-gradient-to-br from-primary-container/20 to-transparent border-primary/30">
          <span className="font-label-md text-label-md text-primary uppercase tracking-widest text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            AI Recommendation
          </span>
          <p className="font-title-lg text-title-lg text-on-surface mt-2 leading-tight">
            {report?.risk_level === 'High' ? 'Flag for manual review.' : 'Proceed with automated payout.'}
          </p>
        </div>
      </div>

      {claim.status !== 'ANALYZED' && (
        <div className="glass-card p-6 rounded-2xl mb-xl text-center border-dashed border-2 border-outline-variant">
          <h3 className="text-lg font-bold mb-2">Claim Not Analyzed Yet</h3>
          <p className="text-on-surface-variant mb-4">Run the AI analysis to extract data and generate the risk report.</p>
          <button 
            onClick={handleAnalyze} 
            disabled={loading}
            className="bg-primary text-on-primary px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center gap-2"
          >
            {loading ? <span className="material-symbols-outlined animate-spin">autorenew</span> : <span className="material-symbols-outlined">rocket_launch</span>}
            {loading ? 'Processing...' : 'Run Multimodal AI Analysis'}
          </button>
        </div>
      )}

      {report && (
        <div className="grid grid-cols-3 gap-lg h-[600px]">
          <div className="col-span-2 flex flex-col gap-lg">
            <div className="glass-panel rounded-2xl p-lg flex-1 flex flex-col relative overflow-hidden group">
              <div className="flex justify-between items-center mb-md relative z-10">
                <h3 className="font-title-lg text-title-lg text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">visibility</span>
                  Visual Intelligence
                </h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-code text-on-surface-variant border border-outline-variant flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Model: CV-Damage-v3
                  </span>
                </div>
              </div>
              
              <div className="flex-1 bg-black/40 rounded-xl border border-outline-variant relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
                
                <div className="ai-bounding-box" style={{ top: '30%', left: '20%', width: '40%', height: '50%' }}>
                  <div className="ai-label">Front Bumper Damage (94%)</div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 bg-surface-container-highest/80 backdrop-blur-md rounded-lg p-3 border border-outline-variant flex justify-between items-center z-10">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      <span className="text-sm font-label-md text-on-surface">Vehicle Match: Confirmed</span>
                    </div>
                    <div className="h-5 w-px bg-outline-variant"></div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error">warning</span>
                      <span className="text-sm font-label-md text-on-surface">Severe Structural Damage</span>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary-fixed transition-colors">
                    <span className="material-symbols-outlined">fullscreen</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-lg h-1/3 flex flex-col">
              <h3 className="font-title-lg text-title-lg text-on-surface flex items-center gap-2 mb-md">
                <span className="material-symbols-outlined text-secondary">document_scanner</span>
                OCR Extraction
              </h3>
              <div className="flex-1 overflow-y-auto pr-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wider font-label-md">
                      <th className="pb-2 font-normal">Field Extracted</th>
                      <th className="pb-2 font-normal">Value</th>
                      <th className="pb-2 font-normal text-right">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-code">
                    <tr className="border-b border-outline-variant/30 hover:bg-surface-container-highest/50 transition-colors">
                      <td className="py-3 text-on-surface">Repair Estimate Total</td>
                      <td className="py-3 text-on-surface-variant">$4,250.00</td>
                      <td className="py-3 text-right text-primary">98%</td>
                    </tr>
                    <tr className="border-b border-outline-variant/30 hover:bg-surface-container-highest/50 transition-colors">
                      <td className="py-3 text-on-surface">Date of Incident</td>
                      <td className="py-3 text-on-surface-variant">2023-10-14</td>
                      <td className="py-3 text-right text-primary">99%</td>
                    </tr>
                    <tr className="hover:bg-surface-container-highest/50 transition-colors">
                      <td className="py-3 text-on-surface">Shop Name</td>
                      <td className="py-3 text-on-surface-variant">Joe's Auto Body</td>
                      <td className="py-3 text-right text-tertiary">85%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-lg flex flex-col h-full border-t-4 border-t-primary">
            <h3 className="font-title-lg text-title-lg text-on-surface flex items-center gap-2 mb-lg">
              <span className="material-symbols-outlined text-primary">psychology</span>
              Multimodal AI Summary
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-xl">
              <div>
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Synthesis</h4>
                <p className="text-sm text-on-surface leading-relaxed">
                  {report.claim_summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-error uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">gavel</span>
                  Risk Factors
                </h4>
                <ul className="space-y-3">
                  {report.risk_factors.map((factor: string, idx: number) => (
                    <li key={idx} className="flex gap-3 items-start bg-error/5 p-3 rounded-xl border border-error/10">
                      <span className="material-symbols-outlined text-error text-[18px] mt-0.5">error</span>
                      <p className="text-sm text-on-surface">{factor}</p>
                    </li>
                  ))}
                  {report.risk_factors.length === 0 && (
                    <li className="flex gap-3 items-start p-3">
                      <p className="text-sm text-on-surface-variant">No significant risk factors identified.</p>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">rule</span>
                  Recommended Steps
                </h4>
                <ul className="space-y-3">
                  {report.recommended_steps.map((step: string, idx: number) => (
                    <li key={idx} className="flex gap-3 items-start bg-surface-container-highest p-3 rounded-xl border border-outline-variant">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_box</span>
                      <p className="text-sm text-on-surface">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-lg pt-lg border-t border-outline-variant">
              <button className="w-full glowing-btn bg-surface-container text-on-surface border border-outline-variant px-4 py-3 rounded-xl font-label-md text-label-md font-bold flex justify-center items-center gap-2 hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined">edit_note</span>
                Override Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
