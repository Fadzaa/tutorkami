import { api, makeResponseFailed } from "./api"

export const suggestionAPI = {
    getQuestionSuggestion: async (body) => {
        try {
            const res = await api.post("questionSuggestion",body);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getUniversalSuggestion:  (inputValue, callback) => {
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

}
