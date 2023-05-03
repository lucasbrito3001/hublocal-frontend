"use client"

import AsideAuth from "@/components/auth/aside"
import { Grid } from "@mui/material"
import MainAuth from "@/components/auth/main"

export default function AuthLayout({ children }) {
    return (
        <Grid container direction="row" height="100vh">
            <Grid item xs={12} lg={6}>
                <AsideAuth></AsideAuth>
            </Grid>
            <Grid item xs={12} lg={6}>
                <MainAuth>

                    {children}
                </MainAuth>
            </Grid>
        </Grid>
    )
}