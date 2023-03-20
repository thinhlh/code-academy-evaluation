const { Router } = require('express');
const generateBaseResponse = require('../../../utils/base-response');

const commonRouter = Router();

commonRouter.get('/', (_req, res) => {
  res.json(generateBaseResponse('Hello world!'));
});

module.exports = commonRouter;
