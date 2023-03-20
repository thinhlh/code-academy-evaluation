const db = require('../../src/config/db');
const bookingService = require('../../src/services/booking.service');

jest.mock('../../src/config/db', () => ({
  movie: {
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
  },
  booking: {
    findMany: jest.fn(),
    createMany: jest.fn(),
  },
  user: {
    findUniqueOrThrow: jest.fn(),
  },
}));

afterEach(() => {
  db.movie.findUniqueOrThrow.mockClear();
  db.movie.update.mockClear();
  db.booking.findMany.mockClear();
  db.booking.createMany.mockClear();
});

describe('Get booked seats', () => {
  it('Should return list of seats already booked of movie', async () => {
    db.booking.findMany.mockResolvedValue([{
      seat: 1,
    }, {
      seat: 2,
    }]);

    expect(db.booking.findMany).toHaveBeenCalledTimes(0);

    const result = await bookingService.getBookedSeatsOfMovie(1);

    expect(db.booking.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual([1, 2]);
  });
});

describe('Booking seats', () => {
  it('Should book seats when seat are available, movie found and user found and return number of booked seats', async () => {
    // Arrange
    const movie = {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      runtime: '92',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
      seats: 49,
    };
    const seats = [50];

    db.movie.findUniqueOrThrow.mockResolvedValue(movie);
    db.booking.createMany.mockResolvedValue({ count: seats.length });

    db.booking.findMany.mockResolvedValue([{
      movie: {},
      user: {},
      id: 1,
      seat: 1,
    }]);

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.user.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);
    // Act

    const result = await bookingService.bookSeat(1, 1, seats);

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(2);
    expect(db.user.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.booking.createMany).toHaveBeenCalledTimes(1);

    expect(result.count).toEqual(seats.length);
    // Assert
  });

  it('Should not allow to book seats if not enough of seat and throw error to controller', async () => {
    // Arrange
    const movie = {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      runtime: '92',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
      seats: 1,
    };
    const seats = [1, 2];

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.user.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);

    db.movie.findUniqueOrThrow.mockResolvedValue(movie);
    db.booking.createMany.mockResolvedValue({ count: seats.length });

    db.booking.findMany.mockResolvedValue([]);

    // Act

    await expect(bookingService.bookSeat(1, 1, seats)).rejects.toThrow();

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(db.user.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);

    // expect(result.count).toEqual(seats.length);
    // Assert
  });

  it('Should not allow to book seats if there is one already booked and throw error to controller', async () => {
    // Arrange
    const movie = {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      runtime: '92',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
      seats: 40,
    };
    const seatsToBook = [1, 2];
    const bookedRecords = [
      {
        id: 1,
        seat: 1,
      },
    ];

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);

    db.movie.findUniqueOrThrow.mockResolvedValue(movie);
    db.booking.createMany.mockResolvedValue({ count: seatsToBook.length });
    db.booking.findMany.mockResolvedValue(bookedRecords);

    // Act

    await expect(bookingService.bookSeat(1, 1, seatsToBook)).rejects.toThrow();

    // Assert

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(2);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);
  });

  it('Should not allow to book seats if movie is not found', async () => {
    // Arrange
    const err = new Error('Movie not found!');
    const seatsToBook = [1, 2];

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);

    db.movie.findUniqueOrThrow.mockRejectedValue(err);

    // Act
    await expect(bookingService.bookSeat(1, 1, seatsToBook)).rejects.toThrow(err);

    // Assert

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);
  });

  it('Should not allow to book seats if user is not found', async () => {
    // Arrange
    const seatsToBook = [1, 2];

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(0);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);

    db.movie.findUniqueOrThrow.mockResolvedValue({
      seats: 3,
    });

    // Act
    await expect(bookingService.bookSeat(1, 1, seatsToBook)).rejects.toThrow();

    // Assert

    expect(db.movie.findUniqueOrThrow).toHaveBeenCalledTimes(2);
    expect(db.booking.createMany).toHaveBeenCalledTimes(0);
  });
});
