import { createSlice } from '@reduxjs/toolkit';

const SpotDataSlice = createSlice({
  name: 'spotData',
  initialState: {
    priceData: null,
    coinList: null,
    loading: true,
  },
  reducers: {
    setPriceData(state, action) {
      state.priceData = action.payload;
    },
    setCoinList(state, action) {
      state.coinList = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setPriceData, setCoinList, setLoading } = SpotDataSlice.actions;
export default SpotDataSlice.reducer;