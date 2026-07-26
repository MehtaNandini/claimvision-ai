import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import CreateClaim from './pages/CreateClaim';
import ClaimDetails from './pages/ClaimDetails';
import RiskReport from './pages/RiskReport';
import AIInsights from './pages/AIInsights';
import RiskModels from './pages/RiskModels';
import Reporting from './pages/Reporting';
import Settings from './pages/Settings';
import Layout from './components/Layout';

export const UserContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: 'Alex Rivera',
      role: 'Senior Adjuster',
      email: 'alex.rivera@claimvision.ai',
      photo: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=3b82f6&color=fff&size=256'
    };
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/claims/new" element={<CreateClaim />} />
          <Route path="/claims/:id" element={<ClaimDetails />} />
          <Route path="/claims/:id/risk" element={<RiskReport />} />
          <Route path="/insights" element={<AIInsights />} />
          <Route path="/risk-models" element={<RiskModels />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
