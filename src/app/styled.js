import styled from "styled-components";

import { Button } from "@mui/material";

export const GeneralButton = styled(Button)`
    width: 100%;
    font-style: normal;
    font-weight: 700 !important;
    font-size: 20px !important;

    text-align: center;
    text-transform: uppercase;

    color: #FFFFFF;

    a {
        text-decoration: none;
        color: #FFFFFF;
        height: 100% !important;
        width: 100% !important;
        display: block;
    }
`