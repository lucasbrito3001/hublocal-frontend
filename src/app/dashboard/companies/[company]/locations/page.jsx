"use client"

import DynamicTable from "@/components/dynamicTable";
import { ACTIONS_LOCATIONS_TABLE_ROWS, LOCATIONS_TABLE_COLUMNS, ADD_LOCATION_FORM_FIELDS, ADD_LOCATION_FORM_FIELDS_SCHEMA } from "./contants";
import { GeneralButton } from "@/app/styled";
import { DashboardBackButton, DashboardBodyContent, DashboardButtonWrapper, DashboardTableWrapper } from "../../../styled";
import { LeftArrow } from "@/components/icons";
import GeneralDialog from '@/components/dialog'
import { useDispatch, useSelector } from "react-redux";
import { createLocation, deleteLocation, editLocation, getLocations } from "@/redux/features/locations.fetchActions";
import DynamicForm from "@/components/dynamicForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DialogContentText } from "@mui/material";
import EmptyListView from "@/components/dashboard/emptyListView";
import { getCompany } from "@/redux/features/companies.fetchActions";
import { toggleIsOpenDialog } from "@/redux/features/locations";

export default function Locations() {
    const defaultValue = {
        name: '',
        zipCode: '',
        street: '',
        number: null,
        district: '',
        city: '',
        state: ''
    }

    const params = useParams()

    const [selectedRow, setSelectedRow] = useState({})
    const [currentFormAction, setCurrentFormAction] = useState('')
    const [initialValue, setInitialValue] = useState(defaultValue)
    const [dialogInfos, setDialogInfos] = useState({ title: '', textConfirmButton: '' })

    const locations = useSelector(state => state.locations.list)
    const totalLocations = useSelector(state => state.locations.totalLocations)
    const isOpenDialog = useSelector(state => state.locations.isOpenDialog)

    const dispatch = useDispatch()

    const toggleAddDialog = () => dispatch(toggleIsOpenDialog())

    const onChangePageRowsPerPage = ({ page, rowsPerPage }) => {
        dispatch(getLocations(params.company, page, rowsPerPage))
    }

    const onClickEdit = row => {
        setSelectedRow(row)
        setCurrentFormAction('EDIT')
        setDialogInfos({
            title: `Editar: ${row.name}`,
            textConfirmButton: 'Salvar',
            variant: 'primary'
        })
        setInitialValue({ ...row })
        toggleAddDialog()
    }

    const onClickAdd = () => {
        setCurrentFormAction('CREATE')
        setDialogInfos({
            title: 'Adicionar empresa',
            textConfirmButton: 'Adicionar',
            variant: 'primary'
        })
        setInitialValue(defaultValue)
        toggleAddDialog()
    }

    const onClickDelete = row => {
        setSelectedRow(row)
        setCurrentFormAction('DELETE')
        setDialogInfos({
            title: 'Confirmação de exclusão',
            textConfirmButton: 'Excluir',
            locationToDelete: row.name,
            variant: 'error'
        })
        toggleAddDialog()
    }

    const onClickAction = (action, row) => {
        const functionByActionType = {
            'EDIT': onClickEdit,
            'DELETE': onClickDelete
        }

        functionByActionType[action](row)
    }

    const onSubmit = values => {
        const actionToDispatch = {
            'EDIT': editLocation,
            'CREATE': createLocation,
            'DELETE': deleteLocation
        }

        dispatch(actionToDispatch[currentFormAction]({ ...(currentFormAction === 'DELETE' ? selectedRow : values), companyId: +params.company }))
    }

    useEffect(() => {
        dispatch(getCompany(params.company))
        dispatch(getLocations(params.company, 0, 10))
    }, [])

    return (
        <>
            <title>HubLocal | Dashboard</title>
            <DashboardBodyContent>
                <div>
                    <DashboardBackButton href="/dashboard/companies">
                        <LeftArrow /> Minhas empresas
                    </DashboardBackButton>
                </div>
                {locations.length > 0 && totalLocations
                    ? <>
                        <DashboardButtonWrapper>
                            <GeneralButton
                                variant="contained"
                                color="primary"
                                width="fit-content"
                                text-transform="capitalize"
                                onClick={onClickAdd}
                            >
                                Adicionar Local
                            </GeneralButton>
                        </DashboardButtonWrapper>
                        <DashboardTableWrapper>
                            {locations.length > 0 && totalLocations > 0 &&
                                <DynamicTable
                                    rows={locations}
                                    totalTableRows={totalLocations}
                                    columns={LOCATIONS_TABLE_COLUMNS}
                                    actions={ACTIONS_LOCATIONS_TABLE_ROWS}
                                    onChangePageRowsPerPage={onChangePageRowsPerPage}
                                    onClickAction={onClickAction}
                                />
                            }
                        </DashboardTableWrapper>
                    </>
                    : <EmptyListView 
                        text="Nenhum local cadastrado!" 
                        textButton="Adicionar Local"
                        onClick={onClickAdd}
                    />
                }
            </DashboardBodyContent>
            <GeneralDialog
                isOpen={isOpenDialog}
                title={dialogInfos.title}
                handleClose={toggleAddDialog}
                textConfirmButton={dialogInfos.textConfirmButton}
                variantColor={dialogInfos.variant}
                isForm={currentFormAction !== 'DELETE'}
                formId="general-form"
                onConfirm={onSubmit}
            >
                {currentFormAction !== 'DELETE'
                    ? <DynamicForm
                        fields={ADD_LOCATION_FORM_FIELDS}
                        fieldsSchema={ADD_LOCATION_FORM_FIELDS_SCHEMA}
                        actions={ACTIONS_LOCATIONS_TABLE_ROWS}
                        onSubmit={onSubmit}
                        initialValue={initialValue}
                    ></DynamicForm>
                    : <DialogContentText sx={{ marginBottom: '5vh', color: 'black' }}>
                        O local <b>{dialogInfos.locationToDelete}</b> será excluído.
                        Tem certeza desa ação?
                    </DialogContentText>
                }
            </GeneralDialog>
        </>
    )
}