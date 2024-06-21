import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMarketActivity } from '../utils/reduxStorage';

const useMarketActivity = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchMarketActivity = async () => {
		  try {
			const response = await fetch('https://api.cryptodashboards.xyz/api/');
			if (!response.ok) {
			  throw new Error('Network response was not ok');
			}
			const jsonData = await response.json();
			console.log(jsonData)
			const activityList = filteredCoins.map(coin => {
			  const symbol = coin.symbol;
			  const oldPrice = coin.oldPrice;
			  const newPrice = coin.newPrice;
			  const change = coin.change;
			  const time = coin.time;
		
			  return {
				symbol: symbol,
				oldPrice: oldPrice,
				newPrice: newPrice,
				change: change,
				time: time,
			  };
			});
			dispatch(setMarketActivity(activityList));
	
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	
		fetchMarketActivity();
		const intervalId = setInterval(fetchMarketActivity, 10000);
		return () => clearInterval(intervalId);
		
	  }, [dispatch]);
};

export default useMarketActivity;
