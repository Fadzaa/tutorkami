import { api, makeResponseFailed } from "./api"

export const storageAPI = {
    getStorageRoadmap: async (body) => {
        try {
            const res = await api.get("storage/roadmap",{
                params:{...body}
            });
            console.log("Get User Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getStorageMaterial: async (body) => {
        try {
            const res = await api.get("storage/material",{
                params:{...body}
            });
            console.log("Get User Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getStorageQuestion: async (body) => {
        try {
            const res = await api.get("storage/question",{
                params:{...body}
            });
            console.log("Get User Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

}
