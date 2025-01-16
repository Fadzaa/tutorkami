import {decrypt, encrypt} from "@/lib/Encription.js";

export const langHandler = {
    get() {
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