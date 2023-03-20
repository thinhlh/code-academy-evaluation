const { Router } = require('express');
const userController = require('../../../controllers/user.controller');
const { validation, FieldToValidate } = require('../../../middlewares/validation.middleware');
const userValidation = require('../../../validations/user.validation');
const catchAsync = require('../../../utils/catchAsync');

const userRouter = Router();

userRouter.get('/', catchAsync(userController.getUsers));
userRouter.get(
  '/:id',
  validation(
    userValidation.paramSchemaForGetUserById,
    FieldToValidate.Params,
  ),
  catchAsync(userController.getUserById),
);
userRouter.post(
  '/',
  validation(userValidation.bodyForCreateUser, FieldToValidate.Body),
  catchAsync(userController.createUser),
);

module.exports = userRouter;
