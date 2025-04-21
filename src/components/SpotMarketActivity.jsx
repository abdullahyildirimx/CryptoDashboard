import { useSelector } from 'react-redux';

const SpotMarketActivity = ({ activity }) => {
	const { spotCoinData } = useSelector((state) => state.dataStore);
	const getLogo = (symbol) => {
		return spotCoinData?.find(data => data.symbol === symbol)?.logo || '/genericicon.png';
	}

	const formatPrice = (symbol, price) => {
		const tickSize = spotCoinData?.find(data => data.symbol === symbol)?.tickSize;
		return tickSize ? parseFloat(price).toFixed(tickSize) : price;
	}

	return (
		activity.map((item, index) => (
			<div key={index} className="d-flex justify-content-between align-items-center mb-3 me-2">
				<div className='d-flex justify-content-between align-items-center'>
					<img className='mx-1 rounded-circle' src={getLogo(item.symbol)} width={30} onError={(e) => {e.target.src = '/genericicon.png';}}/>
					<div className='d-flex flex-column'>
						<div className='align-items-center'>
							{item.symbol}
						</div>
						<div className='text-secondary align-items-center'>
							{item.time}
						</div>
					</div>
				</div>
				<div className='text-end'>
					<div className={`change ${item.change < 0 ? 'negative' : 'positive'} mb-1`}>
						{formatPrice(item.symbol, item.oldPrice)} → {formatPrice(item.symbol, item.newPrice)} 
					</div>
					<span className ={`change ${item.change < 0 ? 'negative' : 'positive'}`}>
						<span className="icon">{item.change > 0 ? '↑' : '↓'}</span>
						{parseFloat(item.change).toFixed(2)}%
					</span>
				</div>
			</div>
		))
	);
};

export default SpotMarketActivity;