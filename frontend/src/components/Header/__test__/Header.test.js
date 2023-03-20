import Header from "../Header";
import { render, screen } from '@testing-library/react'
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Header', () => {
    it('Should show app title when initial', () => {
        render(<Header />)

        expect(screen.getByText('Book My Movie')).toBeTruthy()
    })

    it('Should navigate to sign in page when clicked on app title', () => {
        render(<Header />)

        const text = screen.getByText('Book My Movie')

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(0)

        text.click()

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/signin')
    })

})