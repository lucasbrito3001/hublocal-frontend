import { Button, MenuItem } from "@mui/material";
import styled from "styled-components";

export const DashHeader = styled.header`
    position: relative;
    top: 0;
    width: 100%;
    height: var(--dashboard-header-height);
    background: white;
    display: flex;
    justify-content: space-between;
`

export const MyCompanies = styled.div`
    height: 100%;
    width: 30%;
    font-size: 30px;
    line-height: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0 32px;
    gap: 8px;

    @media(max-width: 992px) {
        width: 50%;
    }
`

export const SelectedCompany = styled(MyCompanies)`
    background-color: var(--light-color);
`

export const UserLogged = styled(MyCompanies)`
    background-color: var(--light-color);
    width: 20%;
    padding: 0;
    
    @media(max-width: 992px) {
        width: 50%;
    }
`

export const Dropdown = styled(Button)`
    display: flex !important;
    justify-content: space-between !important;
    width: 100%;
    height: 100%;
    padding: 0 32px !important;
    color: black !important;
    text-transform: none !important;

    div {
        font-weight: 600;
        font-size: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
`

export const DropdownItem = styled(MenuItem)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px !important;
    font-weight: 600 !important;
`