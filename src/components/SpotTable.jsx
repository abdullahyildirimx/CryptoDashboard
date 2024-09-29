const SpotTable = ({ content, favoriteCoins, toggleFavorite, sortOrder, toggleSortOrder }) => {

  const handleToggleFavorite = (symbol) => {
		toggleFavorite(symbol);
  };

	const handleToggleSort = (column) => {
		toggleSortOrder(column);
	};

  const getPercent = (percent) => {
    const parsedPercent = parseFloat(percent);
    const formattedPercent = parsedPercent.toFixed(2);
    return parsedPercent < 0 ? `${formattedPercent}%` : `+${formattedPercent}%`;
  };

  return (
	<table className="table table-striped">
		<thead>
			<tr>
				<th></th>
				<th></th>
				<th>
					<span>Coin</span>
					<button className="mx-1 icon-button" onClick={() => handleToggleSort('symbol')}>
						{sortOrder === 'symbolAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'symbolDesc' ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-white"></i>}
					</button>
				</th>
				<th>
					<span>Price</span>
					<button className="mx-1 icon-button" onClick={() => handleToggleSort('price')}>
						{sortOrder === 'priceAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'priceDesc' ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-white"></i>}
					</button>
				</th>
				<th>
					<span>Change</span>
					<button className="mx-1 icon-button" onClick={() => handleToggleSort('change')}>
						{sortOrder === 'changeAsc' ? <i className="fa-solid fa-sort-up text-white"></i> : sortOrder === 'changeDesc' ? <i className="fa-solid fa-sort-down text-white"></i> : <i className="fa-solid fa-sort text-white"></i>}
					</button>
				</th>
			</tr>
		</thead>
		<tbody>
			{content().map((item) => (
				<tr key={item.symbol}>
				<td>
						<button
						className="icon-button"
						onClick={() => handleToggleFavorite(item.symbol)}
						>
						{favoriteCoins.includes(item.symbol) ? <i className="fa-solid fa-star" style={{ color: 'gold'}}></i>
						: <i className="fa-regular fa-star" style={{ color: 'white'}}></i>}
						</button>
				</td>
				<td><img className='mx-1 rounded-circle' src={item.logo} width={20}></img></td>
				<td>{item.symbol}</td>
				<td>
						<span>{item.currency}{item.price}</span>
				</td>
				<td>
					<span className={`change ${parseFloat(item.change) < 0 ? 'negative' : 'positive'}`}>
						<span>
						{getPercent(item.change)}
						</span>
					</span>
				</td>
				</tr>
			))}
		</tbody>
	</table>

  );
};

export default SpotTable;
