import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: { token: null, username: null } }

export const exempleSlice = createSlice({
  name: 'exemple',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    }
  }
})

export const { login, logout } = exempleSlice.actions
export default exempleSlice.reducer
