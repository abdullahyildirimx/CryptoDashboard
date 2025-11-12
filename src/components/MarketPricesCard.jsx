import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from './SearchBar'
import CoinTable from './CoinTable'
import {
  getFuturesCardStorage,
  setFuturesCardStorage,
  getSpotCardStorage,
  setSpotCardStorage,
} from '../utils/localStorageUtils'
import {
  setSpotFavoriteCoins,
  setFuturesFavoriteCoins,
} from '../utils/reduxStorage'

const MarketPricesCard = ({ isSpot = false }) => {
  const localStorageData = isSpot
    ? getSpotCardStorage()
    : getFuturesCardStorage()
  const [selectedTab, setSelectedTab] = useState(
    localStorageData?.selectedTab || 'all',
  )
  const [sortOrder, setSortOrder] = useState('default')
  const [searchedCoins, setSearchedCoins] = useState([])
  const {
    spotCoinData,
    spotCoinList,
    spotFavoriteCoins,
    futuresCoinData,
    futuresCoinList,
    futuresFavoriteCoins,
  } = useSelector((state) => state.dataStore)
  const selectedCoinData = isSpot ? spotCoinData : futuresCoinData
  const selectedCoinList = isSpot ? spotCoinList : futuresCoinList
  const selectedFavoriteCoins = isSpot
    ? spotFavoriteCoins
    : futuresFavoriteCoins
  const dispatch = useDispatch()

  const handleTabChange = (tab) => {
    setSelectedTab(tab)
    if (isSpot) {
      setSpotCardStorage('selectedTab', tab)
    } else {
      setFuturesCardStorage('selectedTab', tab)
    }
  }

  const toggleFavorite = (symbol) => {
    if (isSpot) {
      if (spotFavoriteCoins.includes(symbol)) {
        const updatedFavorites = spotFavoriteCoins.filter(
          (coin) => coin !== symbol,
        )
        dispatch(setSpotFavoriteCoins(updatedFavorites))
        setSpotCardStorage('favoriteCoins', updatedFavorites)
      } else {
        const updatedFavorites = [...spotFavoriteCoins, symbol]
        dispatch(setSpotFavoriteCoins(updatedFavorites))
        setSpotCardStorage('favoriteCoins', updatedFavorites)
      }
    } else {
      if (futuresFavoriteCoins.includes(symbol)) {
        const updatedFavorites = futuresFavoriteCoins.filter(
          (coin) => coin !== symbol,
        )
        dispatch(setFuturesFavoriteCoins(updatedFavorites))
        setFuturesCardStorage('favoriteCoins', updatedFavorites)
      } else {
        const updatedFavorites = [...futuresFavoriteCoins, symbol]
        dispatch(setFuturesFavoriteCoins(updatedFavorites))
        setFuturesCardStorage('favoriteCoins', updatedFavorites)
      }
    }
  }

  const toggleSortOrder = (column) => {
    let nextOrder = 'default'
    if (column === 'symbol') {
      nextOrder =
        sortOrder === 'symbolDesc'
          ? 'symbolAsc'
          : sortOrder === 'symbolAsc'
            ? 'default'
            : 'symbolDesc'
    } else if (column === 'price') {
      nextOrder =
        sortOrder === 'priceDesc'
          ? 'priceAsc'
          : sortOrder === 'priceAsc'
            ? 'default'
            : 'priceDesc'
    } else if (column === 'change') {
      nextOrder =
        sortOrder === 'changeDesc'
          ? 'changeAsc'
          : sortOrder === 'changeAsc'
            ? 'default'
            : 'changeDesc'
    } else {
      nextOrder =
        sortOrder === 'volumeDesc'
          ? 'volumeAsc'
          : sortOrder === 'volumeAsc'
            ? 'default'
            : 'volumeDesc'
    }
    setSortOrder(nextOrder)
  }

  const sortedAllCoins = () => {
    if (!selectedCoinData) {
      return []
    }
    let coins = []
    if (searchedCoins.length > 0) {
      coins = searchedCoins
        .map((symbol) => {
          return selectedCoinData.find((data) => data.symbol === symbol) || null
        })
        .filter((coin) => coin !== null)
    } else if (selectedTab === 'favorite') {
      coins = selectedFavoriteCoins
        .map((symbol) => {
          return selectedCoinData.find((data) => data.symbol === symbol) || null
        })
        .filter((coin) => coin !== null)
    } else {
      coins = selectedCoinData
    }

    return coins.slice().sort((a, b) => {
      const symbolA = a.symbol
      const symbolB = b.symbol
      const changeA = parseFloat(a.change)
      const changeB = parseFloat(b.change)
      const priceA = parseFloat(a.price)
      const priceB = parseFloat(b.price)
      const volumeA = parseFloat(a.volume)
      const volumeB = parseFloat(b.volume)

      return sortOrder === 'priceAsc'
        ? priceA - priceB
        : sortOrder === 'priceDesc'
          ? priceB - priceA
          : sortOrder === 'symbolAsc'
            ? symbolA.localeCompare(symbolB)
            : sortOrder === 'symbolDesc'
              ? symbolB.localeCompare(symbolA)
              : sortOrder === 'changeAsc'
                ? changeA - changeB
                : sortOrder === 'changeDesc'
                  ? changeB - changeA
                  : sortOrder === 'volumeAsc'
                    ? volumeA - volumeB
                    : sortOrder === 'volumeDesc'
                      ? volumeB - volumeA
                      : volumeB - volumeA
    })
  }

  const handleSearch = (result) => {
    if (!selectedCoinData) {
      return []
    }
    if (result) {
      const filteredResults = selectedCoinList
        ? selectedCoinList?.filter((item) =>
            item.toLowerCase().includes(result.toLowerCase()),
          )
        : []
      setSearchedCoins(filteredResults)
    } else {
      setSearchedCoins([])
    }
  }

  const content = sortedAllCoins()

  return (
    <div className="p-8">
      <div className="bg-black1 rounded-2xl p-16 text-white1 text-[14px] font-medium border border-white-15">
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-[20px] leading-[1.2] mt-4 mr-8">
            {isSpot ? 'Spot' : 'Futures'} Market
          </h1>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="flex border-b border-border-grey">
          <button
            className={`${selectedTab === 'favorite' ? '-mb-1 border-b-2 border-border-grey border-b-black1' : 'border-transparent hover:border-border-grey hover:border-b-transparent'} btn px-16 py-8 text-white border rounded-t-md`}
            onClick={() => handleTabChange('favorite')}
          >
            Favorite
          </button>
          <button
            className={`${selectedTab === 'all' ? '-mb-1 border-b-2 border-border-grey border-b-black1' : 'border-transparent hover:border-border-grey hover:border-b-transparent'} btn px-16 py-8 text-white border rounded-t-md`}
            onClick={() => handleTabChange('all')}
          >
            All
          </button>
        </div>
        <div className="h-250 md:h-[calc(100vh-240px)]">
          {selectedCoinData ? (
            selectedTab === 'favorite' &&
            !selectedFavoriteCoins.length &&
            !searchedCoins.length ? (
              <div className="h-full flex justify-center items-center">
                You don&apos;t have any favorite coins.
              </div>
            ) : (
              <CoinTable
                content={content}
                isSpot={isSpot}
                favoriteCoins={selectedFavoriteCoins}
                sortOrder={sortOrder}
                toggleFavorite={toggleFavorite}
                toggleSortOrder={toggleSortOrder}
              />
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="w-36 h-36 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketPricesCard
