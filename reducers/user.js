import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: null, fonction: null }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload)
      state.token = action.payload.token
      state.fonction = action.payload.fonction
    }
  }
})

export const { login } = userSlice.actions
export default userSlice.reducer
