import { createSlice } from '@reduxjs/toolkit'
import { IUserInitState } from '../../types'
import { userReducer } from './reducer'

const initialState: IUserInitState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: userReducer,
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
