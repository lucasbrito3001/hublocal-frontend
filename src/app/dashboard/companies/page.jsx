"use client"

import DynamicTable from "@/components/dynamicTable";
import { GeneralButton } from "@/app/styled";
import { DashboardBodyContent, DashboardButtonWrapper, DashboardTableWrapper } from "../styled";
import { useDispatch, useSelector } from "react-redux";
import { createCompany, deleteCompany, editCompany, getCompanies, toggleIsOpenDialog } from "@/redux/features/companies";
import { useEffect, useState } from "react";
import GeneralDialog from "@/components/dialog";
import DynamicForm from "@/components/dynamicForm";
import {
    ACTIONS_COMPANIES_TABLE_ROWS,
    COMPANIES_TABLE_COLUMNS,
    ADD_COMPANY_FORM_FIELDS,
    ADD_COMPANY_FORM_FIELDS_SCHEMA
} from "./constants";
import { useRouter } from "next/navigation";
import { DialogContentText } from "@mui/material";
import EmptyListView from "@/components/dashboard/emptyListView";

export default function Companies() {
    const defaultValue = { name: '', cnpj: '', webiste: '' }

    const router = useRouter()

    const [currentFormAction, setCurrentFormAction] = useState('')
    const [dialogInfos, setDialogInfos] = useState({ title: '', textConfirmButton: '' })
    const [selectedRow, setSelectedRow] = useState({})

    const companies = useSelector(state => state.companies.list)
    const totalCompanies = useSelector(state => state.companies.totalCompanies)
    const isOpenDialog = useSelector(state => state.companies.isOpenDialog)
    const dispatch = useDispatch()

    const toggleAddDialog = () => dispatch(toggleIsOpenDialog())

    const onChangePageRowsPerPage = ({ page, rowsPerPage }) => {
        dispatch(getCompanies(page, rowsPerPage))
    }

    const onClickEdit = row => {
        setCurrentFormAction('EDIT')
        setDialogInfos({ title: `Editar: ${row.name}`, textConfirmButton: 'Salvar' })
        setSelectedRow({ ...row })
        toggleAddDialog()
    }

    const onClickAdd = () => {
        setCurrentFormAction('CREATE')
        setDialogInfos({ title: 'Adicionar empresa', textConfirmButton: 'Adicionar' })
        setSelectedRow(defaultValue)
        toggleAddDialog()
    }

    const onClickSeeLocations = row => {
        router.push(`/dashboard/companies/${row.id}/locations`)
    }

    const onClickDelete = row => {
        setCurrentFormAction('DELETE')
        setDialogInfos({
            title: 'Confirmação de exclusão',
            textConfirmButton: 'Excluir',
            companyToDelete: row.name,
            variant: 'error'
        })
        setSelectedRow(row)
        toggleAddDialog()
    }

    const onClickAction = (action, row) => {
        const functionByActionType = {
            'EDIT': onClickEdit,
            'SEE_LOCATIONS': onClickSeeLocations,
            'DELETE': onClickDelete
        }

        functionByActionType[action](row)
    }

    const onSubmit = values => {
        const actionToDispatch = {
            'EDIT': editCompany,
            'CREATE': createCompany,
            'DELETE': deleteCompany
        }

        dispatch(actionToDispatch[currentFormAction](currentFormAction === 'DELETE' ? selectedRow : values))
        setSelectedRow({})
    }

    useEffect(() => {
        dispatch(getCompanies())
    }, [])

    return (
        <>
            <title>HubLocal | Dashboard</title>
            <DashboardBodyContent>
                {companies.length > 0 && totalCompanies
                    ? <>
                        <DashboardButtonWrapper>
                            <GeneralButton
                                variant="contained"
                                color="primary"
                                width="fit-content"
                                text-transform="capitalize"
                                onClick={onClickAdd}
                            >
                                Adicionar Empresa
                            </GeneralButton>
                        </DashboardButtonWrapper>
                        <DashboardTableWrapper>
                                <DynamicTable
                                    rows={companies}
                                    totalTableRows={totalCompanies}
                                    columns={COMPANIES_TABLE_COLUMNS}
                                    actions={ACTIONS_COMPANIES_TABLE_ROWS}
                                    onChangePageRowsPerPage={onChangePageRowsPerPage}
                                    onClickAction={onClickAction}
                                />
                        </DashboardTableWrapper>
                    </>
                    : <EmptyListView 
                        text="Nenhuma empresa cadastrada!" 
                        textButton="Adicionar Empresa" 
                        onClick={onClickAdd}
                    />
                }
            </DashboardBodyContent>
            <GeneralDialog
                isOpen={isOpenDialog}
                title={dialogInfos.title}
                handleClose={toggleAddDialog}
                textConfirmButton={dialogInfos.textConfirmButton}
                variantColor={dialogInfos.variant || 'primary'}
                isForm={currentFormAction !== 'DELETE'}
                formId="general-form"
                onConfirm={onSubmit}
            >
                {currentFormAction !== 'DELETE'
                    ? <DynamicForm
                        fields={ADD_COMPANY_FORM_FIELDS}
                        fieldsSchema={ADD_COMPANY_FORM_FIELDS_SCHEMA}
                        actions={ACTIONS_COMPANIES_TABLE_ROWS}
                        onSubmit={onSubmit}
                        initialValue={selectedRow}
                    ></DynamicForm>
                    : <DialogContentText sx={{ marginBottom: '5vh', color: 'black' }}>
                        A empresa <b>{selectedRow.name}</b> será excluída.
                        Tem certeza desa ação?
                    </DialogContentText>
                }
            </GeneralDialog>
        </>
    )
}