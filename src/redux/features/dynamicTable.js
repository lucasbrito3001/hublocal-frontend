import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 0,
    rowsPerPage: 10
}

export const dynamicTableSlice = createSlice({
    name: 'dynamicTable',
    initialState,
    reducers: {
        setPage: (state, action) => { state.page = action.payload },
        setRowsPerPage: (state, action) => { state.rowsPerPage = action.payload },
    }
})

export const { setPage, setRowsPerPage } = dynamicTableSlice.actions
export const dynamicTableReducer = dynamicTableSlice.reducer