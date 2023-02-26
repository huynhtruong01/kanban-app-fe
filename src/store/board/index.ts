import { createSlice } from '@reduxjs/toolkit'
import { IBoardInitState } from '../../types'
import { boardReducer } from './reducer'
import { extraReducers } from './thunkApi'

const initialState: IBoardInitState = {
    favorites: [],
    boards: [],
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: boardReducer,
    extraReducers,
})

export const { setBoards, setFavorites, updateFavorite, updateBoard, deleteBoard } =
    boardSlice.actions
export default boardSlice.reducer
