import chalk from "chalk";

export const printLocation = (path) => {
  return chalk.white.underline(path);
};

export const printSuccess = (message) => {
  console.log(`${printDetoxDoctor()} ✅${chalk.green(message)}`);
};

export const printFail = (message) => {
  console.log(message);
};

export const printWarning = (message) => {
  console.log(message);
};

const printDetoxDoctor = () => {
  return chalk.blueBright("detox-doctor:");
};
