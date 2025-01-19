import {api, makeResponseFailed} from "./api"

export const commonAPI = {
    deleteSidebarUniversal: async (body) => {
        try {
            const res = await api.delete(body );
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
