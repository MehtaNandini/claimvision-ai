import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateClaim from './pages/CreateClaim';
import ClaimDetails from './pages/ClaimDetails';
import RiskReport from './pages/RiskReport';
import PlaceholderPage from './pages/PlaceholderPage';
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
          <Route path="/insights" element={<PlaceholderPage />} />
          <Route path="/risk-models" element={<PlaceholderPage />} />
          <Route path="/reporting" element={<PlaceholderPage />} />
          <Route path="/settings" element={<PlaceholderPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
