import { api, makeResponseFailed } from "./api"

export const materialAPI = {
    getMaterial: async () => {
        try {
            const res = await api.get("material");
            console.log("Get User Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    postMaterial: async (body) => {
        try {
            const res = await api.post("material", body);
            console.log("Login Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getMaterialID: async (id) => {
        try {
            console.log("id:" + id)
            const res = await api.get("material/" + id );
            console.log("Get User Response:", res);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    updateMaterial: async (body,id) => {
        try {
            const res = await api.put(`material/${id}`, body);
            console.log("Login Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
