module.exports = () => {
    const fs = require('fs');
    const homedir = require('os').homedir();

    console.log("we're in macos now yayyyy");

    const shell = process.env.SHELL;

    console.log("shell: ", shell)

    try {
        (fs.ex)
    } catch (error) {
        
    }

    if (shell === "/bin/zsh" && (fs.existsSync(`${homedir}/.zshrc`))) {
        console.log("homedir: ", homedir)
        console.log("hello zshrc!")
    }
}