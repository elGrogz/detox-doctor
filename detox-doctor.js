module.exports = (os) => {
    switch (os) {
        case "darwin":
            console.log("hello macos")
            break;
        case "win32":
            console.log("hello windows")
            break;
        case "Linux":
            console.log("hello Linux")
            break;
        default:
            console.log("Unrecognised OS")
            break;
    }
}