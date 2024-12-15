import axios from "axios";
import { config } from "../config";
import {tokenHandler} from "@/utils/tokenHandler.js";


const apiClient = axios.create({
    baseURL: config.BASE_API_URL,
    headers: {
        "ngrok-skip-browser-warning": "1231",
        "Content-Type": "application/json"
    },
});

// Include the authorization token in headers
apiClient.interceptors.request.use(
    (request) => {
        const token = tokenHandler.get();
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle responses globally
// apiClient.interceptors.response.use(
//     (response) => {
//         console.log("Raw Response Data:", response.data);
//
//         return response.data?.data || response.data;
//     },
//     (error) => {
//         return Promise.reject(error.response?.data || error.message);
//     }
// );

const api = {
    get: (url, options = {}) => apiClient.get(url, options),
    post: (url, body, options = {}) => apiClient.post(url, body, options),
    put: (url, body, options = {}) => apiClient.put(url, body, options),
    delete: (url, options = {}) => apiClient.delete(url, options),
};

const makeResponseFailed = ({ status = "failed", message = "", data = null }) => {
    throw { status, message, data };
};

export { api, makeResponseFailed };
