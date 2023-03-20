const joi = require('joi');

const paramSchemaForGetUserById = joi.object({
  id: joi.string().uuid().required(),
});

const bodyForCreateUser = joi.object({
  username: joi.string().required(),
  phoneNumber: joi.string().length(9).pattern(/^[0-9]+$/).required(),
});
module.exports = { paramSchemaForGetUserById, bodyForCreateUser };
