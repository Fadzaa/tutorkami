import {api, makeResponseFailed} from "./api"

export const regenerateAPI = {

    regenerateMaterial: async (body,id) => {
        try {
            return await api.put(`material-regenerate/${id}`,body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    regenerateRoadmap: async (body,id) => {
        try {
            return await api.put(`roadmap-regenerate/${id}`,body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    }

}
