const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');

const FieldToValidate = {
  Body: Symbol('body'),
  Params: Symbol('params'),
  Query: Symbol('query'),
};

const validation = (
  joiSchema,
  fieldToBeValidated = FieldToValidate.Body,
) => async (req, res, next) => {
  try {
    if (fieldToBeValidated !== FieldToValidate.Body
          && fieldToBeValidated !== FieldToValidate.Params
           && fieldToBeValidated !== FieldToValidate.Query) {
      next(new ApiError(HttpCode.INTERNAL_ERROR, 'Field to be validated should either be body, params or query'));
      return;
    }

    const validated = await joiSchema.validateAsync(
      req[fieldToBeValidated.description],
      { convert: true },
    );

    req[fieldToBeValidated] = validated;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { FieldToValidate, validation };
