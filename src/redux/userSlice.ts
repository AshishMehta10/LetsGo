import { createSlice, type PayloadAction, type WritableDraft } from '@reduxjs/toolkit'
import type { IUser } from '../models/user.model'

export interface IuserState {
  userData: IUser | null
}

const initialState: IuserState = {
  userData: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuserdata: (state, action) => {
      state.userData = action.payload
    }
  }
})

export const { setuserdata } = userSlice.actions

export default userSlice.reducer