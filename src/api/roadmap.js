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
    updateRoadmap: async (body,id) => {
        try {
            return await api.put("roadmap/" + id, body);
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
    solvedRoadmapID: async (id) => {
        try {
            const res = await api.get("roadmap/solved/" + id );
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
