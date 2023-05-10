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

    @media(max-width: 992px) {
        height: 100%;
    }
`

export const AuthBannerFooter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 24%;
    background: var(--secondary-color);

    @media(max-width: 992px) {
        display: none !important;
    }
`

export const AuthBannerFooterWrapper = styled.div`
    max-width: 450px;
    color: white;
    text-align: center;
    line-height: 1;

    h1 {
        font-size: 2.25rem;
        font-weight: bold;
    }

    p {
        margin-top: 8px;
        margin-bottom: 0;
        font-size: 1rem;
    }
`