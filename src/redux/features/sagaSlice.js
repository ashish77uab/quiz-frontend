import { createSlice } from "@reduxjs/toolkit";

const sagaSlice = createSlice({
  name: "saga",
  initialState: {
    categories: [],
    loading: false,
  },
  reducers: {
    setSagaCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSagaCategories } = sagaSlice.actions;

export default sagaSlice.reducer;
