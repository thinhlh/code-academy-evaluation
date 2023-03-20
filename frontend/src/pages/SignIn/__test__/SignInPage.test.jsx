import { render, screen } from "@testing-library/react";
import SignInPage from "../SignInPage";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Sign In Page', () => {

    it('Should show labels and submit button on initial', () => {
        render(<SignInPage />)

        expect(screen.getByText('Username')).toBeTruthy()
        expect(screen.getByText('Phone Number')).toBeTruthy()
        expect(screen.getByText('Create User')).toBeTruthy()
    })

    it('Should disable create user button on initial', () => {
        render(<SignInPage />)

        const button = screen.getByTestId('create-user-btn')
        expect(button).toBeTruthy()
        expect(button).toBeDisabled()
    })


})