import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import useDocumentTitle from './hooks/useDocumentTitle';
import SpotPage from './pages/SpotPage';
import FuturesPage from './pages/FuturesPage';
import NewsPage from './pages/NewsPage';

const App = () => {
  useDocumentTitle();

  return (
    <Router>
      <div style={{ margin: '0 auto', minHeight: '100vh', maxWidth: '1400px' }} data-bs-theme="dark">
        <MenuHeader />
        <Routes>
          <Route path="/spot" element={<SpotPage />} />
          <Route path="/futures" element={<FuturesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/" element={<Navigate to="/spot" replace />} />
          <Route path="*" element={<Navigate to="/spot" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;