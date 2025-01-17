import {api, makeResponseFailed} from "./api"

export const commonAPI = {
    getSuggestion:  (inputValue, callback) => {
        return api.get(`topic-suggestion?topic=${inputValue}`).then((response) => {
            const options = []
            response.data.forEach((item) => {
                options.push({
                    label: item,
                    value: item
                })
            })
            callback(options);
        })
    },
    deleteQuestion: async (id) => {
        try {
            console.log("id:" + id)
            const res = await api.delete(id );
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
            return await api.delete(`retake/${id}`);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },

    regenerateQuestion: async (body,id) => {
        try {
            return await api.put(`common-question/${id}`,body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
