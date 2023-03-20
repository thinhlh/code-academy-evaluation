import './Movie.scss'
import BookImage from '../../../assets/book.jpg'
import { useNavigate } from 'react-router-dom'
export default function Movie({ movie }) {
    const unavailable = movie.seats === 0

    const navigate = useNavigate()

    return (
        <div className={unavailable ? "movie-container-disabled" : "movie-container"} >
            <img src={movie.posterUrl} className="movie-image" alt="Movie poster" />
            <div className="movie-metadata">
                <p className='movie-title'>{movie.title}</p>
                <p>{`(${movie.year})`}</p>
                <p>{`${movie.runtime} mins`}</p>
                <div className="movie-seats-book">
                    <p>{unavailable ? 'All Seats Filled' : `${movie.seats} seats left`}</p>
                    <button
                        data-testid='movie-booking-btn'
                        onClick={() => navigate(`/${movie.id}/booking`)}
                        disabled={unavailable}
                        className={unavailable ? "movie-seats-book-button-disabled" : "movie-seats-book-button"}>
                        Book
                    </button>
                </div>
            </div>
        </div >
    )
}