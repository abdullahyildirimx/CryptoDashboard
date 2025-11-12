import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Header from './components/Header'
import useDocumentTitle from './hooks/useDocumentTitle'
import { lazy } from 'react'

const SpotPage = lazy(() => import('./pages/SpotPage'))
const FuturesPage = lazy(() => import('./pages/FuturesPage'))

const App = () => {
  useDocumentTitle()

  return (
    <Router>
      <div className="mx-auto min-h-dvh min-w-360 max-w-1400">
        <Header />
        <Routes>
          <Route path="/spot" element={<SpotPage />} />
          <Route path="/futures" element={<FuturesPage />} />
          <Route path="/" element={<Navigate to="/spot" replace />} />
          <Route path="*" element={<Navigate to="/spot" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
