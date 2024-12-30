import { api, makeResponseFailed } from "./api"

export const chatbotAPI = {
    postChatbot: async (body,id) => {
        try {
            const res = await api.post("chatbot/" + id,body);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getChatbot: async (type,id) => {
        try {
            const res = await api.get("chatbot/" + type + "/" + id);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
