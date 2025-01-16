import {api, makeResponseFailed} from "./api"

export const questionAPI = {
    getQuestion: async () => {
        try {
            const res = await api.get("question");
            console.log("Get User Response:", res);
            return res;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    postQuestion: async (body) => {
        try {
            const res = await api.post("question", body);
            console.log("Login Response:", res);
            return res;
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
    deleteQuestion: async (type,id) => {
        try {
            const res = await api.delete(`${type.toString().toLowerCase()}/${id}`);
            console.log("Get User Response:", res);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

}
