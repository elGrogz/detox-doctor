import { execSync } from "child_process";
class OperatingSystemTools {
  constructor() {
    this.completedChecks = [];
    this.platform = this.getPlatform();
    this.operatingSystem = this.getOs();
    this.shell = this.getShell();
    this.shellProfileFile = this.getShellProfileFile();
  }

  runCheck(check) {
    const result = check;
    this.completedChecks.push(result);
  }

  getPlatform() {
    return process.platform;
  }

  getOs() {
    const platform = this.getPlatform();

    switch (platform) {
      case "darwin":
        return "MacOS";
      case "win32":
        return "Windows";
      case "linux":
        return "Linux";
      default:
        return "Unknown Operation System";
    }
  }

  getShell() {
    let response = execSync("echo $SHELL").toString().replace("\n", "");
    return response;
  }

  getShellProfileFile() {}
}

export default OperatingSystemTools;
