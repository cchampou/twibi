import { insertVariables } from '../string';

const sampleVariables = { username: 'k_talpa' };

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
