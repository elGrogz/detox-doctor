
import macOsCheck from "./environmentChecks/macos.js";
import windowsOsCheck from "./environmentChecks/windows.js";
import linuxOsCheck from "./environmentChecks/linux.js";

const detoxDoctor = (os) => {
    switch (os) {
        case "darwin":
            macOsCheck(); // function to start checking macos for environmental stuff
            break;
        case "win32":
            console.log("hello windows")
            windowsOsCheck(); // function to start checking windows for environmental stuff
            break;
        case "linux":
            console.log("hello Linux")
            linuxOsCheck(); // function to start checking linux for environmental stuff
        break;
        default:
            console.log("Unrecognised OS")
            break;
    }
}

export default detoxDoctor;