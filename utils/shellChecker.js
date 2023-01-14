import { printFail } from "../utils/logger.js";
import fs from "fs";

class ShellChecker {
  // TODO: add fish, powershell, others?
  static getShellContents(shellProfileFile) {
    let shellFileContents;

    if (
      shellProfileFile === "/bin/zsh" &&
      fs.existsSync(`${process.env.HOME}/.zshrc`)
    ) {
      shellFileContents = fs.readFileSync(
        `${process.env.HOME}/.zshrc`,
        "utf-8"
      );
    } else if (
      shellProfileFile === "/bin/bash" &&
      fs.existsSync(`${process.env.HOME}/.bashrc`)
    ) {
      shellFileContents = fs.readFileSync(
        `${process.env.HOME}/.bashrc`,
        "utf-8"
      );
    } else {
      printFail("Could not find valid Shell profile file");
    }

    return shellFileContents;
  }
}

export default ShellChecker;
