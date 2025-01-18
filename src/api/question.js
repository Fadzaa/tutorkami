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
            console.log("id:" + id)
            const res = await api.get("question/" + id);
            console.log("Get User Response:", res);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
