import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUp from './page'

let signupService
let nameInput
let emailInput
let passwordInput
let confirmPasswordInput
let buttonSubmit

describe('Testing signup page', () => {
    beforeEach(() => {
        signupService = jest.fn().mockImplementation(values => values)

        const { container } = render(<SignUp signupService={signupService} />)

        nameInput = container.querySelector('input[name="name"]')
        emailInput = container.querySelector('input[name="email"]')
        passwordInput = container.querySelector('input[name="password"]')
        confirmPasswordInput = container.querySelector('input[name="confirmPassword"]')
        buttonSubmit = container.querySelector('button[type="submit"]')
    })

    test('filling the form and firing a click into the submit button', async () => {
        const formValues = {
            name: 'teste',
            email: 'teste@teste.com',
            password: 'teste123',
            confirmPassword: 'teste123'
        }

        fireEvent.change(nameInput, { target: { value: formValues.name } })
        fireEvent.change(emailInput, { target: { value: formValues.email } })
        fireEvent.change(passwordInput, { target: { value: formValues.password } })
        fireEvent.change(confirmPasswordInput, { target: { value: formValues.confirmPassword } })

        await userEvent.click(buttonSubmit)

        expect(signupService).toHaveBeenCalledWith(formValues)
    })

    test('filling the form fields with invalid value', async () => {
        await userEvent.click(buttonSubmit)

        const fieldsErrors = screen.getAllByTestId('field-error-message')

        expect(signupService).not.toHaveBeenCalled()
        expect(fieldsErrors.length).toBe(4)
        expect(fieldsErrors[0].textContent).toBe('O nome é obrigatório')
        expect(fieldsErrors[1].textContent).toBe('O email é obrigatório')
        expect(fieldsErrors[2].textContent).toBe('A senha é obrigatória')
        expect(fieldsErrors[3].textContent).toBe('A senha é obrigatória')
    })
})