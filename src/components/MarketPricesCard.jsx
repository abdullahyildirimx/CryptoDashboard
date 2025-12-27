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
import { Button } from '@base-ui/react'

const MarketPricesCard = ({ isSpot = false }) => {
  const localStorageData = isSpot
    ? getSpotCardStorage()
    : getFuturesCardStorage()
  const [selectedTab, setSelectedTab] = useState(
    localStorageData?.selectedTab || 'all',
  )
  const [sortOrder, setSortOrder] = useState('default')
  const [searchedCoins, setSearchedCoins] = useState(null)
  const {
    spotCoinData,
    spotFavoriteCoins,
    futuresCoinData,
    futuresFavoriteCoins,
  } = useSelector((state) => state.dataStore)
  const selectedCoinData = isSpot ? spotCoinData : futuresCoinData
  const selectedFavoriteCoins = isSpot
    ? spotFavoriteCoins
    : futuresFavoriteCoins
  const dispatch = useDispatch()

  const formatTitlePrice = (value) => {
    const num = Number(value)
    if (!Number.isFinite(num)) return null

    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
    })
  }

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
    if (searchedCoins) {
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

  const handleSearch = (value) => {
    if (!selectedCoinData) {
      return []
    }
    if (value) {
      const filteredResults = selectedCoinData
        .filter((item) =>
          item.symbol.toLowerCase().includes(value.toLowerCase()),
        )
        .map((item) => item.symbol)
      setSearchedCoins(filteredResults)
    } else {
      setSearchedCoins(null)
    }
  }

  const coins = sortedAllCoins()

  return (
    <div className="p-8">
      <title>
        {selectedCoinData
          ? `${formatTitlePrice(selectedCoinData?.find((item) => item.symbol === 'BTC')?.price)} | CryptoPrices`
          : 'CryptoPrices'}
      </title>
      <div className="bg-black1 rounded-2xl p-16 text-white1 text-[14px] font-medium border border-grey2">
        <div className="flex items-center justify-between mb-14">
          <h1 className="text-[18px]/[24px] md:text-[20px]">
            {isSpot ? 'Spot Market' : 'Futures Market'}
          </h1>
          <SearchBar handleSearch={handleSearch} id={'searchCoin'} />
        </div>
        <div className="relative w-full border-b-2 border-grey2">
          <div className="flex items-center">
            {['favorite', 'all'].map((tab) => (
              <Button
                key={tab}
                onClick={() => {
                  handleTabChange(tab)
                }}
                className={`
                  px-16 py-8 font-medium transition-all duration-150 ease-in-out
                  ${
                    selectedTab === tab
                      ? 'text-white1'
                      : 'text-white-65 hover:text-white-80'
                  }
                `}
              >
                {tab === 'favorite' ? 'Favorite' : 'All'}
              </Button>
            ))}
          </div>
          <span
            className={`
              absolute -bottom-2 h-2 rounded-full bg-white1
              transition-all duration-300 ease-in-out
              ${
                selectedTab === 'all'
                  ? 'w-24 translate-x-94'
                  : 'w-36 translate-x-23'
              }
            `}
          />
        </div>
        <div className="h-290 md:h-[calc(100vh-232px)]">
          {selectedCoinData ? (
            searchedCoins?.length === 0 ? (
              <div className="h-full flex justify-center items-center">
                No results found.
              </div>
            ) : selectedTab === 'favorite' &&
              !selectedFavoriteCoins.length &&
              !searchedCoins?.length ? (
              <div className="h-full flex justify-center items-center">
                You don&apos;t have any favorite coins.
              </div>
            ) : (
              <CoinTable
                coins={coins}
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
