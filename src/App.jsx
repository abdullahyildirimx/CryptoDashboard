import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import useDocumentTitle from './hooks/useDocumentTitle';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';

const App = () => {
  useDocumentTitle();

  return (
    <Router>
      <div style={{ margin: '0 auto', minHeight: '100vh', maxWidth: '1400px' }} data-bs-theme="dark">
        <MenuHeader />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;