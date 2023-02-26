import { createSlice } from '@reduxjs/toolkit'
import { ISectionStore } from '../../types'

const initialState: ISectionStore = {
    sections: [],
}

export const sectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {},
    extraReducers: {},
})

export default sectionSlice.reducer
