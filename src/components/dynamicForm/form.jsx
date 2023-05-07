"use client"

// form dependencies
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'

// styled-components
import { GeneralButton } from "@/app/styled"
import { FieldErrorMessage, FieldLabel, FieldWrapper, FieldInput } from "./styled"

export default function DynamicForm({ fields, fieldsSchema, textSubmitButton, onSubmit }) {
    const formSchema = Yup.object().shape(fieldsSchema)
    const formOptions = { resolver: yupResolver(formSchema) }

    const { register, handleSubmit, formState: { errors } } = useForm(formOptions)

    const renderFormField = ({ type, key, label }) => {
        const fieldDictionary = {
            "text": <FieldInput type='text' {...register(key)} />,
            "password": <FieldInput type='password' {...register(key)} />
        }

        return (
            <FieldWrapper key={key}>
                <FieldLabel>{label}</FieldLabel>
                { fieldDictionary[type] }
                <FieldErrorMessage data-testid="field-error-message">{errors[key]?.message}</FieldErrorMessage>
            </FieldWrapper>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            { fields.map(field => renderFormField(field)) }
            { textSubmitButton &&
                <GeneralButton
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    { textSubmitButton }
                </GeneralButton>
            }
        </form>
    )
}
