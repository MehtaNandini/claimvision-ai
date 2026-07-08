import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { claimService } from '../services/api';
import { PlusCircle, FileText } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Claims Dashboard</h1>
        <Link 
          to="/claims/new" 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Claim
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {claims.length === 0 ? (
              <li className="px-6 py-4 text-center text-gray-500">No claims found.</li>
            ) : (
              claims.map(claim => (
                <li key={claim.id}>
                  <Link to={`/claims/${claim.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Claim #{claim.id} - {claim.vehicle_brand} {claim.vehicle_model}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          claim.status === 'ANALYZED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {claim.status}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
