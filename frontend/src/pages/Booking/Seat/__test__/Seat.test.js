import { render, screen } from "@testing-library/react"
import Seat from "../Seat"
import { SEAT_STATUS } from "../../../../config/constants"

describe('Seat', () => {

    it('Should show a seat with number when initial', () => {
        const seat = {
            number: 1,
            status: SEAT_STATUS.AVAILABLE
        }
        render(<Seat seat={seat} />)

        expect(screen.getByText(seat.number)).toBeTruthy()
    })

    it('Should show a seat with number and clickable when status is available', () => {
        const mockSeatClicked = jest.fn()

        const seat = {
            number: 1,
            status: SEAT_STATUS.AVAILABLE
        }
        render(<Seat seat={seat} onSeatClicked={mockSeatClicked} />)

        expect(mockSeatClicked).toHaveBeenCalledTimes(0)

        screen.getByTestId('seat-btn').click()

        expect(mockSeatClicked).toHaveBeenCalledTimes(1)
        expect(mockSeatClicked).toHaveBeenCalledWith(seat)
    })

    it('Should show a seat with number and clickable when status is chose', () => {
        const mockSeatClicked = jest.fn()

        const seat = {
            number: 1,
            status: SEAT_STATUS.AVAILABLE
        }
        render(<Seat seat={seat} onSeatClicked={mockSeatClicked} />)

        expect(mockSeatClicked).toHaveBeenCalledTimes(0)

        screen.getByTestId('seat-btn').click()

        expect(mockSeatClicked).toHaveBeenCalledTimes(1)
        expect(mockSeatClicked).toHaveBeenCalledWith(seat)
    })

    it('Should show a seat with number when and disabled when status is booked', () => {
        const mockSeatClicked = jest.fn()

        const seat = {
            number: 1,
            status: SEAT_STATUS.BOOKED
        }
        render(<Seat seat={seat} onSeatClicked={mockSeatClicked} />)

        expect(mockSeatClicked).toHaveBeenCalledTimes(0)

        screen.getByTestId('seat-btn').click()

        expect(mockSeatClicked).toHaveBeenCalledTimes(0)
    })
})