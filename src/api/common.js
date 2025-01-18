import {api, makeResponseFailed} from "./api"

export const commonAPI = {
    deleteSidebarUniversal: async (body) => {
        try {
            console.log("body:" + body)
            const res = await api.delete(body );
            console.log("Get User Response:", res);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    retakeQuestion: async (id) => {
        try {
            return await api.delete(`common-question/${id}`);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    regenerateQuestion: async (body,id) => {
        try {
            return await api.put(`question-regenerate/${id}`,body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
