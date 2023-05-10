import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    totalLocations: 0,
    isLoading: false,
    isOpenDialog: false
}

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        toggleIsLoading: (state) => { state.isLoading = !state.isLoading },
        toggleIsOpenDialog: (state) => { state.isOpenDialog = !state.isOpenDialog },
        setLocations: (state, action) => { state.list = action.payload },
        setTotalLocations: (state, action) => { state.totalLocations = action.payload },
    }
})

export const { toggleIsLoading, toggleIsOpenDialog, setLocations, setTotalLocations } = locationsSlice.actions
export const locationsReducer = locationsSlice.reducer