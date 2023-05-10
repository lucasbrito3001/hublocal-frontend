"use client"

// form dependencies
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'

// styled-components
import { GeneralButton } from "@/app/styled"
import { FieldErrorMessage, FieldLabel, FieldWrapper, FieldInput } from "./styled"
import InputMask from "react-input-mask"
import { useEffect, useRef } from "react"
import { Grid } from "@mui/material"
import { getAdressByZipCode } from "@/services/zipCodeService"

export default function DynamicForm({
    fields,
    fieldsSchema,
    textSubmitButton,
    onSubmit,
    isLoading,
    initialValue,
    getAddressByZipCode = getAdressByZipCode
}) {
    const formSchema = Yup.object().shape(fieldsSchema)
    const formOptions = {
        resolver: yupResolver(formSchema),
        defaultValues: initialValue
    }

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm(formOptions)
    const zipCode = watch("zipCode")

    useEffect(() => {
        if(zipCode?.length === 9) changeZipCode()
    }, [zipCode])

    const changeZipCode = async () => {
        const address = await getAddressByZipCode(zipCode)
        Object.entries(address).forEach(value => {
            setValue(value[0], value[1])
        })
    }

    const renderFormField = ({ type, key, label, size, disabled }) => {
        const fieldDictionary = {
            "text": <FieldInput type='text' {...register(key)} disabled={disabled} />,
            "password": <FieldInput type='password' {...register(key)}  disabled={disabled} />,
            "number": <FieldInput type='number' {...register(key)}  disabled={disabled} />,
            "cnpj": <FieldInput as={InputMask} defaultValue={initialValue[key] || ''} maskChar={null} mask="99.999.999/9999-99" {...register(key)}  disabled={disabled} />,
            "zipCode": <FieldInput onChange={changeZipCode} as={InputMask} defaultValue={initialValue[key] || ''} maskChar={null} mask="99999-999" {...register(key)}  disabled={disabled} />,
            "state": <FieldInput {...register(key)} maxLength="2" disabled={disabled} />,
        }

        return (
            <Grid item xs={size || 12} key={key}>
                <FieldWrapper>
                    <FieldLabel>{label}</FieldLabel>
                    {fieldDictionary[type]}
                    <FieldErrorMessage data-testid="field-error-message">{errors[key]?.message}</FieldErrorMessage>
                </FieldWrapper>
            </Grid>
        )
    }

    return (
        <form id="general-form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>{fields.map(field => renderFormField(field))}</Grid>
            {textSubmitButton &&
                <GeneralButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                >
                    {textSubmitButton}
                </GeneralButton>
            }
        </form>
    )
}
