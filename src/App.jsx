import MenuHeader from './components/MenuHeader';
import useDocumentTitle from './hooks/useDocumentTitle';
import HomePage from './pages/HomePage';

const App = () => {
  
  useDocumentTitle()

  return (
    <div style={{margin: '0 auto',minHeight: '100vh', maxWidth: '1920px'}}>
      <MenuHeader />
      <HomePage />
    </div>
  );
}

export default App;