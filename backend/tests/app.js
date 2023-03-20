const request = require('supertest');
const { app, server } = require('../src');
const movieService = require('../src/services/movie.service');
const bookingService = require('../src/services/booking.service');
const userService = require('../src/services/user.service');
const ApiError = require('../src/utils/api-error');
const HttpCode = require('../src/utils/http-code');

jest.mock('../src/services/movie.service', () => ({
  getMovies: jest.fn(),
}));

jest.mock('../src/services/booking.service', () => ({
  getBookedSeatsOfMovie: jest.fn(),
  bookSeat: jest.fn(),
}));

jest.mock('../src/services/user.service', () => ({
  createUser: jest.fn(),
}));

describe('Get movies list', () => {
  afterAll(() => {
    server.close();
  });

  it('Should return list of movies with status code is 200', async () => {
    const movies = [{
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      runtime: '92',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
    }, {
      id: 2,
      title: 'The Cotton Club',
      year: '1984',
      runtime: '127',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
    }];
    movieService.getMovies.mockResolvedValue(movies);

    const response = await request(app).get('/api/v1/movies/');

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(movies);
  });
});

describe('Get all seats booked for movies', () => {
  it('Should return booked seat for moive with status 200', async () => {
    const seats = [1, 2, 3];

    bookingService.getBookedSeatsOfMovie.mockResolvedValue(seats);

    const response = await request(app).get('/api/v1/booking/1/seats');

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(seats);
  });

  it('Should return not found movie with status 404 if movie is not found', async () => {
    bookingService.getBookedSeatsOfMovie.mockRejectedValue(new ApiError(HttpCode.NOT_FOUND, 'Movie not found'));

    const response = await request(app).get('/api/v1/booking/1/seats');

    expect(response.statusCode).toEqual(404);
  });
});

describe('Book seat for movies', () => {
  it('Should return booked seats for movie with status 200', async () => {
    const seats = [1, 2, 3];

    bookingService.bookSeat.mockResolvedValue(true);

    const response = await request(app).post('/api/v1/booking/').send({
      movieId: 2,
      userId: 1,
      seats,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(`Booked successfully seats: ${seats}`);
  });

  it('Should return not found moive with status 404 if movie is not found', async () => {
    bookingService.getBookedSeatsOfMovie.mockRejectedValue(new ApiError(HttpCode.NOT_FOUND, 'Movie not found'));

    const response = await request(app).get('/api/v1/booking/1/seats');

    expect(response.statusCode).toEqual(404);
  });
});

describe('Create user', () => {
  it('Should return created user with status 200 when creating an user with valid body', async () => {
    const user = {
      username: 'Jamie',
      phoneNumber: '123456789',
    };

    const createdUser = { ...user, id: 1 };

    userService.createUser.mockResolvedValue(createdUser);

    const response = await request(app).post('/api/v1/users/').send(user);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(createdUser);
  });

  it('Should return 400 Bad request if phone number is already exist', async () => {
    const user = {
      username: 'Jamie',
      phoneNumber: '123456789',
    };
    userService.createUser.mockRejectedValue(new ApiError(HttpCode.BAD_REQUEST, 'Phone number already exists'));

    const response = await request(app).post('/api/v1/users').send(user);

    expect(response.statusCode).toEqual(400);
  });
});
