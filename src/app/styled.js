import styled from "styled-components";

import { Button } from "@mui/material";

export const GeneralButton = styled(Button)`
    width: ${props => props.width || '100%'};
    font-style: normal;
    font-weight: 700 !important;
    font-size: 20px !important;

    text-align: center;
    text-transform: ${props => props['text-transform'] || 'uppercase'} !important;

    color: #FFFFFF;

    a {
        text-decoration: none;
        color: #FFFFFF;
        height: 100% !important;
        width: 100% !important;
        display: block;
    }
`

export const NotFoundPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 32px;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(var(--primary-color-opacity), var(--secondary-color-opacity));
    color: white;
    
    h1 {
        margin-top: 24px;
        font-size: 32px;
        max-width: 400px;
    }
`