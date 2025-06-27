import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: [],
  },
  reducers: {
    setmessage: (state, action) => {
      state.message = action.payload;
    },
   
  },
});

export const { setmessage } = messageSlice.actions;
export default messageSlice.reducer;
