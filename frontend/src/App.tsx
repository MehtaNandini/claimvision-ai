import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateClaim from './pages/CreateClaim';
import ClaimDetails from './pages/ClaimDetails';
import RiskReport from './pages/RiskReport';
import AIInsights from './pages/AIInsights';
import RiskModels from './pages/RiskModels';
import Reporting from './pages/Reporting';
import Settings from './pages/Settings';
import Layout from './components/Layout';

function App() {
  return (
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
  );
}

export default App;
