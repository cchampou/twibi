import { insertVariables, splitWords, trimStart } from '../string';

const sampleVariables = { username: 'k_talpa' };

describe('splitWords', () => {
  test.each([
    ['toto', ['toto']],
    ['a very interesting phrase', ['a', 'very', 'interesting', 'phrase']],
    ['', ['']],
    [' ', ['', '']],
    [' . ', ['', '.', '']],
  ])('splitWords("%s")', (input, output) => {
    expect(splitWords(input)).toEqual(output);
  });
});

describe('trimStart', () => {
  test.each([
    ['####toto', '#', 'toto'],
    ['####toto', ' ', '####toto'],
    ['## toto', '#', ' toto'],
    ['.###toto', '.', '###toto'],
    [' .####toto', '.', ' .####toto'],
  ])('trimStart("%s", "%s")', (input, char, output) => {
    expect(trimStart(input, char)).toEqual(output);
  });
});

describe('insertVariables', () => {
  it('should return the text as it when no variable slots', () => {
    const sampleTextWithNoVariableSlots = 'Hello world';
    expect(
      insertVariables(sampleTextWithNoVariableSlots, sampleVariables)
    ).toEqual(sampleTextWithNoVariableSlots);
  });

  it('should return text with inserted variables', () => {
    expect(insertVariables('Hello {username} !', sampleVariables)).toEqual(
      'Hello k_talpa !'
    );
  });
});
