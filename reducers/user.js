import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  token: null,
 };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    stockToken: (state, action) => {
      console.log(action.payload);
      state.token = action.payload;
    },
  }
})

export const { stockToken } = userSlice.actions
export default userSlice.reducer;
