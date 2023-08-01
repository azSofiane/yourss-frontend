import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // todo - faire console.log de action.payload.token si bon si non retirer .token
      state.value.token = action.payload.token;
    },
    stockToken: (state, action) => {
      state.token = action.payload;
    }
  }
})

export const { login, stockToken } = userSlice.actions
export default userSlice.reducer
