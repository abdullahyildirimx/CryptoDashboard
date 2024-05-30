import MenuHeader from './components/MenuHeader';
import useDocumentTitle from './hooks/useDocumentTitle';
import HomePage from './pages/HomePage';
import './components/components.css';

const App = () => {
  
  useDocumentTitle();

  return (
    <div style={{margin: '0 auto',minHeight: '100vh', maxWidth: '1400px'}} data-bs-theme="dark">
      <MenuHeader />
      <HomePage />
    </div>
  );
}

export default App;