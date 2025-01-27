import chalk from "chalk";

export const printCheckMessage = (message) => {
  console.log(chalk.magentaBright.bold.underline(message));
};

export const printLocation = (path) => {
  return chalk.white.underline(path);
};

export const printSuccess = (message) => {
  console.log(
    `${chalk.bgGray("Info")} ${printDetoxDoctor()} ✔ ${chalk.green(message)}`
  );
};

export const printFail = (message) => {
  console.log(
    `${chalk.bgRed("Critical")} ${printDetoxDoctor()} ✖ ${chalk.red(message)}`
  );
};

export const printWarning = (message) => {
  console.log(
    `${chalk.black.bgYellow("Warning")} ${printDetoxDoctor()} ⚠️ ${chalk.yellow(
      message
    )}`
  );
};

export const printChecksComplete = (message) => {
  console.log(chalk.bgBlue("\nChecks complete!\n"));
};

const printDetoxDoctor = () => {
  return chalk.blue("DetoxDoctor:");
};

export const printDetoxAsciiDude = () => {
  return chalk.blue(`
                                                                
                            ,@@@@@@@@@@@@                   
                        @@@@@@@@@@@@@@@@@@@@@.              
                     *@@@@@@@@@@&@@@@@@@@@@@@@@*            
                    ,@@@*********,,,,,,,,,...@@,,           
                    ,@@@*****,,,,,,,,,,......@@@.           
                     @@@@@@@@@@@@%%%&@@@@@@@@@@@#           
                       &@@@@@@@@&@@@@@@@@@@@@@              
          &%                                                
          &&&           @@@@@@&@@@@@@@@@@@@@@@@&&           
     &&&&  &%(       @@@@@@@@@@@@@@@@@@@@@@@@&@@@@@@        
        &&@@@@&&&  @@@@@@@@&&#########&@@@@@&@@@@@@@@*      
     .%%%@@@@@@@@@ @@@@@@@@@###%%%%###&@@@@&@@@@@@@&&%      
      */ .@@@@@@@@@    @@@@@&#%%%%%%#@@@@@@&@@@@&&&%        
           @@@@@@@@     @@@@@&##%%%#@@@@@@@@&@&&.           
              %@#        @@@&@@@##@@@&@@@@@@@*  #@@@(       
                          @@@@@@@@@@@@@@&@@@   @@@@@@@      
                           @@@@@@@@@@@@@@@.   @@@@@@@@      
                            @&@@@@@@@&&@%    .@@@@@@@@@     
                             .@@@@@@@@&     /@@@&%%#&&@     
                                @@@%      &&&@@@%###@@(     
                                         .%,  @@@@@@@*      
                                             &&&&&&.        
                                                           
  `);
};
