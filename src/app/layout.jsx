"use client"

import './globals.css'
import "react-toastify/dist/ReactToastify.css";
import StyledComponentsRegistry from '../lib/registry'
import { createTheme, ThemeProvider } from '@mui/material'
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const poppins = Poppins({ weight: ['100', '300', '400', '500', '600', '700'], subsets: ['devanagari'] })

const theme = createTheme({
    palette: {
        primary: {
            main: "#0385FD"
        },
        secondary: {
            main: "#00CC99"
        }
    }
})

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <StyledComponentsRegistry>
                <ThemeProvider theme={theme}>
                    <body className={poppins.className}>
                        <ToastContainer autoClose={3000}></ToastContainer>
                        <Provider store={store}>
                            <PersistGate loading={null} persistor={persistor}>
                                {children}
                            </PersistGate>
                        </Provider>
                    </body>
                </ThemeProvider>
            </StyledComponentsRegistry>
        </html>
    )
}
