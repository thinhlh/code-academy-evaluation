import './Seat.scss';
import { SEAT_STATUS } from '../../../config/constants';
export default function Seat({ seat, onSeatClicked }) {
    return (
        <div >
            <button
                data-testid='seat-btn'
                onClick={() => onSeatClicked(seat)}
                disabled={seat.status === SEAT_STATUS.BOOKED}
                className={seat.status === SEAT_STATUS.CHOSE ? 'seat-chose' : 'seat'}>
                {seat.number}
            </button>
        </div >
    )
}