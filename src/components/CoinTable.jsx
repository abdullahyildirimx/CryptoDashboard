const CoinTable = ({ content, favoriteCoins, toggleFavorite, sortOrder, toggleSortOrder, isMobile }) => {

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
		<div className={`${isMobile && 'font-size-11'} info-row d-flex justify-content-between align-items-center`}>
			<div className='d-flex flex-column'>
				<div className='align-items-center'>
					<span className={sortOrder.includes('symbol') ? 'text-white' : 'text-secondary'}>
						Coin
					</span>
					<button className="icon-button" onClick={() => handleToggleSort('symbol')}>
						{sortOrder === 'symbolAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'symbolDesc' ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-secondary"></i>}
					</button>
					<span className='text-secondary'>/</span>
					<span className={sortOrder.includes('volume') ? 'text-white' : 'text-secondary'}>
						Volume
					</span>
					<button className="icon-button" onClick={() => handleToggleSort('volume')}>
						{sortOrder === 'volumeAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'volumeDesc' ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-secondary"></i>}
					</button>
				</div>
			</div>
			<div className='text-end'>
				<span className={sortOrder.includes('price') ? 'text-white' : 'text-secondary'}>
					Price
				</span>
				<button className="icon-button" onClick={() => handleToggleSort('price')}>
					{sortOrder === 'priceAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'priceDesc' ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-secondary"></i>}
				</button>
				<span className='text-secondary'>/</span>
				<span className={sortOrder.includes('change') ? 'text-white' : 'text-secondary'}>
					Change
				</span>
				<button className="icon-button" onClick={() => handleToggleSort('change')}>
					{sortOrder === 'changeAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'changeDesc' ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-secondary"></i>}
				</button>
			</div>
		</div>
		<div className={`${isMobile ? 'table-container-mobile' : 'table-container'}`}>
			{content.map((item) => (
				<div key={item.symbol} className="coin-row d-flex justify-content-between align-items-center">
					<div className='d-flex justify-content-between align-items-center'>
						<button
							className="icon-button"
							onClick={() => handleToggleFavorite(item.symbol)}
							>
							{favoriteCoins.includes(item.symbol) ? <i className="align-middle fa-solid fa-star" style={{ color: 'gold', width: '20px'}}></i>
							: <i className="align-middle fa-regular fa-star" style={{ color: 'white', width: '20px'}}></i>}
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

export default CoinTable;
