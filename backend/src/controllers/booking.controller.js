const bookingService = require('../services/booking.service');
const generateBaseResponse = require('../utils/base-response');

const getBookedSeatsOfMovie = async (req, res) => {
  const { movieId } = req.params;

  const seats = await bookingService.getBookedSeatsOfMovie(movieId);

  res.json(generateBaseResponse(seats));
};

const bookSeat = async (req, res) => {
  const { movieId, userId, seats } = req.body;

  await bookingService.bookSeat(movieId, userId, seats);

  res.json(generateBaseResponse(`Booked successfully seats: ${seats}`));
};

module.exports = { getBookedSeatsOfMovie, bookSeat };
