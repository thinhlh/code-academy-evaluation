const userController = require('../../src/controllers/user.controller');

const userService = require('../../src/services/user.service');

jest.mock('../../src/services/user.service', () => ({
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
}));

describe('Create user controller', () => {
  const mockJson = jest.fn();
  const mockNext = jest.fn();

  beforeEach(() => {
    userService.getUsers.mockClear();
    userService.createUser.mockClear();
    mockJson.mockClear();
    mockNext.mockClear();
  });

  afterEach(() => {

  });

  it('Should return user after create with a valid body', async () => {
    const user = {
      username: 'Jamie',
      phoneNumber: '123456789',
    };

    const createdUser = { id: 1, username: 'Jamie', phoneNumber: '123456789' };
    userService.createUser.mockResolvedValue(createdUser);

    expect(mockJson).toHaveBeenCalledTimes(0);

    await userController.createUser({ body: user }, { json: mockJson }, mockNext);

    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith(createdUser);
    expect(mockNext).toHaveBeenCalledTimes(0);
  });
});
