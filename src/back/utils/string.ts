import pupa from 'pupa';

export const splitWords: (str: string) => string[] = (str) => str.split(' ');

export const trimStart: (str: string, char: string) => string = (str, char) => {
  if (str[0] !== char) return str;
  const newStr = str.slice(1);
  return trimStart(newStr, char);
};

export const insertVariables = (
  text: string,
  variables: { [index: string]: string }
) => pupa(text, variables);

export const removeBearerFromAuthorization = (str) => str.slice(7);
