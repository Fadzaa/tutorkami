import {api, makeResponseFailed} from "./api"

export const storageAPI = {
    getStorageRoadmap: async (body) => {
        try {
            return await api.get("storage/roadmap", {
                params: {...body}
            });
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getStorageMaterial: async (body) => {
        try {
            return await api.get("storage/material", {
                params: {...body}
            });
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getStorageQuestion: async (body) => {
        try {
            return await api.get("storage/question", {
                params: {...body}
            });
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getStorageLms: async (body) => {
        try {
            return await api.get("storage/lms", {
                params: {...body}
            });
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

}
