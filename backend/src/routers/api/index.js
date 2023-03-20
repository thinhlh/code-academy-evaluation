const { Router } = require('express');
const commonRouter = require('./v1/common.router');
const userRouter = require('./v1/user.router');
const movieRouter = require('./v1/movie.router');
const errorHandler = require('../../middlewares/error-handle.middleware');
const { bookingRouter } = require('./v1/booking.router');

const apiRouter = Router();

apiRouter.use('/', commonRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/movies', movieRouter);
apiRouter.use('/booking', bookingRouter);

apiRouter.use(errorHandler);

module.exports = apiRouter;
