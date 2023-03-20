const db = require('../config/db');

const createMovies = async (movies) => db.movie.createMany({
  data: movies.map((movie) => ({
    ...movie,
    year: parseInt(movie.year, 10),
    runtime: parseInt(movie.runtime, 10),
    seats: parseInt(process.env.SEATS_PER_MOVIE, 10),
  })),
  skipDuplicates: true,
});

const getMovies = async () => db.movie.findMany({});

module.exports = {
  createMovies,
  getMovies,
};
