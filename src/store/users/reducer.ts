import { PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUserInitState } from '../../types'

export const userReducer = {
    setUser: (state: IUserInitState, action: PayloadAction<IUser>) => {
        state.user = action.payload
    },
}
