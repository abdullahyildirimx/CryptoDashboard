import { createSlice } from '@reduxjs/toolkit';
import { getMarketBuySellStorage, getSpotCardStorage } from './localStorageUtils';

const localStorageData = getSpotCardStorage();
const localStorageData2 = getMarketBuySellStorage();

const ReduxSlice = createSlice({
  name: 'dataStore',
  initialState: {
    coinData: null,
    coinList: null,
    marketActivity: null,
    favoriteCoins: localStorageData?.favoriteCoins || [],
    apiEnabled: localStorageData2?.apiEnabled || false,
    apiKey: localStorageData2?.binanceApiKey || "",
    apiSecret: localStorageData2?.binanceApiSecret || "",
  },
  reducers: {
    setCoinData(state, action) {
      state.coinData = action.payload;
    },
    setCoinList(state, action) {
      state.coinList = action.payload;
    },
    setMarketActivity(state, action) {
      state.marketActivity = action.payload;
    },
    setFavoriteCoins(state, action) {
      state.favoriteCoins = action.payload;
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

export const { setCoinData, setCoinList, setMarketActivity, setFavoriteCoins, setApiEnabled, setApiKey, setApiSecret } = ReduxSlice.actions;
export default ReduxSlice.reducer;