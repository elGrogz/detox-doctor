module.exports = (os) => {
    console.log("your OS: ", os)
    switch (os) {
        case "MacOS":
            console.log("hello macos")
            break;
        case "Windows":
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