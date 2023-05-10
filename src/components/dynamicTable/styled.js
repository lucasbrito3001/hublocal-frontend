import { Paper, TableCell } from "@mui/material";
import styled from "styled-components";

export const TableWrapper = styled(Paper)`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

export const THeadCell = styled(TableCell)`
    font-weight: 600 !important;
    font-size: 18px !important;
`

export const TBodyCell = styled(TableCell)`
    font-weight: 400 !important;
    font-size: 16px !important;
`

export const TBodyActionsCell = styled(TableCell)`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    gap: 12px;
`

export const ActionsList = styled.ul`
    display: flex;
    flex-direction: row;
    gap: 12px;
    list-style: none;
    margin: none;
    padding: none;

    li {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`

export const PaginationWrapper = styled.div`
    border-top: 2px solid var(--light-color);
    width: 100%;
    padding: 8px;
    `

export const PaginationContent = styled.div`
    display: flex;
    width: fit-content;
    flex-direction: row;
    align-items: center;
    border: 1px solid #E4E4E4;
    border-radius: 4px;
    margin-left: auto;

    @media(max-width: 768px) {
        flex-direction: column;
        width: 100%;

        & > div {
            &:first-child {
                border: none !important;
            }
        }

        .paginator {
            flex-direction: column !important;
        }
    }
    
    & > div {
        border: none;
        padding: .25rem 1rem;
        
        &:first-child {
            border-right: 1px solid #E4E4E4;
        }
    }

    .paginator {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`