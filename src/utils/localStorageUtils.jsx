export const getSpotCardStorage = () => {
	return JSON.parse(localStorage.getItem('spotCard')) || {};
};

export const setSpotCardStorage = (key, value) => {
	const spotCard = JSON.parse(localStorage.getItem('spotCard')) || {};
	spotCard[key] = value;
	localStorage.setItem('spotCard', JSON.stringify(spotCard));
};