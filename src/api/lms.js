import {api, makeResponseFailed} from "./api"

export const lmsAPI = {
    getLms: async () => {
        try {
            const response = await api.get("lms")
            return response;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    postLms: async (body) => {
        try {
            return await api.post("lms/start", body);
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getLmsDetail: async (id,body) => {
        try {
            const res = await api.post("lms/subTopic/" + id , body);
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    getLmsId: async (id) => {
        try {
            const res = await api.get("lms/" + id );
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    solvedLmsId: async (id) => {
        try {
            const res = await api.get("lms/solved/" + id );
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
    deleteLms: async (id) => {
        try {
            const res = await api.delete("lms/" + id );
            return res.data;
        } catch (error) {
            return makeResponseFailed({
                message: error,
            })
        }
    },
}
