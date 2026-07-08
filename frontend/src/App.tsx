import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateClaim from './pages/CreateClaim';
import ClaimDetails from './pages/ClaimDetails';
import RiskReport from './pages/RiskReport';
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
