import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PromoPage } from './pages/PromoPage';

function App() {
  const isRegistrazioni = window.location.hostname.includes('registrazioni');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isRegistrazioni ? <PromoPage /> : <HomePage />} />
        <Route path="/promo" element={<PromoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
