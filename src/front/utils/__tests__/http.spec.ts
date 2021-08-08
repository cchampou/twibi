import { postRequest } from '../http';

(global as any).fetch = jest.fn(() => Promise.resolve('OK'));

const fakeData = { one: 'payload' };

describe('postRequest', () => {
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
    (global.fetch as jest.Mock).mockImplementation(() => {
      throw Error('FATAL');
    });
    try {
      await postRequest('url', fakeData, {});
    } catch (e) {
      expect(e.message).toEqual('FATAL');
    }
  });
});
