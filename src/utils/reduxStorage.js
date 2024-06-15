import { createSlice } from '@reduxjs/toolkit';
import { getSpotCardStorage } from './localStorageUtils';

const localStorageData = getSpotCardStorage();

const ReduxSlice = createSlice({
  name: 'dataStore',
  initialState: {
    priceData: null,
    coinList: null,
    marketActivity: [],
    favoriteCoins: localStorageData?.favoriteCoins || [],
  },
  reducers: {
    setPriceData(state, action) {
      state.priceData = action.payload;
    },
    setCoinList(state, action) {
      state.coinList = action.payload;
    },
    setMarketActivity(state, action) {
      state.marketActivity = [...action.payload, ...state.marketActivity];
    },
    setFavoriteCoins(state, action) {
      state.favoriteCoins = action.payload;
    },
  },
});

export const { setPriceData, setCoinList, setMarketActivity, setFavoriteCoins } = ReduxSlice.actions;
export default ReduxSlice.reducer;