import fs from 'fs';
import chalk from 'chalk';
import { homedir } from 'os';

const macOsCheck = () => {
    const javahomeEnvVariable = "export JAVA_HOME=`/usr/libexec/java_home`"
    const androidHomeEnvVariable = "export ANDROID_HOME=$HOME/Library/Android/sdk"
    const androidEmulatorVariable = "$ANDROID_HOME/emulator"
    const androidSdkManagerVariable = "$ANDROID_HOME/tools/bin/sdkmanager"
    const androidPlatformToolsVariable = "$ANDROID_HOME/platform-tools"
    const androidCommandLineToolsVariable = "$ANDROID_HOME/cmdline-tools/latest/bin"

    const shell = process.env.SHELL;
    const homeDirectory = homedir();

    console.log("shell: ", shell)

    if (shell === "/bin/zsh" && (fs.existsSync(`${homeDirectory}/.zshrc`))) {
        console.log("homedir: ", homeDirectory);
        console.log("hello zshrc!");

        const zshrcContents = fs.readFileSync(`${homeDirectory}/.zshrc`, "utf-8");

        if (zshrcContents.includes(javahomeEnvVariable)) {
            console.log(chalk.green("✅ Shell profile contains javahome:", javahomeEnvVariable));
        } else {
            console.log(chalk.red("❌ Shell profile does not contain javahome variable:", javahomeEnvVariable));
        }


        if (zshrcContents.includes(androidHomeEnvVariable)) {
            console.log(chalk.green("✅ Shell profile contains Android Home:", androidHomeEnvVariable));
        } else {
            console.log(chalk.red("❌ Shell profile does not contain Android Home variable:", androidHomeEnvVariable))
        }

        if (zshrcContents.includes(androidEmulatorVariable)) {
            console.log(chalk.green("✅ Shell profile contains Android Emulator variable:", androidEmulatorVariable));
        } else {
            console.log(chalk.red("❌ Shell profile does not contain Android Emulator variable:", androidSdkManagerVariable))
        }

        if (zshrcContents.includes(androidSdkManagerVariable)) {
            console.log(chalk.green("✅ Shell profile contains Android SDK Manager variable:", androidSdkManagerVariable));
        } else {
            console.log(chalk.red("❌ Shell profile does not contain Android SDK Manager variable:", androidSdkManagerVariable))
        }

        if (zshrcContents.includes(androidPlatformToolsVariable)) {
            console.log(chalk.green("✅ Shell profile contains Android Platform Tools Variable:", androidPlatformToolsVariable));
        } else {
            console.log(chalk.red("❌ Shell profile does not contain Android Platform Tools Variable:", androidPlatformToolsVariable))
        }

        if (zshrcContents.includes(androidCommandLineToolsVariable)) {
            console.log(chalk.green("✅ Shell profile contains Android Command Line Tools Variable:", androidCommandLineToolsVariable));
        } else {
            console.log(chalk.red("❌ Shell profile does not contain Android Command Line Tools Variable:", androidCommandLineToolsVariable))
        }
    } else {
        console.log("unexpected shell")
    }
}

export default macOsCheck;