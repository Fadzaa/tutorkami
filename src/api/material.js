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
            const res = await api.get("material/" + id );
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

}
