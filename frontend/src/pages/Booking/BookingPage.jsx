import './BookingPage.scss'
import Header from '../../components/Header/Header'
import Seat from './Seat/Seat'
import { useEffect, useState } from 'react'
import useAxios from '../../hooks/use-axios'
import { HttpMethod } from '../../utils/http-method'
import { SEAT_STATUS, USER_KEY } from '../../config/constants'
import { useNavigate, useParams } from 'react-router-dom'
export default function BookingPage() {

    const navigate = useNavigate()
    const { movieId } = useParams()

    const { data: getBookedSeatsData, error: getBookedSeatsError, getBookedSeatsLoading, operation } = useAxios()
    const { data: bookSeatsData, error: bookSeatsError, bookSeatsLoading, operation: bookSeatOperation } = useAxios()
    const [bookAvailable, setBookAvailable] = useState(false)
    const [seats, setSeats] = useState(
        Array
            .from(Array(50).keys())
            .map(
                (number) => ({
                    number: number + 1,
                    status: SEAT_STATUS.AVAILABLE
                })))

    useEffect(() => {
        operation(`booking/${movieId}/seats`, HttpMethod.GET)
    }, [])

    useEffect(() => {
        if (getBookedSeatsData) {
            const newSeats = []

            const bookedSeats = getBookedSeatsData.data

            for (let i = 1; i <= 50; i++) {
                newSeats.push({
                    number: i,
                    status: bookedSeats.includes(i) ? SEAT_STATUS.BOOKED : SEAT_STATUS.AVAILABLE
                })
            }
            setSeats(newSeats)
        }

    }, [getBookedSeatsData, getBookedSeatsError, getBookedSeatsLoading])

    const onSeatClicked = (seat) => {
        const newSeats = [...seats]
        newSeats[seat.number - 1] = {
            number: seat.number,
            status: seat.status === SEAT_STATUS.CHOSE ? SEAT_STATUS.AVAILABLE : SEAT_STATUS.CHOSE
        }
        setSeats(newSeats)
        setBookAvailable(newSeats.some(seat => seat.status === SEAT_STATUS.CHOSE))
    }

    const onBookClicked = () => {

        const rawUser = localStorage.getItem(USER_KEY)

        if (!rawUser) {
            navigate('/signin')
        }

        const user = JSON.parse(rawUser)


        bookSeatOperation('/booking', HttpMethod.POST, {
            movieId: parseInt(movieId, 10),
            userId: user.id,
            seats: seats
                .filter((seat) => seat.status === SEAT_STATUS.CHOSE)
                .map((seat) => seat.number)
        })
    }

    useEffect(() => {

        if (bookSeatsData) {
            navigate('/movies')
        }
        if (bookSeatsError) {
            console.log(bookSeatsError)
        }

    }, [bookSeatsData, bookSeatsLoading, bookSeatsError])

    return (
        <div>
            <Header />
            <div className="booking-page-container">
                <div className="booking-page-seats-container">
                    {seats.map((seat) =>
                        <Seat
                            seat={seat}
                            onSeatClicked={onSeatClicked}
                            key={seat.number}
                        />)}
                </div>
                <div className="booking-page-actions">
                    <div className="booking-page-actions-seats">
                        <p>Seats: {
                            seats
                                .filter((seat) => seat.status === SEAT_STATUS.CHOSE)
                                .map((seat) => seat.number)
                                .join(',')}
                        </p>
                        <p>{bookSeatsError ? bookSeatsError : ''}</p>
                    </div>
                    {bookSeatsLoading
                        ? <p>Loading...</p> :
                        <button
                            data-testid="booking-btn"
                            onClick={onBookClicked}
                            disabled={!bookAvailable}>
                            Book
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}   