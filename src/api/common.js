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
            const res = await api.delete(id );
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


}
