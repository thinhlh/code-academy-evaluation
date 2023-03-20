const userService = require('../../src/services/user.service');
const db = require('../../src/config/db');

jest.mock('../../src/config/db', () => ({
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

afterEach(() => {
  db.user.create.mockClear();
});

describe('Get users', () => {
  it('should get users in database and return', async () => {
    // Arrange
    const expectedUsers = [
      {
        id: '123',
        name: 'Jamie',
      },
    ];
    db.user.findMany.mockResolvedValue(expectedUsers);

    expect(db.user.findMany).toHaveBeenCalledTimes(0);

    // Act
    const users = await userService.getUsers();

    // Assert
    expect(db.user.findMany).toHaveBeenCalledTimes(1);
    expect(users).toEqual(expectedUsers);
  });
});

describe('Create users', () => {
  it('Should return created user after create user with valid arguments', async () => {
    const username = 'Jamie';
    const phoneNumber = '123456789';
    const createdUser = {
      id: 1,
      username,
      phoneNumber,
    };
    db.user.create.mockResolvedValue(createdUser);
    expect(db.user.create).toHaveBeenCalledTimes(0);

    const result = await userService.createUser(username, phoneNumber);

    expect(db.user.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(createdUser);
  });

  it('Should throwerror if phone number already existed in the database', async () => {
    const username = 'Jamie';
    const phoneNumber = '123456789';

    const err = new Error('User already exists');

    expect(db.user.create).toHaveBeenCalledTimes(0);
    db.user.create.mockRejectedValue(err);

    await expect(userService.createUser(username, phoneNumber)).rejects.toThrow(err);
    expect(db.user.create).toHaveBeenCalledTimes(1);
  });
});
