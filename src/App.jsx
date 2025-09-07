import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import useDocumentTitle from './hooks/useDocumentTitle';
import SpotPage from './pages/SpotPage';
import FuturesPage from './pages/FuturesPage';

const App = () => {
  useDocumentTitle();

  return (
    <Router>
      <div className="mx-auto min-h-dvh min-w-[360px] max-w-[1400px]">
        <Header />
        <Routes>
          <Route path="/spot" element={<SpotPage />} />
          <Route path="/futures" element={<FuturesPage />} />
          <Route path="/" element={<Navigate to="/spot" replace />} />
          <Route path="*" element={<Navigate to="/spot" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;