import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PromoPage } from './pages/PromoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/promo" element={<PromoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
