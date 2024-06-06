import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMarketActivity } from '../utils/reduxStorage';

const bigCoinList = ['BTC', 'ETH'];

const useMarketActivity = () => {

	const bitcoinTriggerLow = 0.99;
	const bitcoinTriggerHigh = 1.01;
	const altcoinTriggerLow = 0.97;
	const altcoinTriggerHigh = 1.03;

	const { priceData, coinList } = useSelector((state) => state.dataStore);
	const dispatch = useDispatch();
	const [activityData, setActivityData] = useState(() => coinList?.map(() => Array(30).fill(0)) || []);
	const fetchMarketActivityRef = useRef(null);
	useEffect(() => {
		setActivityData(() => coinList?.map(() => Array(30).fill(0)));
	}, [coinList])
	useEffect(() => {
		fetchMarketActivityRef.current = () => {
			if (!priceData || !coinList) {
				return;
			}
			let resultArray = [];
			const newPriceData = activityData.slice();
			coinList.forEach((i, counter) => {
				const currentCoinData = priceData.find(item => item.symbol === i);
				if (!currentCoinData) return;
				const currentPrice = parseFloat(currentCoinData.price);
				for (let k = 0; k < activityData[counter].length; k++) {
					const prevPrice = activityData[counter][k];
					if (prevPrice !== 0) {
						const rate = currentPrice / prevPrice;
						if (bigCoinList.includes(i)) {
							if (rate <= bitcoinTriggerLow) {
								let result = {
									symbol: i,
									oldPrice: prevPrice,
									newPrice: currentPrice,
									change: parseFloat(((rate - 1) * 100).toFixed(2))
								}
								resultArray.push(result);
								newPriceData[counter] = Array(30).fill(0);
								break;
							} else if (rate >= bitcoinTriggerHigh) {
								let result = {
									symbol: i,
									oldPrice: prevPrice,
									newPrice: currentPrice,
									change: parseFloat(((rate - 1) * 100).toFixed(2))
								}
								resultArray.push(result);
								newPriceData[counter] = Array(30).fill(0);
								break;
							}
						} else {
							if (rate <= altcoinTriggerLow) {
								let result = {
									symbol: i,
									oldPrice: prevPrice,
									newPrice: currentPrice,
									change: parseFloat(((rate - 1) * 100).toFixed(2))
								}
								resultArray.push(result);
								newPriceData[counter] = Array(30).fill(0);
								break;
							} else if (rate >= altcoinTriggerHigh) {
								let result = {
									symbol: i,
									oldPrice: prevPrice,
									newPrice: currentPrice,
									change: parseFloat(((rate - 1) * 100).toFixed(2))
								}
								resultArray.push(result);
								newPriceData[counter] = Array(30).fill(0);
								break;
							}
						}
					}
				}
				newPriceData[counter].shift();
				newPriceData[counter].push(currentPrice);
			});
			if (resultArray.length > 0) {
				dispatch(setMarketActivity(resultArray));
			} 
			setActivityData(newPriceData);
		};
	}, [coinList, priceData, activityData, dispatch]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (fetchMarketActivityRef.current) {
				fetchMarketActivityRef.current();
			}
		}, 10000);

		return () => clearInterval(intervalId);
	}, []);

	return null;
};

export default useMarketActivity;
