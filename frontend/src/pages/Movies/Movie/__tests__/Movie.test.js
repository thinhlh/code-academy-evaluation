import { render, screen } from "@testing-library/react";
import Movie from "../Movie";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Movie', () => {
    it('Should show movie detail at initial', () => {
        const movie = {
            id: 8,
            title: "Memento",
            year: 2000,
            runtime: 113,
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BNThiYjM3MzktMDg3Yy00ZWQ3LTk3YWEtN2M0YmNmNWEwYTE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            seats: 50
        }

        render(<Movie movie={movie} />)

        expect(screen.getByText(movie.title)).toBeTruthy()
        expect(screen.getByText(`(${movie.year})`)).toBeTruthy()
        expect(screen.getByText(movie.title)).toBeTruthy()
        expect(screen.getByText(`${movie.seats} seats left`)).toBeTruthy()
    })

    it('Should show movie detail with book button enabled at initial when seats left larger than 0', () => {
        const movie = {
            id: 8,
            title: "Memento",
            year: 2000,
            runtime: 113,
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BNThiYjM3MzktMDg3Yy00ZWQ3LTk3YWEtN2M0YmNmNWEwYTE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            seats: 50
        }

        render(<Movie movie={movie} />)

        const button = screen.getByTestId('movie-booking-btn')

        expect(button).toBeTruthy()
        expect(button).not.toBeDisabled()
    })

    it('Should show movie detail with book button disabled at initial when seats left is 0', () => {
        const movie = {
            id: 8,
            title: "Memento",
            year: 2000,
            runtime: 113,
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BNThiYjM3MzktMDg3Yy00ZWQ3LTk3YWEtN2M0YmNmNWEwYTE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            seats: 0
        }

        render(<Movie movie={movie} />)

        const button = screen.getByTestId('movie-booking-btn')

        expect(button).toBeTruthy()
        expect(button).toBeDisabled()
    })

    it('Should navigate user to movies page when click on enabled book button', () => {
        const movie = {
            id: 8,
            title: "Memento",
            year: 2000,
            runtime: 113,
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BNThiYjM3MzktMDg3Yy00ZWQ3LTk3YWEtN2M0YmNmNWEwYTE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            seats: 50
        }

        render(<Movie movie={movie} />)

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(0)
        const button = screen.getByTestId('movie-booking-btn')

        expect(button).toBeTruthy()
        button.click()
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${movie.id}/booking`)
    })
})