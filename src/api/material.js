import {api, makeResponseFailed} from "./api"

export const materialAPI = {
    getMaterial: async () => {
        try {
            return await api.get("material");
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    postMaterial: async (body) => {
        try {
            return await api.post("material", body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getMaterialID: async (id) => {
        try {
            return await api.get("material/" + id);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    updateMaterial: async (body,id) => {
        try {
            return await api.put(`material/${id}`, body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
