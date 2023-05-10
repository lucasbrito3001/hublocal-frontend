import styled from "styled-components";
import { Container } from "@mui/material";
import Link from "next/link";

export const DashboardTableWrapper = styled.div`
    position: relative;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
`

export const DashboardButtonWrapper = styled.div`
    width: 100%;
    text-align: right;
`

export const DashboardBackButton = styled(Link)`   
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 8px;
    text-transform: capitalize;
    text-decoration: none;
    color: var(--medium-color);
`

export const DashboardBody = styled.main`
    padding: 5vh 0 10vh 0;
    height: calc(100vh - var(--dashboard-header-height));
    width: 100%;
    background-color: var(--bg-color);

    @media(max-width: 768px) {
        padding: 5vh 0 5vh 0 !important;
    }
`

export const DashboardBodyContainer = styled(Container)`
    position: relative;
    height: 100% !important;
`

export const DashboardBodyContent = styled.div`
    display: flex;
    flex-flow: column;
    height: 100% !important;
    gap: 24px;
`