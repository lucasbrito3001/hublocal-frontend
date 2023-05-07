import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from './page'

let signinService
let emailInput
let passwordInput
let buttonSubmit

describe('Testing signin page', () => {
    beforeEach(() => {
        signinService = jest.fn().mockImplementation(values => values)

        const { container } = render(<SignIn signinService={signinService} />)

        emailInput = container.querySelector('input[name="email"]')
        passwordInput = container.querySelector('input[name="password"]')
        buttonSubmit = container.querySelector('button[type="submit"]')
    })

    test('filling the form and firing a click into the submit button', async () => {
        fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } })
        fireEvent.change(passwordInput, { target: { value: 'teste123' } })
        await userEvent.click(buttonSubmit)

        expect(signinService).toHaveBeenCalledWith({ email: 'teste@teste.com', password: 'teste123' })
    })

    test('filling the form fields with invalid value', async () => {
        fireEvent.change(emailInput, { target: { value: 'teste' } })
        fireEvent.change(passwordInput, { target: { value: '' } })

        await userEvent.click(buttonSubmit)

        const fieldsErrors = screen.getAllByTestId('field-error-message')

        expect(signinService).not.toHaveBeenCalled()
        expect(fieldsErrors.length).toBe(2)
        expect(fieldsErrors[0].textContent).toBe('O email deve ser válido')
        expect(fieldsErrors[1].textContent).toBe('A senha é obrigatória')
    })
})