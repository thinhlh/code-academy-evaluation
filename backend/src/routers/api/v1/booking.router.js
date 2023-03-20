const { Router } = require('express');
const bookingController = require('../../../controllers/booking.controller');
const catchAsync = require('../../../utils/catchAsync');
const { validation, FieldToValidate } = require('../../../middlewares/validation.middleware');
const { paramsForGetBookedSeatOfMovie, bodyForBookSeatsOfMovie } = require('../../../validations/booking.validation');

const bookingRouter = Router();

bookingRouter.post(
  '/',
  validation(bodyForBookSeatsOfMovie, FieldToValidate.Body),
  catchAsync(bookingController.bookSeat),
);

bookingRouter.get(
  '/:movieId/seats/',
  validation(paramsForGetBookedSeatOfMovie, FieldToValidate.Params),
  catchAsync(bookingController.getBookedSeatsOfMovie),
);

module.exports = { bookingRouter };
