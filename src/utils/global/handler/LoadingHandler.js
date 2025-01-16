import {decrypt, encrypt} from "@/utils/Encription.js";

export const loadingHandler = {
    get() {
        const encryptedLoading = localStorage.getItem("loading");
        if (encryptedLoading) {
            const decryptedLoading = decrypt(encryptedLoading);
            return decryptedLoading === 'true';
        }
        return false;
    },
    has() {
        return !!localStorage.getItem('loading')
    },
    set(loading) {
        localStorage.setItem('loading', encrypt(loading.toString()))
    },
    unset() {
        localStorage.removeItem('loading')
    }
}