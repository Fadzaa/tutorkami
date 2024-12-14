import { api, makeResponseFailed } from "./api"

export const authAPI = {
    login: async (body) => {
        try {
            const res = await api.post("auth/login", { ...body });
            console.log("Login Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    register: async ({ name, email, password }) => {
        try {
            const res = await api.post("auth/register", { name, email, password });

            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

    getUser: async () => {
        try {
            const res = await api.get("user");
            console.log("Get User Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

    logout: async () => {
        try {
            const res = await api.post("logout");
            console.log("Logout Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
