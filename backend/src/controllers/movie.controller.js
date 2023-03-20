const movieService = require('../services/movie.service');
const generateBaseResponse = require('../utils/base-response');

const createMovies = async (req, res) => {
  const movies = req.body;

  const result = await movieService.createMovies(movies);

  res.json(generateBaseResponse(`${result.count} movies created`));
};

const getMovies = async (req, res) => {
  const movies = await movieService.getMovies();

  res.json(generateBaseResponse(movies));
};

module.exports = {
  createMovies,
  getMovies,
};
