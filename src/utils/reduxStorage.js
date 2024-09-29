import { createSlice } from '@reduxjs/toolkit';
import { getSpotCardStorage } from './localStorageUtils';

const localStorageData = getSpotCardStorage();

const ReduxSlice = createSlice({
  name: 'dataStore',
  initialState: {
    coinData: null,
    coinList: null,
    marketActivity: null,
    favoriteCoins: localStorageData?.favoriteCoins || [],
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
  },
});

export const { setCoinData, setCoinList, setMarketActivity, setFavoriteCoins } = ReduxSlice.actions;
export default ReduxSlice.reducer;