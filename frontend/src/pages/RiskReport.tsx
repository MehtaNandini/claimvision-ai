import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { claimService } from '../services/api';

export default function RiskReport() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const res = await claimService.getReport(id!);
      setReport(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !report) return (
    <div className="flex-1 flex items-center justify-center h-full min-h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">autorenew</span>
        <p className="font-label-md text-on-surface-variant">Loading risk intelligence...</p>
      </div>
    </div>
  );

  const riskScore = report.risk_score || 0;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (riskScore / 100) * circumference;

  return (
    <main className="flex-1 p-xl overflow-y-auto pb-[100px] custom-scrollbar h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto">
        <Link to={`/claims/${id}`} className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-md">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Claim
        </Link>
        <div className="flex items-end justify-between mb-xl">
          <div>
            <span className="text-tertiary font-code text-label-md uppercase tracking-widest mb-xs block">AI Intel Report #{id}</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Risk Assessment</h2>
          </div>
          <div className="flex gap-sm">
            <button className="px-lg py-sm border border-outline-variant text-on-surface rounded-xl hover:bg-surface-container hover:border-primary/40 transition-all font-label-md">Export PDF</button>
            <button className="px-lg py-sm border border-outline-variant text-on-surface rounded-xl hover:bg-surface-container hover:border-primary/40 transition-all font-label-md">Share Report</button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-2xl mb-xl flex flex-col md:flex-row items-center justify-center gap-3xl relative overflow-hidden">
          <div className="risk-gauge-container group relative w-[280px] h-[280px]">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="45" stroke="#1E293B" strokeWidth="8"></circle>
              <circle 
                cx="50" cy="50" fill="none" r="45" 
                stroke={riskScore > 70 ? '#ffb4ab' : riskScore > 40 ? '#ffb786' : '#adc6ff'} 
                strokeDasharray={circumference} 
                strokeDashoffset={offset} 
                strokeLinecap="round" strokeWidth="8" 
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`font-display-lg text-[64px] font-bold leading-none ${riskScore > 70 ? 'text-error' : riskScore > 40 ? 'text-tertiary' : 'text-primary'}`}>
                {riskScore}
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tighter mt-1">Risk Score</span>
            </div>
          </div>
          <div className="max-w-md text-center md:text-left z-10">
            <div className={`inline-flex items-center gap-sm px-md py-1 rounded-full font-label-md mb-md ${riskScore > 70 ? 'bg-error-container text-on-error-container' : riskScore > 40 ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container text-on-primary-container'}`}>
              <span className="material-symbols-outlined text-sm">{riskScore > 70 ? 'warning' : 'info'}</span>
              STATUS: {report.risk_level.toUpperCase()}
            </div>
            <h3 className="font-headline-md text-headline-md mb-md text-on-surface">
              {riskScore > 70 ? 'Anomalous Activity Detected' : 'Standard Claim Profile'}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed">
              {report.claim_summary}
            </p>
            <div className="flex flex-wrap gap-md justify-center md:justify-start">
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-md">history</span>
                <span className="font-label-md">Just updated</span>
              </div>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-md">analytics</span>
                <span className="font-label-md">98.2% AI Confidence</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-xl">
          {report.risk_factors.map((factor: string, idx: number) => (
            <div key={idx} className="glass-card rounded-2xl p-lg hover:border-primary/40 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-md">
                <div className="p-3 bg-primary-container/10 text-primary rounded-xl">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <span className="px-sm py-1 bg-error/10 text-error font-label-md rounded-lg">High Severity</span>
              </div>
              <h4 className="font-title-lg text-title-lg text-on-surface mb-sm">Risk Factor Identified</h4>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg h-12">{factor}</p>
              <div className="pt-md border-t border-outline-variant/30 flex justify-between items-center">
                <button className="text-primary font-label-md flex items-center gap-xs group-hover:gap-sm transition-all">
                  Suggested Action: Review
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}

          <div className="bg-primary-container/5 rounded-2xl p-lg border border-primary/20 flex flex-col justify-center items-center text-center">
            <div className="mb-md">
              <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
            </div>
            <h4 className="font-title-lg text-title-lg text-on-surface mb-xs">Run Deep Scan</h4>
            <p className="font-label-md text-label-md text-on-surface-variant mb-md">Perform secondary neural network validation on all claim documents.</p>
            <button className="w-full py-2 bg-primary/10 hover:bg-primary/20 border border-primary/40 text-primary rounded-xl font-label-md transition-all">Initiate Validation</button>
          </div>
        </div>

        {report.risk_level === 'High' && (
          <div className="glass-card rounded-2xl p-xl border-t-4 border-t-error flex flex-col lg:flex-row gap-lg items-center justify-between">
            <div className="flex items-center gap-lg">
              <div className="w-16 h-16 rounded-full bg-error-container/30 flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-4xl">person_search</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Human Review Required</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Automated settlement paused due to risk triggers. This file requires manual sign-off.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-md w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-sm px-xl py-3 border border-outline-variant text-on-surface rounded-xl font-label-md hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined">list_alt</span>
                Detailed Log
              </button>
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-sm px-xl py-3 bg-error text-on-error rounded-xl font-label-md hover:opacity-90 transition-all font-bold">
                <span className="material-symbols-outlined">person_add</span>
                Assign to Adjuster
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
