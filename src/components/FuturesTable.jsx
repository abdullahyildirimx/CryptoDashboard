const FuturesTable = ({ content, favoriteCoins, toggleFavorite, sortOrder, toggleSortOrder, isMobile }) => {

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

function formatVolume(volume) {
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
		<div className='info-row d-flex justify-content-between align-items-center'>
			<div className='d-flex flex-column'>
				<div className='align-items-center'>
					<span className={sortOrder.includes('symbol') ? 'text-white' : 'text-secondary'}>
						Coin
					</span>
					<span className='text-secondary'>/</span>
					<span className={sortOrder.includes('volume') ? 'text-white' : 'text-secondary'}>
						Volume
					</span>
					<button className="mx-1 icon-button" onClick={() => handleToggleSort('symbol')}>
						{(sortOrder === 'symbolAsc' || sortOrder === 'volumeAsc') ? <i className="fa-solid fa-sort-up text-white"></i> : (sortOrder === 'symbolDesc' || sortOrder === 'volumeDesc') ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-secondary"></i>}
					</button>
				</div>
			</div>
			<div className='text-end'>
					<span className={sortOrder.includes('price') ? 'text-white' : 'text-secondary'}>
						Price
					</span>
					<span className='text-secondary'>/</span>
					<span className={sortOrder.includes('change') ? 'text-white' : 'text-secondary'}>
						Change
					</span>
				<button className="mx-1 icon-button" onClick={() => handleToggleSort('price')}>
					{(sortOrder === 'changeAsc' || sortOrder === 'priceAsc') ? <i className="fa-solid fa-sort-up text-white"></i> : (sortOrder === 'changeDesc' || sortOrder === 'priceDesc') ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-secondary"></i>}
				</button>
			</div>
		</div>
		<div className={`${isMobile ? 'table-container-mobile' : 'table-container'}`}>
			{content().map((item) => (
				<div key={item.symbol} className="coin-row d-flex justify-content-between align-items-center">
					<div className='d-flex justify-content-between align-items-center'>
						<button
							className="icon-button"
							onClick={() => handleToggleFavorite(item.symbol)}
							>
							{favoriteCoins.includes(item.symbol) ? <i className="fa-solid fa-star" style={{ color: 'gold', width: '20px'}}></i>
							: <i className="fa-regular fa-star" style={{ color: 'white', width: '20px'}}></i>}
						</button>
						<img className='mx-2 rounded-circle' src={getLogo(item)} width={24} onError={(e) => {e.target.src = '/genericicon.png';}}/>
						<div className='d-flex flex-column'>
							<div className='align-items-center'>
								{item.symbol}
							</div>
							<div className='text-secondary align-items-center'>
								{formatVolume(item.volume)}
							</div>
						</div>
					</div>
					<div className='text-end'>
						<div>
							{item.currency}{item.price}
						</div>
						<span className ={`${item.change < 0 ? 'negative-percent' : 'positive-percent'}`}>
							{formatChange(item.change)}
						</span>
					</div>
				</div>
			))}
		</div>
		</>
  );
};

export default FuturesTable;
