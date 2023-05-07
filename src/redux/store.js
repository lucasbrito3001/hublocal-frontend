import { configureStore } from "@reduxjs/toolkit"
import { authorizationReducer } from "./features/auth"
import { persistReducer, persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'authorization',
    storage
}

const persistedAuthorizationReducer = persistReducer(persistConfig, authorizationReducer)

export const store = configureStore({
    reducer: {
        authorization: persistedAuthorizationReducer,
    },
    devTools: true,
    middleware: [thunk]
})

export const persistor = persistStore(store)