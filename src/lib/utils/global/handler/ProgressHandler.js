import {decrypt, encrypt} from "@/lib/Encription.js";

export const progressHandler = {
    get() {
        const encryptedLoading = localStorage.getItem("progress");
        if (encryptedLoading) {
            const decryptedLoading = decrypt(encryptedLoading);
            if (!isNaN(decryptedLoading)) {
                return parseInt(decryptedLoading, 10);
            }
            return 0;
        }
        return 0;
    },
    has() {
        return !!localStorage.getItem('progress')
    },
    set(progress) {
        localStorage.setItem('progress', encrypt(progress.toString()))
    },
    unset() {
        localStorage.removeItem('progress')
    }
}