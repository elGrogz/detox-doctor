import chalk from "chalk";

export const printLocation = (path) => {
  return chalk.white.underline(path);
};
