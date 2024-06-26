const MarketActivity = ({ activity }) => {
	return (
		activity.map((item, index) => (
			<div key={index} className="d-flex justify-content-between align-items-center mb-3 me-2">
				<div className='d-flex justify-content-between align-items-center'>
					<img className='mx-1 rounded-circle' src={`/logos/${item.symbol}.png`} width={30}></img>
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
						{item.oldPrice} → {item.newPrice} 
					</div>
					<span className ={`change ${item.change < 0 ? 'negative' : 'positive'}`}>
						<span className="icon">{item.change > 0 ? '↑' : '↓'}</span>
						{item.change}%
					</span>
				</div>
			</div>
		))
	);
};

export default MarketActivity;