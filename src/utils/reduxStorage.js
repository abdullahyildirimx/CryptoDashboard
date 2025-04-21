import { createSlice } from '@reduxjs/toolkit';
import { getMarketBuySellStorage, getSpotCardStorage, getFuturesCardStorage } from './localStorageUtils';

const spotStorage = getSpotCardStorage();
const futuresStorage = getFuturesCardStorage();
const buySellStorage = getMarketBuySellStorage();

const ReduxSlice = createSlice({
  name: 'dataStore',
  initialState: {
    spotCoinData: null,
    spotCoinList: null,
    futuresCoinData: null,
    futuresCoinList: null,
    spotMarketActivity: null,
    futuresMarketActivity: null,
    spotFavoriteCoins: spotStorage?.favoriteCoins || [],
    futuresFavoriteCoins: futuresStorage?.favoriteCoins || [],
    apiEnabled: buySellStorage?.apiEnabled || false,
    apiKey: buySellStorage?.binanceApiKey || "",
    apiSecret: buySellStorage?.binanceApiSecret || "",
  },
  reducers: {
    setSpotCoinData(state, action) {
      state.spotCoinData = action.payload;
    },
    setSpotCoinList(state, action) {
      state.spotCoinList = action.payload;
    },
    setFuturesCoinData(state, action) {
      state.futuresCoinData = action.payload;
    },
    setFuturesCoinList(state, action) {
      state.futuresCoinList = action.payload;
    },
    setSpotMarketActivity(state, action) {
      state.spotMarketActivity = action.payload;
    },
    setFuturesMarketActivity(state, action) {
      state.futuresMarketActivity = action.payload;
    },
    setSpotFavoriteCoins(state, action) {
      state.spotFavoriteCoins = action.payload;
    },
    setFuturesFavoriteCoins(state, action) {
      state.futuresFavoriteCoins = action.payload;
    },
    setApiEnabled(state, action) {
      state.apiEnabled = action.payload;
    },
    setApiKey(state, action) {
      state.apiKey = action.payload;
    },
    setApiSecret(state, action) {
      state.apiSecret = action.payload;
    },
  },
});

export const { setSpotCoinData, setSpotCoinList, setFuturesCoinData, setFuturesCoinList, setSpotMarketActivity, setFuturesMarketActivity, setSpotFavoriteCoins, setFuturesFavoriteCoins, setApiEnabled, setApiKey, setApiSecret } = ReduxSlice.actions;
export default ReduxSlice.reducer;