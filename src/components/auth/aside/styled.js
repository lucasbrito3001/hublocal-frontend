"use client"

import styled from "styled-components"
import BgAuthImg from "@/assets/bg-auth.svg"

export const AuthBanner = styled.aside`
    width: 100%;
    height: 100%;
    background: var(--primary-color);
`

export const AuthBannerBody = styled.div`
    width: 100%;
    height: 76%;
    background-image: url(${BgAuthImg.src});
    background-repeat: no-repeat;
    background-size: cover;
`

export const AuthBannerFooter = styled.div`
    width: 100%;
    height: 24%;
    background: var(--secondary-color);
`