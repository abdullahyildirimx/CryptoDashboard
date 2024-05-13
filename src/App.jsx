import MenuHeader from './components/MenuHeader';
import useDocumentTitle from './hooks/useDocumentTitle';
import useSpotData from './hooks/useSpotData';
import HomePage from './pages/HomePage';

const App = () => {
  
  const { priceData, coinList } = useSpotData();
  useDocumentTitle(priceData);

  return (
    <div style={{margin: '0 auto',minHeight: '100vh', maxWidth: '1920px'}}>
      <MenuHeader />
      <HomePage priceData={priceData} coinList={coinList} />
    </div>
  );
}

export default App;