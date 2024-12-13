import { api, makeResponseFailed } from "./api"

export const roadmapAPI = {
    getRoadmap: async () => {
        try {
            const res = await api.get("roadmap");
            console.log("Get User Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    postRoadmap: async (body) => {
        try {
            const res = await api.post("roadmap", body);
            console.log("Login Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getRoadmapID: async (id) => {
        try {
            console.log("id:" + id)
            const res = await api.get("roadmap/" + id );
            console.log("Get User Response:", res);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    deleteRoadmap: async (id) => {
        try {
            console.log("id:" + id)
            const res = await api.delete("roadmap/" + id );
            console.log("Get User Response:", res);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

}
