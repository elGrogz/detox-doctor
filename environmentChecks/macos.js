import fs from 'fs';
import { homedir } from 'os';

const macOsCheck = () => {
    const javahomeEnvVariable = "export JAVA_HOME=`/usr/libexec/java_home`"
    const androidHomeEnvVariable = "export ANDROID_HOME=$HOME/Library/Android/sdk"

    const shell = process.env.SHELL;
    const homeDirectory = homedir();

    console.log("shell: ", shell)

    if (shell === "/bin/zsh" && (fs.existsSync(`${homeDirectory}/.zshrc`))) {
        console.log("homedir: ", homeDirectory);
        console.log("hello zshrc!");

        const zshrcContents = fs.readFileSync(`${homeDirectory}/.zshrc`, "utf-8");

        if (zshrcContents.includes(javahomeEnvVariable)) {
            console.log("✅ Shell profile contains javahome:", javahomeEnvVariable)
        } else {
            console.log("❌ Shell profile does not contain javahome variable:", javahomeEnvVariable)
        }


        if (zshrcContents.includes(androidHomeEnvVariable)) {
            console.log("✅ Shell profile contains Android Home:", androidHomeEnvVariable)
        } else {
            console.log("❌ Shell profile does not contain Android Home variable:", androidHomeEnvVariable)
        }
    } else {
        console.log("unexpected shell")
    }
}

export default macOsCheck;