const joi = require('joi');

const paramsForGetBookedSeatOfMovie = joi.object({
  movieId: joi.number().min(1).required(),
});

const bodyForBookSeatsOfMovie = joi.object({
  movieId: joi.number().min(1).required(),
  userId: joi.number().min(1).required(),
  seats: joi
    .array()
    .items(
      joi
        .number()
        .min(1)
        .max(parseInt(process.env.SEATS_PER_MOVIE, 10))
        .required(),
    )
    .unique(),
});
module.exports = { paramsForGetBookedSeatOfMovie, bodyForBookSeatsOfMovie };
