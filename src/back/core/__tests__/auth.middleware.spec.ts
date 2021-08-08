import { verify } from 'jsonwebtoken';
import authMiddleware from '../auth.middleware';
import { removeBearerFromAuthorization } from '../../utils/string';
import User from '../../twitch/models/User';

jest.mock('../../twitch/models/User');

jest.mock('../../utils/string', () => ({
  removeBearerFromAuthorization: jest.fn(() => 'jwt'),
}));

const userQuery = {
  email: 'clement@champouillon.com',
  twitchUsername: 'k_talpa',
};

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(() => userQuery),
}));

const mockedReq: any = {
  get: jest.fn(() => 'header'),
};

const mockedRes: any = {
  send: jest.fn(),
  status: jest.fn(() => mockedRes),
};

// eslint-disable-next-line no-console
console.error = jest.fn();

const mockedNext = jest.fn();

describe('authMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get the jwt from header', () => {
    authMiddleware(mockedReq, mockedRes, mockedNext);
    expect(removeBearerFromAuthorization).toBeCalledWith('header');
  });

  it('should call JWT verify with token and secret', () => {
    authMiddleware(mockedReq, mockedRes, mockedNext);
    expect(verify).toBeCalledWith('jwt', process.env.SECRET);
  });

  it('should query user with jwt data', async () => {
    await authMiddleware(mockedReq, mockedRes, mockedNext);
    expect(User.findOne).toBeCalledWith(userQuery);
  });

  it('should call status and send on error', () => {
    (verify as jest.Mock).mockImplementation(() => {
      throw new Error('JWT');
    });
    authMiddleware(mockedReq, mockedRes, mockedNext);
    expect(mockedRes.status).toBeCalledWith(401);
    expect(mockedRes.send).toBeCalledTimes(1);
  });
});
