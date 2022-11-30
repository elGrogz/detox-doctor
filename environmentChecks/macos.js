module.exports = () => {
    const fs = require('fs');
    const homedir = require('os').homedir();

    const javahomeEnvVariable = "export JAVA_HOME=`/usr/libexec/java_home`"
    const androidHomeEnvVariable = "export ANDROID_HOME=$HOME/Library/Android/sdk"

    console.log("we're in macos now yayyyy");

    const shell = process.env.SHELL;

    console.log("shell: ", shell)

    if (shell === "/bin/zsh" && (fs.existsSync(`${homedir}/.zshrc`))) {
        console.log("homedir: ", homedir);
        console.log("hello zshrc!");

        const zshrcContents = fs.readFileSync(`${homedir}/.zshrc`, "utf-8");

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
    }
}