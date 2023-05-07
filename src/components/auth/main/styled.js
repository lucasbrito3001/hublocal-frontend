"use client"

import styled from "styled-components"

export const AuthForm = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, #ECECEC 0%, #FFFFFF 14.58%);
`;

export const AuthFormContainer = styled.div`
    width: 100%;
    max-width: 400px;
`;

export const AuthFormHeader = styled.div`
    img {
        width: 306px;
        height: 107px;
        display: block;
        margin: auto;
    }
`;

export const AuthFormBody = styled.div`
    width: 100%;
    margin-top: 2rem;
`;