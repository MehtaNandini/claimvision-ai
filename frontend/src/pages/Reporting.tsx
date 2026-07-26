import React from 'react';

export default function Reporting() {
  const reports = [
    { id: 'RPT-2023-10-A', name: 'Q3 Fraud Trend Analysis', type: 'PDF', date: 'Oct 25, 2023', size: '2.4 MB' },
    { id: 'RPT-2023-10-B', name: 'Vendor Repair Estimate Variances', type: 'CSV', date: 'Oct 22, 2023', size: '840 KB' },
    { id: 'RPT-2023-10-C', name: 'Automated Processing Efficiency', type: 'PDF', date: 'Oct 15, 2023', size: '1.1 MB' },
    { id: 'RPT-2023-09-A', name: 'Q2 Comprehensive Risk Summary', type: 'XLSX', date: 'Oct 01, 2023', size: '5.2 MB' },
  ];

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 bg-background">
      <div className="p-xl max-w-[1600px] mx-auto pb-[100px]">
        {/* Page Header */}
        <div className="mb-xl flex items-end justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Reporting & Analytics</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Export data, view historical trends, and generate compliance reports.</p>
          </div>
          <div className="flex gap-sm">
            <button className="px-md py-sm glass-panel text-on-surface rounded-xl flex items-center gap-md hover:bg-surface-container-highest transition-colors font-label-md">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filters
            </button>
            <button className="px-md py-sm bg-primary text-on-primary rounded-xl flex items-center gap-md hover:opacity-90 transition-opacity font-label-md">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Custom Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
          <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/50">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Total Savings (YTD)</p>
            <p className="font-headline-md text-emerald-400">$4.2M</p>
          </div>
          <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/50">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Avg Processing Time</p>
            <p className="font-headline-md text-primary">2.1 Days</p>
          </div>
          <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/50">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Claims Flagged</p>
            <p className="font-headline-md text-amber-400">8.4%</p>
          </div>
          <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/50">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">SIU Conversion Rate</p>
            <p className="font-headline-md text-error">92%</p>
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="glass-panel rounded-xl flex flex-col overflow-hidden mb-xl">
          <div className="p-lg border-b border-outline-variant flex items-center justify-between bg-surface-container-low/30">
            <h4 className="font-title-lg text-title-lg">Generated Reports</h4>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input 
                type="text" 
                placeholder="Search reports..."
                className="bg-surface-container rounded-lg pl-9 pr-4 py-1.5 text-body-sm focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-highest/30">
                <tr className="font-label-md text-label-md text-on-surface-variant uppercase border-b border-outline-variant">
                  <th className="px-lg py-md font-normal">Report ID</th>
                  <th className="px-lg py-md font-normal">Name</th>
                  <th className="px-lg py-md font-normal">Format</th>
                  <th className="px-lg py-md font-normal">Generated On</th>
                  <th className="px-lg py-md font-normal text-right">Size</th>
                  <th className="px-lg py-md font-normal text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-surface-container-high/30 transition-colors group">
                    <td className="px-lg py-md font-code text-[12px] text-on-surface-variant">{report.id}</td>
                    <td className="px-lg py-md font-title-sm">{report.name}</td>
                    <td className="px-lg py-md">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        report.type === 'PDF' ? 'bg-rose-500/10 text-rose-400' :
                        report.type === 'CSV' ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-lg py-md text-body-sm text-on-surface-variant">{report.date}</td>
                    <td className="px-lg py-md text-body-sm text-on-surface-variant text-right">{report.size}</td>
                    <td className="px-lg py-md text-center">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors inline-flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="glass-panel rounded-xl p-lg min-h-[300px] flex flex-col justify-center items-center border border-dashed border-outline-variant/50 bg-surface-container-lowest">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30 mb-md">bar_chart</span>
          <p className="font-title-md text-on-surface-variant">Advanced charting is configured via external BI tools.</p>
          <button className="mt-md text-primary font-label-md hover:underline flex items-center gap-1">
            Connect Tableau / PowerBI <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );
}
