import { bold, white } from 'chalk';

const error = bold.redBright;
const warn = bold.yellow;
const success = bold.greenBright;
const info = white;

export const logError = (...args) => console.error(error(args));
export const logWarn = (...args) => console.warn(warn(args));
export const logSuccess = (...args) => console.log(success(args));
export const logInfo = (...args) => console.info(info(args));
