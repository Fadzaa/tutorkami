import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;
export const encrypt = ( plainText ) => {
    return CryptoJS.AES.encrypt(plainText, secretKey).toString()
}

export const decrypt = ( cipherText ) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey)
    return bytes.toString(CryptoJS.enc.Utf8);
}