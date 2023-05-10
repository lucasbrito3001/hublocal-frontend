import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    selectedCompany: {},
    totalCompanies: 0,
    isLoading: false,
    isOpenDialog: false
}

export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        toggleIsLoading: (state) => { state.isLoading = !state.isLoading },
        toggleIsOpenDialog: (state) => { state.isOpenDialog =  !state.isOpenDialog },
        setCompanies: (state, action) => { state.list = action.payload },
        setSelectedCompany: (state, action) => { state.selectedCompany = action.payload },
        setTotalCompanies: (state, action) => { state.totalCompanies = action.payload }
    }
})

export const { toggleIsOpenDialog, setCompanies, setSelectedCompany, setTotalCompanies } = companiesSlice.actions
export const companiesReducer = companiesSlice.reducer