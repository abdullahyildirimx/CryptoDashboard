const MarketActivity = ({ activity }) => {
  
	return (
		activity.map((item, index) => (
			<div key={index} className="flex justify-between items-center mb-4 mr-2">
				<div className='flex justify-between items-center'>
					<img className='mx-1 rounded-full' src={item.logo} width={30} onError={(e) => {e.target.src = '/genericicon.png';}}/>
					<div className='flex flex-col'>
						<div className='flex items-center'>
							{item.symbol}
						</div>
						<div className='flex text-grey1 items-center'>
							{item.time}
						</div>
					</div>
				</div>
				<div className='text-end'>
					<div className={`text-[12px] rounded-[5px] font-semibold py-[2px] px-[8px] ${item.change < 0 ? 'text-red1 bg-red2' : 'text-green1 bg-green2'} mb-1`}>
						{item.oldPrice} → {item.newPrice} 
					</div>
					<span className ={`text-[12px] rounded-[5px] font-semibold py-[2px] px-[8px] ${item.change < 0 ? 'text-red1 bg-red2' : 'text-green1 bg-green2'}`}>
						<span>{item.change > 0 ? '↑' : '↓'}</span>
						{parseFloat(item.change).toFixed(2)}%
					</span>
				</div>
			</div>
		))
	);
};

export default MarketActivity;