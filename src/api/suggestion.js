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
}
