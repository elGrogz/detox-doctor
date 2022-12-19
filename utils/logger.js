import chalk from "chalk";

export const printCheckMessage = (message) => {
  console.log(chalk.magentaBright.bold.underline(message));
};

export const printLocation = (path) => {
  return chalk.white.underline(path);
};

export const printSuccess = (message) => {
  console.log(
    `${chalk.bgGray("info")} ${printDetoxDoctor()} ✔ ${chalk.green(message)}`
  );
};

export const printFail = (message) => {
  console.log(
    `${chalk.bgRed("warn")} ${printDetoxDoctor()} ✖ ${chalk.red(message)}`
  );
};

export const printWarning = (message) => {
  console.log(
    `${chalk.bgYellow("warn")} ${printDetoxDoctor()} ⚠️ ${chalk.yellow(
      message
    )}`
  );
};

const printDetoxDoctor = () => {
  return chalk.blue("DetoxDoctor:");
};
