import { printSuccess, printLocation, printFail } from "./logger.js";
import fs from "fs";
import { execSync } from "child_process";

const commonFlipperLocations = ["/Applications/Flipper.app"];

class FlipperChecker {}

export default FlipperChecker;
