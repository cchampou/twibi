import pupa from 'pupa';
import { logError } from './logger';

export const splitWords: (str: string) => string[] = (str) => str.split(' ');

export const trimStart: (str: string, char: string) => string = (str, char) => {
  if (str[0] !== char) return str;
  const newStr = str.slice(1);
  return trimStart(newStr, char);
};

export const insertVariables = (
  text: string,
  variables: { [index: string]: string }
) => {
  try {
    return pupa(text, variables);
  } catch (e) {
    logError(e);
    return text;
  }
};

export const removeBearerFromAuthorization = ({ slice }: string) => slice(7);
