export const tokenHandler = {
    get() {
        return localStorage.getItem('token')
    },
    has() {
        return !!localStorage.getItem('token')
    },
    set(token) {
        localStorage.setItem('token', token)

    },
    unset() {
        localStorage.removeItem('token')
    }
}