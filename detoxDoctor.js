module.exports = (os) => {
    switch (os) {
        case "darwin":
            console.log("hello macos")
            // function to start checking macos for environmental stuff
            require("./environmentChecks/macos")();
            break;
        case "win32":
            console.log("hello windows")
            require("./environmentChecks/windows")(); // function to start checking windows for environmental stuff
            break;
        case "linux":
            console.log("hello Linux")
            require("./environmentChecks/linux")(); // function to start checking linux for environmental stuff
        break;
        default:
            console.log("Unrecognised OS")
            break;
    }
}