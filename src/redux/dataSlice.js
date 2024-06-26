import { createSlice } from "@reduxjs/toolkit";
import { getData } from "./action";

const initialState = {
  data: null,
  isloading: true,
  error: null,
};
const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isloading = false;
      state.error = false;
      state.data = action.payload;
    });
  },
});

export default dataSlice.reducer;
