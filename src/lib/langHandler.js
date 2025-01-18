import {decrypt, encrypt} from "@/lib/Encription.js";

export const langHandler = {
    get() {
        var lang = !!localStorage.getItem("lang");

        return lang ? decrypt(localStorage.getItem('lang')) : null ;
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