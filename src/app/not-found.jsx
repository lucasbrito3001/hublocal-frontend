"use client"
import { NotFoundPage } from "./styled";
import Logo from "@/assets/logo.svg"

export default function Custom404() {
    return (
        <>
            <title>Página não encontrada</title>
            <NotFoundPage>
                <img src={Logo.src} alt="logo hublocal" />
                <h1>Oops! Página não encontrada...</h1>
            </NotFoundPage>
        </>
    )
} 