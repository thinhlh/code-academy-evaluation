import { render, screen } from "@testing-library/react"
import BookingPage from "../BookingPage"

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe('Booking page', () => {

    it('Should show book button when initial', () => {
        render(<BookingPage />)
        expect(screen.getByText('Book')).toBeTruthy()

    })

    it('Should show book disabled button when initial', () => {
        render(<BookingPage />)

        const button = screen.getByTestId('booking-btn')

        expect(button).toBeDisabled()
    })

    it('Should show seats with empty when initial', () => {
        render(<BookingPage />)

        expect(screen.getByText('Seats:')).toBeTruthy()
    })
})