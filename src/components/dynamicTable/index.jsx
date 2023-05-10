"use client"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { ActionsList, PaginationWrapper, PaginationContent, TBodyActionsCell, TBodyCell, THeadCell, TableWrapper } from "./styled";
import { DeleteIcon, EditIcon, LeftArrow, OfficeMarker } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setRowsPerPage } from '@/redux/features/dynamicTable';

export default function DynamicTable({
    columns,
    rows,
    totalTableRows,
    actions,
    rowsPerPageOptions = [10, 25, 100],
    onChangePageRowsPerPage,
    onClickAction
}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const page = useSelector(state => state.dynamicTable.page)
    const rowsPerPage = useSelector(state => state.dynamicTable.rowsPerPage)
    const dispatch = useDispatch()

    const isOpenMenuRowsPerPage = !!anchorEl

    const actionsIconsDictionary = {
        'EDIT': <EditIcon onClick={() => onClickAction()}></EditIcon>,
        'SEE_LOCATIONS': <OfficeMarker onClick={() => onClickAction()}></OfficeMarker>,
        'DELETE': <DeleteIcon color="#C90808" onClick={() => onClickAction()}></DeleteIcon>
    }

    const handleOpenMenuRowsPerPage = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenuRowsPerPage = () => {
        setAnchorEl(null)
    }

    const previousPage = () => {
        dispatch(setPage(page - 1))
    }

    const nextPage = () => {
        dispatch(setPage(page + 1))
    }

    const handleChangeRowsPerPage = (value) => {
        dispatch(setRowsPerPage(value))
        handleCloseMenuRowsPerPage()
    }

    useEffect(() => {
        onChangePageRowsPerPage({ page, rowsPerPage })
    }, [page, rowsPerPage])

    return (
        <TableWrapper>
            <TableContainer sx={{ height: '100%', flex: '1 1 0' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead sx={{ flex: '0 1 auto' }}>
                        <TableRow>
                            {columns.map((column, idxColumn) => (
                                <THeadCell
                                    key={idxColumn}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.minWidth || '150px' }}
                                >
                                    {column.label}
                                </THeadCell>
                            ))}
                            {actions && (
                                <THeadCell align='left'>
                                    Ações
                                </THeadCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ flex: '1 1 auto' }}>
                        {rows.map((row, idxRow) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={idxRow}>
                                {columns.map((column, idxColumn) => {
                                    return (
                                        <TBodyCell key={idxColumn} align={column.align || 'left'}>
                                            {row[column.key]}
                                        </TBodyCell>
                                    );
                                })}
                                {actions && (
                                    <TBodyActionsCell align='left'>
                                        <ActionsList>
                                            {actions.map((action, idxAction) => (
                                                <li key={idxAction} onClick={() => onClickAction(action, row)}>
                                                    {actionsIconsDictionary[action]}
                                                </li>
                                            ))}
                                        </ActionsList>
                                    </TBodyActionsCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationWrapper>
                <PaginationContent>
                    <div>
                        <b>Página:</b> {page + 1}
                    </div>
                    <div className='paginator'>
                        <div>
                            <b>Qt por página: </b> <Button
                                sx={{ color: 'black', fontWeight: 400 }}
                                id="rows-per-page-button"
                                aria-controls={isOpenMenuRowsPerPage ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={isOpenMenuRowsPerPage ? 'true' : undefined}
                                onClick={handleOpenMenuRowsPerPage}
                            >
                                {rowsPerPage} <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={isOpenMenuRowsPerPage}
                                onClose={handleCloseMenuRowsPerPage}
                                MenuListProps={{
                                    'aria-labelledby': 'rows-per-page-button',
                                }}
                            >
                                {rowsPerPageOptions.map((option, idxOption) =>
                                    <MenuItem key={idxOption} onClick={() => handleChangeRowsPerPage(option)}>{option}</MenuItem>
                                )}
                            </Menu>
                        </div>
                        <div>
                            <Button
                                size="small"
                                sx={{ textTransform: 'capitalize', borderRadius: '4px 0 0 4px !important' }}
                                variant="contained"
                                disabled={page === 0}
                                onClick={previousPage}
                            >
                                Anterior
                            </Button>
                            <Button
                                size="small"
                                sx={{ textTransform: 'capitalize', borderRadius: '0 4px 4px 0 !important' }}
                                variant="contained"
                                disabled={page + 1 === Math.ceil(totalTableRows / rowsPerPage)}
                                onClick={nextPage}
                            >
                                Próxima
                            </Button>
                        </div>
                    </div>
                </PaginationContent>
            </PaginationWrapper>
        </TableWrapper>
    )
}