const db = require('../config/db');

const getUsers = async () => db.user.findMany();

const getUserById = async (id) => db.user.findUniqueOrThrow({ where: { id } });

const createUser = async (username, phoneNumber) => db.user.create({
  data: { username, phoneNumber },
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
