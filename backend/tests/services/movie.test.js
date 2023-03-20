const db = require('../../src/config/db');
const { getMovies } = require('../../src/services/movie.service');

jest.mock('../../src/config/db', () => ({
  movie: {
    findMany: jest.fn(),
  },
}));

describe('Get all movies', () => {
  it('Should get all movies in the database', async () => {
    const movies = [{
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      runtime: '92',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
      seats: 40,
    }, {
      id: 2,
      title: 'The Cotton Club',
      year: '1984',
      runtime: '127',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
      seats: 40,
    },
    ];

    db.movie.findMany.mockResolvedValue(movies);
    expect(db.movie.findMany).toHaveBeenCalledTimes(0);

    const result = await getMovies();

    expect(result).toEqual(movies);
    expect(db.movie.findMany).toHaveBeenCalledTimes(1);
  });
});
