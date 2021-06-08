/* eslint-disable no-console */
import * as chalk from 'chalk';

const error = chalk.bold.redBright;
const warn = chalk.bold.yellow;
const info = chalk.white;

export const logError = (...args) => console.error(error(args));
export const logWarn = (...args) => console.warn(warn(args));
export const logInfo = (...args) => console.info(info(args));
