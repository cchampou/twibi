export const trimHash = (str: string): string => str.slice(1);

export const extractUrlParams = (str: string): URLSearchParams =>
  new URLSearchParams(str);
