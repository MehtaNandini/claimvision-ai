import React from 'react';

export default function AIInsights() {
  const insights = [
    {
      id: 1,
      title: 'Suspicious Frequency in Northern District',
      description: 'Pattern detected: Increase in rear-end collision severity reports in Northern District. Cross-referencing with local weather data suggests 15% fraud probability on pending cases.',
      severity: 'high',
      status: 'Action Required',
      date: '2 hours ago'
    },
    {
      id: 2,
      title: 'Vehicle Year vs Damage Cost Discrepancy',
      description: 'The AI model flagged 24 recent claims where repair estimates for vehicles older than 10 years exceeded market value by an average of 40%.',
      severity: 'medium',
      status: 'Reviewing',
      date: '1 day ago'
    },
    {
      id: 3,
      title: 'Automated Approvals Optimization',
      description: 'Low-risk claims processing time has decreased by 1.2 minutes on average following the recent model update. Confidence threshold remains stable at 95%.',
      severity: 'low',
      status: 'Informational',
      date: '3 days ago'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 bg-background">
      <div className="p-xl max-w-[1600px] mx-auto pb-[100px]">
        {/* Page Header */}
        <div className="mb-xl flex items-end justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">AI Insights</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Deep learning analysis and automated pattern detection across all claim data.</p>
          </div>
          <div className="flex gap-sm">
            <button className="px-md py-sm bg-primary text-on-primary rounded-xl flex items-center gap-md hover:opacity-90 transition-opacity font-label-md">
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Run Analysis
            </button>
          </div>
        </div>

        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
          <div className="glass-panel p-lg rounded-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-md">
              <p className="font-label-md text-label-md text-on-surface-variant">Global Model Confidence</p>
              <span className="material-symbols-outlined text-emerald-400">verified</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg mb-1">94.8%</h3>
            <p className="text-emerald-400 font-label-md flex items-center">
              <span className="material-symbols-outlined !text-[16px]">trending_up</span> +0.4% this week
            </p>
          </div>
          
          <div className="glass-panel p-lg rounded-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-md">
              <p className="font-label-md text-label-md text-on-surface-variant">Anomalies Detected</p>
              <span className="material-symbols-outlined text-rose-400">policy</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg mb-1">128</h3>
            <p className="text-rose-400 font-label-md flex items-center">
              <span className="material-symbols-outlined !text-[16px]">warning</span> 12 require manual review
            </p>
          </div>
          
          <div className="glass-panel p-lg rounded-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-md">
              <p className="font-label-md text-label-md text-on-surface-variant">Images Processed</p>
              <span className="material-symbols-outlined text-primary">image</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg mb-1">14,204</h3>
            <p className="text-on-surface-variant font-label-md flex items-center">
              Across 3,100 active claims
            </p>
          </div>
        </div>

        {/* Insight Feed */}
        <h4 className="font-title-lg text-title-lg mb-md">Active Intelligence Feed</h4>
        <div className="flex flex-col gap-md">
          {insights.map(insight => (
            <div key={insight.id} className="glass-panel rounded-xl p-lg flex flex-col md:flex-row gap-lg items-start">
              <div className={`p-md rounded-full flex items-center justify-center shrink-0 ${
                insight.severity === 'high' ? 'bg-error/10 text-error' :
                insight.severity === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                'bg-emerald-500/10 text-emerald-400'
              }`}>
                <span className="material-symbols-outlined !text-[24px]">
                  {insight.severity === 'high' ? 'priority_high' :
                   insight.severity === 'medium' ? 'troubleshoot' : 'lightbulb'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-title-md text-title-md text-on-background">{insight.title}</h5>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{insight.date}</span>
                </div>
                <p className="text-body-md text-on-surface-variant mb-md">{insight.description}</p>
                <div className="flex items-center gap-md">
                  <span className="bg-surface-container-highest px-sm py-xs rounded text-[10px] uppercase font-bold text-on-surface">
                    {insight.status}
                  </span>
                  {insight.severity !== 'low' && (
                    <button className="text-primary font-label-md text-label-md hover:underline">
                      Investigate Pattern
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
