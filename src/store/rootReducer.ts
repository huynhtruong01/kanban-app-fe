import { combineReducers } from '@reduxjs/toolkit'
import boardReducer from './board'
import sectionReducer from './section'
import userReducer from './users'

export const rootReducer = combineReducers({
    user: userReducer,
    board: boardReducer,
    section: sectionReducer,
})
