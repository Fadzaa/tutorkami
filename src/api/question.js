import {api, makeResponseFailed} from "./api"

export const questionAPI = {
    getQuestion: async () => {
        try {
            return await api.get("question");
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    postQuestion: async (body) => {
        try {
            return await api.post("question", body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getQuestionID: async (id) => {
        try {
            const res = await api.get("question/" + id);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    deleteQuestion: async (type,id) => {
        try {
            const res = await api.delete(`${type.toString().toLowerCase()}/${id}`);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

}
