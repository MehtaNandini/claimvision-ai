import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    <div className="flex-1 flex items-center justify-center h-full min-h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
        <p className="font-label-md text-on-surface-variant">Loading claim data...</p>
      </div>
    </div>
  );

  return (
    <main className="flex-1 p-lg flex gap-lg overflow-hidden h-[calc(100vh-64px)]">
      {/* Left Pane: Visual Intelligence */}
      <section className="flex-[1.5] flex flex-col gap-md h-full">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Visual Intelligence</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Computer Vision: Multi-perspective damage assessment</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-surface-container-high text-label-md font-label-md border border-outline-variant">Front Left</button>
            <button className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-label-md font-label-md border border-primary/50">Front Right (Primary)</button>
            <button className="px-3 py-1.5 rounded-lg bg-surface-container-high text-label-md font-label-md border border-outline-variant">Rear Impact</button>
          </div>
        </div>
        
        {claim.status !== 'ANALYZED' ? (
          <div className="relative flex-1 rounded-2xl overflow-hidden glass-panel group flex items-center justify-center border-dashed border-2">
             <div className="text-center">
               <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">image_search</span>
               <h3 className="text-xl font-bold mb-2">Awaiting Analysis</h3>
               <p className="text-on-surface-variant mb-4">Visual intelligence will be available after AI processing.</p>
               <button 
                  onClick={handleAnalyze} 
                  disabled={loading}
                  className="bg-primary text-on-primary px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {loading ? <span className="material-symbols-outlined animate-spin">autorenew</span> : <span className="material-symbols-outlined">rocket_launch</span>}
                  {loading ? 'Processing...' : 'Run Analysis'}
                </button>
             </div>
          </div>
        ) : (
          <div className="relative flex-1 rounded-2xl overflow-hidden glass-panel group">
            <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')" }}></div>
            {/* Simulated Bounding Boxes */}
            <div className="ai-bounding-box" style={{ top: '35%', left: '45%', width: '35%', height: '40%' }}>
              <span className="ai-label">Structural Damage: High (89%)</span>
            </div>
            <div className="ai-bounding-box !border-tertiary/60 !bg-tertiary/10" style={{ top: '45%', left: '55%', width: '20%', height: '15%' }}>
              <span className="ai-label !bg-tertiary !text-on-tertiary-container">Headlight: Replace</span>
            </div>
            <div className="ai-bounding-box !border-error/60 !bg-error/10" style={{ top: '55%', left: '40%', width: '15%', height: '10%' }}>
              <span className="ai-label !bg-error !text-on-error-container">Sensor: Fault</span>
            </div>
            
            <div className="absolute bottom-md right-md flex flex-col gap-sm">
              <button className="p-3 bg-surface/90 backdrop-blur-md rounded-full shadow-xl hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined" data-icon="zoom_in">zoom_in</span>
              </button>
              <button className="p-3 bg-surface/90 backdrop-blur-md rounded-full shadow-xl hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined" data-icon="layers">layers</span>
              </button>
              <button className="p-3 bg-surface/90 backdrop-blur-md rounded-full shadow-xl hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined" data-icon="3d_rotation">3d_rotation</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Right Pane: Data & Reasoning */}
      <section className="flex-1 flex flex-col gap-lg overflow-y-auto pr-2 custom-scrollbar">
        {/* Top: Header Info */}
        <div className="glass-panel p-lg rounded-2xl">
          <div className="flex justify-between items-start mb-md">
            <div>
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase">Claim #{claim.id}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-1">{claim.vehicle_year} {claim.vehicle_brand}</h3>
            </div>
            <div className={`px-md py-1 rounded-full text-label-md font-bold flex items-center gap-1 ${report?.risk_level === 'High' ? 'bg-error-container text-on-error-container' : report?.risk_level === 'Medium' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container/20 text-primary'}`}>
              <span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
              {report?.risk_level || 'Pending'} Risk
            </div>
          </div>
          <div className="grid grid-cols-2 gap-md">
            <div className="bg-surface-container/50 p-md rounded-xl border border-outline-variant/30">
              <p className="font-label-md text-label-md text-on-surface-variant">Model</p>
              <p className="font-body-md text-body-md text-on-surface font-semibold">{claim.vehicle_model}</p>
            </div>
            <div className="bg-surface-container/50 p-md rounded-xl border border-outline-variant/30">
              <p className="font-label-md text-label-md text-on-surface-variant">Est. Fraud Score</p>
              <p className="font-body-md text-body-md text-on-surface font-semibold">{report?.risk_score || 'N/A'}/100</p>
            </div>
          </div>
        </div>

        {/* Middle: OCR Extraction */}
        {claim.status === 'ANALYZED' && (
          <div className="glass-panel p-lg rounded-2xl">
            <div className="flex justify-between items-center mb-md">
              <h4 className="font-title-lg text-title-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="document_scanner">document_scanner</span>
                OCR Extraction
              </h4>
              <span className="font-label-md text-label-md text-on-surface-variant">Confidence: 99.2%</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-outline-variant/30">
              <table className="w-full text-left">
                <thead className="bg-surface-container-high border-b border-outline-variant">
                  <tr>
                    <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase">Line Item</th>
                    <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase">Extracted Value</th>
                    <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 font-body-md text-body-md">
                  <tr className="hover:bg-surface-variant/10 transition-colors">
                    <td className="px-md py-md text-on-surface-variant">Labor Rate</td>
                    <td className="px-md py-md text-on-surface font-medium">$125.00/hr</td>
                    <td className="px-md py-md text-right"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span></td>
                  </tr>
                  <tr className="hover:bg-surface-variant/10 transition-colors bg-white/2">
                    <td className="px-md py-md text-on-surface-variant">Parts: Front Bumper</td>
                    <td className="px-md py-md text-on-surface font-medium">$2,450.00</td>
                    <td className="px-md py-md text-right"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span></td>
                  </tr>
                  <tr className="hover:bg-surface-variant/10 transition-colors">
                    <td className="px-md py-md text-on-surface-variant">Total Extracted</td>
                    <td className="px-md py-md text-on-surface font-medium">$3,425.00</td>
                    <td className="px-md py-md text-right"><span className="w-2 h-2 rounded-full bg-tertiary inline-block"></span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom: Multimodal AI Summary */}
        {claim.status === 'ANALYZED' && (
          <div className="glass-panel p-lg rounded-2xl flex-1 flex flex-col">
            <h4 className="font-title-lg text-title-lg text-on-surface mb-md flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" data-icon="neurology">neurology</span>
              Multimodal AI Summary
            </h4>
            <div className="space-y-md flex-1">
              <div className="p-md rounded-xl bg-primary-container/5 border border-primary/20">
                <h5 className="font-label-md text-label-md text-primary mb-1 uppercase">Reasoning Engine</h5>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {report?.claim_summary || 'No summary available.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-md">
                <div className="flex items-start gap-3 p-3 bg-surface-container rounded-xl border border-outline-variant/20">
                  <span className="material-symbols-outlined text-tertiary" data-icon="gavel">gavel</span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant">Compliance</p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">92% Match</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-surface-container rounded-xl border border-outline-variant/20">
                  <span className="material-symbols-outlined text-error" data-icon="security">security</span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant">Fraud Index</p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">
                      {report?.risk_score > 70 ? 'Flagged (H)' : report?.risk_score > 40 ? 'Review (M)' : 'Clear (L)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-lg pt-md border-t border-outline-variant/30 flex gap-md">
              <button className="flex-1 py-3 rounded-xl bg-surface-container-highest border border-outline-variant text-label-md font-label-md hover:bg-surface-variant/20 transition-all">Reject Claim</button>
              <Link to={`/claims/${id}/risk`} className="flex-1 py-3 rounded-xl bg-primary text-on-primary text-label-md font-label-md hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 glowing-btn">
                View Deep Risk Intel
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
