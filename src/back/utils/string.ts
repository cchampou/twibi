export const splitWords: (str: string) => string[] = (str) => str.split(' ');

export const trimStart: (str: string, char: string) => string = (str, char) => {
  if (str[0] !== char) return str;
  const newStr = str.slice(1);
  return trimStart(newStr, char);
};
