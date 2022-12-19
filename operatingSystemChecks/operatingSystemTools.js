class OperatingSystemTools {
  constructor() {
    this.completedChecks = [];
  }

  runCheck(check) {
    const result = check;
    this.completedChecks.push(result);
  }
}

export default OperatingSystemTools;
