import {api, makeResponseFailed} from "./api"

export const roadmapAPI = {
    getRoadmap: async () => {
        try {
            return await api.get("roadmap");
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    postRoadmap: async (body) => {
        try {
            return await api.post("roadmap", body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getRoadmapID: async (id) => {
        try {
            const res = await api.get("roadmap/" + id );
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    deleteRoadmap: async (id) => {
        try {
            const res = await api.delete("roadmap/" + id );
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

}
