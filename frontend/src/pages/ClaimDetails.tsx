import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { claimService } from '../services/api';

export default function ClaimDetails() {
  const { id } = useParams();
  const [claim, setClaim] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState('INVOICE');
  const [file, setFile] = useState<File | null>(null);

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      if (uploadType === 'IMAGE') {
        await claimService.uploadImage(id!, file);
      } else {
        await claimService.uploadDocument(id!, file, uploadType);
      }
      alert('Upload successful');
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
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

  if (!claim) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Claim #{claim.id} Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Vehicle:</strong> {claim.vehicle_year} {claim.vehicle_brand} {claim.vehicle_model}</p>
          <p><strong>Status:</strong> {claim.status}</p>
          <p className="col-span-2"><strong>Description:</strong> {claim.description}</p>
        </div>
      </div>

      {claim.status !== 'ANALYZED' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Upload Files</h3>
          <form onSubmit={handleUpload} className="flex items-center space-x-4 mb-4">
            <select 
              value={uploadType} 
              onChange={e => setUploadType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="INVOICE">Repair Invoice (PDF/Img)</option>
              <option value="CLAIM_FORM">Claim Form (PDF)</option>
              <option value="IMAGE">Damage Image (JPG/PNG)</option>
            </select>
            <input 
              type="file" 
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="p-2"
            />
            <button 
              type="submit" 
              disabled={!file || loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Upload
            </button>
          </form>

          <button 
            onClick={handleAnalyze} 
            disabled={loading}
            className="w-full bg-green-600 text-white px-4 py-3 rounded font-bold hover:bg-green-700 disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : 'Run Multimodal AI Analysis'}
          </button>
        </div>
      )}

      {report && (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">AI Risk Report</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Risk Level</p>
              <p className={`text-2xl font-bold ${
                report.risk_level === 'High' ? 'text-red-600' : 
                report.risk_level === 'Medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>{report.risk_level} ({report.risk_score}/100)</p>
            </div>
            <a 
              href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/claims/${claim.id}/json`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Full JSON Report
            </a>
          </div>

          <div className="bg-gray-50 p-4 rounded mt-4">
            <h4 className="font-bold mb-2">Claim Summary</h4>
            <p className="text-sm">{report.claim_summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-bold mb-2 text-red-600">Risk Factors Found</h4>
              <ul className="list-disc pl-5 text-sm">
                {report.risk_factors.map((f: string, i: number) => <li key={i}>{f}</li>)}
                {report.risk_factors.length === 0 && <li>None</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-blue-600">Recommended Steps</h4>
              <ul className="list-disc pl-5 text-sm">
                {report.recommended_steps.map((f: string, i: number) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
