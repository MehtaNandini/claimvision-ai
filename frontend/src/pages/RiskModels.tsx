import React, { useState } from 'react';

export default function RiskModels() {
  const [highRiskThreshold, setHighRiskThreshold] = useState(80);
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(30);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 bg-background">
      <div className="p-xl max-w-[1600px] mx-auto pb-[100px]">
        {/* Page Header */}
        <div className="mb-xl flex items-end justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Risk Models</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Configure AI thresholds and monitor machine learning model performance.</p>
          </div>
          <div className="flex gap-sm">
            <button className="px-md py-sm glass-panel text-on-surface rounded-xl flex items-center gap-md hover:bg-surface-container-highest transition-colors font-label-md">
              <span className="material-symbols-outlined text-[18px]">history</span>
              Version History
            </button>
            <button className="px-md py-sm bg-primary text-on-primary rounded-xl flex items-center gap-md hover:opacity-90 transition-opacity font-label-md">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Configuration
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Configuration Panel */}
          <div className="lg:col-span-8 flex flex-col gap-lg">
            <div className="glass-panel rounded-xl p-lg">
              <h3 className="font-title-lg text-title-lg mb-sm">Decision Engine Rules</h3>
              <p className="text-body-md text-on-surface-variant mb-lg">Adjust the sensitivity of the AI risk flagging system. Changes take effect immediately for new claims.</p>
              
              <div className="flex flex-col gap-xl">
                {/* Auto Approve Slider */}
                <div>
                  <div className="flex justify-between items-center mb-md">
                    <div>
                      <h4 className="font-title-md text-emerald-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">bolt</span> Auto-Approve Threshold
                      </h4>
                      <p className="text-[12px] text-on-surface-variant mt-1">Claims scoring below this % are eligible for straight-through processing.</p>
                    </div>
                    <span className="text-title-lg font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg">{autoApproveThreshold}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="50" 
                    value={autoApproveThreshold} 
                    onChange={(e) => setAutoApproveThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant uppercase mt-2">
                    <span>Conservative (0%)</span>
                    <span>Aggressive (50%)</span>
                  </div>
                </div>

                <div className="h-px bg-outline-variant/30"></div>

                {/* High Risk Slider */}
                <div>
                  <div className="flex justify-between items-center mb-md">
                    <div>
                      <h4 className="font-title-md text-error flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">warning</span> High Risk Flag
                      </h4>
                      <p className="text-[12px] text-on-surface-variant mt-1">Claims scoring above this % are flagged for SIU (Special Investigation Unit).</p>
                    </div>
                    <span className="text-title-lg font-mono bg-error/10 text-error px-3 py-1 rounded-lg">{highRiskThreshold}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" max="100" 
                    value={highRiskThreshold} 
                    onChange={(e) => setHighRiskThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-error"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant uppercase mt-2">
                    <span>Aggressive Flagging (50%)</span>
                    <span>Conservative (100%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Details */}
            <div className="glass-panel rounded-xl p-lg">
              <h3 className="font-title-lg text-title-lg mb-md">Active Model Architecture</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/50">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Image Analysis</p>
                  <p className="font-label-lg">YOLOv8-Claim</p>
                  <p className="text-[12px] text-emerald-400 mt-1">v2.4.1 (Active)</p>
                </div>
                <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/50">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Doc Extraction</p>
                  <p className="font-label-lg">LayoutLMv3</p>
                  <p className="text-[12px] text-emerald-400 mt-1">v1.9.0 (Active)</p>
                </div>
                <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/50">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Risk Scoring</p>
                  <p className="font-label-lg">XGBoost-Ensemble</p>
                  <p className="text-[12px] text-emerald-400 mt-1">v3.0.2 (Active)</p>
                </div>
                <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/50">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Last Trained</p>
                  <p className="font-label-lg">Oct 12, 2023</p>
                  <p className="text-[12px] text-on-surface-variant mt-1">1.2M Claims</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Simulation */}
          <div className="lg:col-span-4 h-full">
            <div className="glass-panel rounded-xl p-lg h-full bg-gradient-to-b from-surface-container-low to-surface-container-highest flex flex-col border border-primary/20">
              <div className="flex items-center gap-2 mb-lg text-primary">
                <span className="material-symbols-outlined">science</span>
                <h3 className="font-title-lg text-title-lg">Simulation Impact</h3>
              </div>
              <p className="text-body-md text-on-surface-variant mb-xl">
                Based on your current slider settings, here is how the last 10,000 processed claims would be categorized:
              </p>

              <div className="flex-1 flex flex-col gap-lg">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-label-md text-emerald-400">Auto-Approved (Low Risk)</span>
                    <span className="font-title-md">{Math.round(autoApproveThreshold * 1.5)}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                    <div className="bg-emerald-400 h-full" style={{ width: `${autoApproveThreshold * 1.5}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-label-md text-amber-400">Manual Review (Med Risk)</span>
                    <span className="font-title-md">{Math.round(highRiskThreshold - (autoApproveThreshold * 1.5))}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                    <div className="bg-amber-400 h-full" style={{ width: `${highRiskThreshold - (autoApproveThreshold * 1.5)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-label-md text-error">SIU Flagged (High Risk)</span>
                    <span className="font-title-md">{100 - highRiskThreshold}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                    <div className="bg-error h-full" style={{ width: `${100 - highRiskThreshold}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-xl p-md bg-surface-variant/30 rounded-lg flex items-start gap-md">
                <span className="material-symbols-outlined text-primary">info</span>
                <p className="text-[12px] text-on-surface">Lowering the high-risk threshold to {highRiskThreshold}% will increase SIU caseload by approximately {(100 - highRiskThreshold) * 12} cases per month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
