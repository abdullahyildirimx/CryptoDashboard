const CoinTable = ({ content, favoriteCoins, toggleFavorite, sortOrder, toggleSortOrder }) => {
  const handleToggleFavorite = (symbol) => {
		toggleFavorite(symbol);
  };

	const handleToggleSort = (column) => {
		toggleSortOrder(column);
	};

	const getLogo = (item) => {
		return item?.logo || '/genericicon.png';
	}

  const formatChange = (change) => {
    const parsedChange = parseFloat(change);
    const formattedChange = parsedChange.toFixed(2);
    return parsedChange < 0 ? `${formattedChange}%` : `+${formattedChange}%`;
  };

	const formatVolume = (volume) => {
		if (volume >= 1_000_000_000) {
			return `$${(volume / 1_000_000_000).toFixed(2)}B`;
		} else if (volume >= 1_000_000) {
			return `$${(volume / 1_000_000).toFixed(2)}M`;
		} else if (volume >= 1_000) {
			return `$${(volume / 1_000).toFixed(2)}K`;
		} else {
			return `$${volume.toFixed(2)}`;
		}
	}

  return (
		<>
			<div className="text-[11px] md:text-[14px] px-1.5 py-3 ml-15 flex justify-between items-center">
				<div className='flex items-center'>
					<span className={sortOrder.includes('symbol') ? 'text-white-100' : 'text-grey1'}>
						Coin
					</span>
					<button className="icon-button" onClick={() => handleToggleSort('symbol')}>
						{sortOrder === 'symbolAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'symbolDesc' ? <i className="fa-solid fa-sort-down text-white-100"></i> : <i className="fa-solid fa-sort text-grey1"></i>}
					</button>
					<span className='text-grey1'>/</span>
					<span className={sortOrder.includes('volume') ? 'text-white-100' : 'text-grey1'}>
						Volume
					</span>
					<button className="icon-button" onClick={() => handleToggleSort('volume')}>
						{sortOrder === 'volumeAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'volumeDesc' ? <i className="fa-solid fa-sort-down text-white-100"></i> : <i className="fa-solid fa-sort text-grey1"></i>}
					</button>
				</div>
				<div className='text-end'>
					<span className={sortOrder.includes('price') ? 'text-white-100' : 'text-grey1'}>
						Price
					</span>
					<button className="icon-button" onClick={() => handleToggleSort('price')}>
						{sortOrder === 'priceAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'priceDesc' ? <i className="fa-solid fa-sort-down text-white-100"></i> : <i className="fa-solid fa-sort text-grey1"></i>}
					</button>
					<span className='text-grey1'>/</span>
					<span className={sortOrder.includes('change') ? 'text-white-100' : 'text-grey1'}>
						Change
					</span>
					<button className="icon-button" onClick={() => handleToggleSort('change')}>
						{sortOrder === 'changeAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'changeDesc' ? <i className="fa-solid fa-sort-down text-white-100"></i> : <i className="fa-solid fa-sort text-grey1"></i>}
					</button>
				</div>
			</div>
			<div className="h-[205px] md:h-[405px] text-[12px] md:text-[14px] overflow-y-auto">
				{content.map((item) => (
					<div key={item.symbol} className="px-1.5 py-2 flex justify-between items-center">
						<div className='flex justify-between items-center'>
							<button
								className="icon-button"
								onClick={() => handleToggleFavorite(item.symbol)}
								>
								{favoriteCoins.includes(item.symbol) ? <i className="align-middle fa-solid fa-star" style={{ color: 'gold', width: '20px'}}></i>
								: <i className="align-middle fa-regular fa-star" style={{ color: 'white', width: '20px'}}></i>}
							</button>
							<img className='mx-2 rounded-circle' src={getLogo(item)} width={24} onError={(e) => {e.target.src = '/genericicon.png';}}/>
							<div className='flex flex-col'>
								<div className='flex items-center'>
									{item.symbol}
								</div>
								<div className='flex text-grey1 items-center'>
									{formatVolume(item.volume)}
								</div>
							</div>
						</div>
						<div className='text-end'>
							<div>
								{item.currency}{item.price}
							</div>
							<span className ={`${item.change < 0 ? 'text-red3' : 'text-green3'}`}>
								{formatChange(item.change)}
							</span>
						</div>
					</div>
				))}
			</div>
		</>
  );
};

export default CoinTable;
