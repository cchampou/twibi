import { validateFields } from '../validate';

describe('validateFields', () => {
  test.each([
    [
      {
        username: 'toto',
        email: 'titi',
      },
      ['username', 'email'],
      [],
    ],

    [
      {
        username: 'toto',
      },
      ['username', 'email'],
      ['email'],
    ],

    [
      {
        username: 'toto',
        email: 'titi',
      },
      ['username'],
      [],
    ],
  ])('validateFields(%o, %j)', (body, fields, expected) => {
    expect(validateFields(body, fields)).toEqual(expected);
  });
});
