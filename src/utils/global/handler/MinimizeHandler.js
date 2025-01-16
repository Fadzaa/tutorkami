import {decrypt, encrypt} from "@/utils/Encription.js";

export const minimizeHandler = {
    get() {
        const encryptedMinimize = localStorage.getItem("minimize");
        if (encryptedMinimize) {
            const decryptedMinimize = decrypt(encryptedMinimize);
            return decryptedMinimize === 'true';
        }
        return false;
    },
    has() {
        return !!localStorage.getItem('minimize')
    },
    set(minimize) {
        localStorage.setItem('minimize', encrypt(minimize.toString()))
    },
    unset() {
        localStorage.removeItem('minimize')
    }
}