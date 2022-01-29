import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading : false
};

const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
      RELOAD : (state)=>{
        state.isLoading = !state.isLoading
      }
  },
});

export const {RELOAD} = LoadingSlice.actions;


export default LoadingSlice.reducer;
