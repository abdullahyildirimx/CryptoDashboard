import { createSlice } from '@reduxjs/toolkit';

const ReduxSlice = createSlice({
  name: 'dataStore',
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

export const { setPriceData, setCoinList, setLoading } = ReduxSlice.actions;
export default ReduxSlice.reducer;