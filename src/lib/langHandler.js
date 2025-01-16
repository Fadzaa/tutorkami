import {decrypt, encrypt} from "@/lib/Encription.js";

export const langHandler = {
    get() {
        console.log("decryp lang", decrypt(localStorage.getItem('lang')))
        return decrypt(localStorage.getItem('lang'))
    },
    has() {
        return !!localStorage.getItem('lang')
    },
    set(lang) {
        localStorage.setItem('lang', encrypt(lang))
    },
    unset() {
        localStorage.removeItem('lang')
    }
}