const joi = require('joi');

const bodyForCreateMovies = joi.array().items(
  joi.object({
    id: joi.number().min(1).required(),
    title: joi.string().required(),
    year: joi.number().min(1).max(new Date().getFullYear()).required(),
    runtime: joi.number().min(0).required(),
    posterUrl: joi.string().required(),
  }),
);

module.exports = {
  bodyForCreateMovies,
};
