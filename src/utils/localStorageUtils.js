export const getSpotCardStorage = () => {
	return JSON.parse(localStorage.getItem('spotCard'));
};

export const getMarketActivityStorage = () => {
	return JSON.parse(localStorage.getItem('marketActivity'));
};

export const getMarketBuySellStorage = () => {
	return JSON.parse(localStorage.getItem('marketBuySell'));
};

export const setSpotCardStorage = (key, value) => {
	const spotCard = JSON.parse(localStorage.getItem('spotCard')) || {};
	spotCard[key] = value;
	localStorage.setItem('spotCard', JSON.stringify(spotCard));
};

export const setMarketActivityStorage = (key, value) => {
	const marketActivity = JSON.parse(localStorage.getItem('marketActivity')) || {};
	marketActivity[key] = value;
	localStorage.setItem('marketActivity', JSON.stringify(marketActivity));
};

export const setMarketBuySellStorage = (key, value) => {
	const marketBuySell = JSON.parse(localStorage.getItem('marketBuySell')) || {};
	marketBuySell[key] = value;
	localStorage.setItem('marketBuySell', JSON.stringify(marketBuySell));
};