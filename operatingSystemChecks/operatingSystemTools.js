class OperatingSystemTools {
  constructor() {
    this.completedChecks = [];
    this.shellProfileFile = "";
  }

  runCheck(check) {
    const result = check;
    this.completedChecks.push(result);
  }
}

export default OperatingSystemTools;
