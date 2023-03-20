const { Router } = require('express');
const { validation, FieldToValidate } = require('../../../middlewares/validation.middleware');
const movieController = require('../../../controllers/movie.controller');
const { bodyForCreateMovies } = require('../../../validations/movie.validation');
const catchAsync = require('../../../utils/catchAsync');

const movieRouter = Router();

movieRouter.post(
  '/',
  validation(bodyForCreateMovies, FieldToValidate.Body),
  catchAsync(movieController.createMovies),
);

movieRouter.get(
  '/',
  catchAsync(movieController.getMovies),
);

module.exports = movieRouter;
