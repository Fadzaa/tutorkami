import {decrypt, encrypt} from "@/utils/Encription.js";

export const tokenHandler = {
    get() {
        var token = !!localStorage.getItem("token");

        return token ? decrypt(localStorage.getItem('token')) : null ;
    },
    has() {
        return !!localStorage.getItem('token')
    },
    set(token) {
        localStorage.setItem('token', encrypt(token))
    },
    unset() {
        localStorage.removeItem('token')
    }
}