import { Container, Grid } from "@mui/material";
import styled from "styled-components";

export const EmptyView = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    width: 100%;
    height: 100%;
    text-align: center;

    h1 {
        font-size: 60px;
        max-width: 600px;
    }
`