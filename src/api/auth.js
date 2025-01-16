import {api, makeResponseFailed} from "./api"

export const authAPI = {
    login: async (body) => {
        try {
            return await api.post("auth/login", {...body});
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    register: async ({ name, email, password }) => {
        try {
            return await api.post("auth/register", {name, email, password});
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

    getUser: async () => {
        try {
            return await api.get("user");
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

    logout: async () => {
        try {
            return await api.post("logout");
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
