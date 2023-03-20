const { getBookedSeatsOfMovie, bookSeat } = require('../../src/services/booking.service');
const bookingController = require('../../src/controllers/booking.controller');
const generateBaseResponse = require('../../src/utils/base-response');

jest.mock('../../src/services/booking.service', () => ({
  getBookedSeatsOfMovie: jest.fn(),
  bookSeat: jest.fn(),
}));

describe('Booking seats', () => {
  const mockJson = jest.fn();
  const mockNext = jest.fn();

  beforeEach(() => {
    mockJson.mockClear();
    mockNext.mockClear();
  });

  it('Should book seats when request body is valid and return booked seat in reponse', async () => {
    const body = { movieId: 1, userId: 1, seats: [1, 2, 3] };

    bookSeat.mockResolvedValue({ count: body.seats.length });
    expect(mockJson).toHaveBeenCalledTimes(0);

    await bookingController.bookSeat({ body }, { json: mockJson }, mockNext);

    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith(generateBaseResponse(`Booked successfully seats: ${body.seats}`));
    expect(mockNext).toHaveBeenCalledTimes(0);
  });
});

describe('Booked seats', () => {
  const mockJson = jest.fn();
  const mockNext = jest.fn();

  beforeEach(() => {
    mockJson.mockClear();
    mockNext.mockClear();
  });
  it('Should get booked seats from database by movie id and return to users', async () => {
    const movieId = 1;
    const bookedSeats = [1, 2, 3];
    expect(mockJson).toHaveBeenCalledTimes(0);

    getBookedSeatsOfMovie.mockResolvedValue(bookedSeats);

    await bookingController
      .getBookedSeatsOfMovie(
        { params: { movieId } },
        { json: mockJson },
        mockNext,
      );

    expect(mockNext).toHaveBeenCalledTimes(0);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith(generateBaseResponse(bookedSeats));
  });
});
