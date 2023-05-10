import { configureStore } from "@reduxjs/toolkit"
import { authorizationReducer } from "./features/auth"
import { persistReducer, persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import { companiesReducer } from "./features/companies";
import { locationsReducer } from "./features/locations";
import { dynamicTableReducer } from "./features/dynamicTable";

const persistConfig = {
    key: 'authorization',
    storage,
    whitelist: ['user']
}

const persistedAuthorizationReducer = persistReducer(persistConfig, authorizationReducer)

export const store = configureStore({
    reducer: {
        authorization: persistedAuthorizationReducer,
        companies: companiesReducer,
        locations: locationsReducer,
        dynamicTable: dynamicTableReducer
    },
    devTools: true,
    middleware: [thunk]
})

export const persistor = persistStore(store)