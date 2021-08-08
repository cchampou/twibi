import { deleteRequest, getJsonRequest, postRequest } from '../http';

(global as any).fetch = jest.fn(() => Promise.resolve('OK'));

const fakeData = { one: 'payload' };

const fakeHeaders = { auth: 'token' };

describe('postRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetch with the correct params', () => {
    postRequest('url', fakeData, {});
    expect(fetch).toBeCalledWith('url', {
      method: 'POST',
      body: JSON.stringify(fakeData),
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('should return the promise', async () => {
    const res = await postRequest('url', fakeData, {});
    return expect(res).toEqual('OK');
  });

  it('should throw in case of error', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      throw Error('FATAL');
    });
    try {
      await postRequest('url', fakeData, {});
    } catch (e) {
      expect(e.message).toEqual('FATAL');
    }
  });
});

describe('getJsonRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a correct JSON', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: jest.fn(() => Promise.resolve('JSON')),
      })
    );
    const res = await getJsonRequest('url', fakeHeaders);
    expect(res).toEqual('JSON');
  });
});

describe('deleteRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call fetch with the correct args', async () => {
    await deleteRequest('url', fakeHeaders);
    expect(fetch).toBeCalledWith('url', {
      method: 'DELETE',
      headers: fakeHeaders,
    });
  });
});
