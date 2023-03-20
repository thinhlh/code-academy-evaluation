const userService = require('../services/user.service');
const generateBaseResponse = require('../utils/base-response');

const createUser = async (req, res) => {
  const { username, phoneNumber } = req.body;

  const user = await userService.createUser(username, phoneNumber);

  res.json(user);
};

const getUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.json(generateBaseResponse(users));
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  res.json(generateBaseResponse(user));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
