const db = require('../config/db');
const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');

const getBookedSeatsOfMovie = async (movieId) => {
  await db.movie.findUniqueOrThrow({ where: { id: parseInt(movieId, 10) } });

  return db.booking
    .findMany({
      where: {
        movieId: parseInt(movieId, 10),
      },
      select: {
        seat: true,
      },
    })
    .then(
      (ticket) => ticket
        .map((record) => record.seat)
        .sort(),
    );
};
const bookSeat = async (movieId, userId, seats) => {
  const movie = await db
    .movie
    .findUniqueOrThrow({
      where: { id: parseInt(movieId, 10) },
    });

  if (seats.length > movie.seats) {
    throw new ApiError(HttpCode.BAD_REQUEST, 'Not enough seats available');
  } else {
    const bookedSeat = await getBookedSeatsOfMovie(movie.id);

    const duplicatedToBookedSeat = [];
    seats.forEach((seat) => {
      if (bookedSeat.includes(seat)) {
        duplicatedToBookedSeat.push(seat);
      }
    });
    if (duplicatedToBookedSeat.length !== 0) {
      throw new ApiError(HttpCode.BAD_REQUEST, `Seats: ${duplicatedToBookedSeat.join(',')} are already booked`);
    } else {
      const result = await db.booking.createMany({
        data: seats.map((seat) => ({
          userId,
          movieId: parseInt(movieId, 10),
          seat,
        })),
      });

      await db.movie.update({
        where:
        {
          id: parseInt(movieId, 10),
        },
        data:
        {
          seats: movie.seats - result.count,
        },
      });

      return result;
    }
  }
};

// const checkAvail

module.exports = { getBookedSeatsOfMovie, bookSeat };
