import axios from "axios";
import { useAuthStore, useNotifyStore } from "./store";
import { GetRefreshResponse } from "@/@types/api/response/auth";

const base_url = "http://127.0.0.1:8000";

/**
 * Create axios instance.
 */
const api = axios.create({
    baseURL: base_url,
});

/**
 * Adds access token to request header if present in auth store.
 */
api.interceptors.request.use(
    (request) => {
        const token = useAuthStore.getState().access
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * If error in the response with 401 code we attempt to refresh the token.
 */
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status == 401 && !originalRequest._return) {
            originalRequest._retry = true

            try {
                const res = await axios.post<GetRefreshResponse>(`${base_url}/api/token/refresh/`, {
                    data: {
                        "refresh": useAuthStore.getState().refresh
                    }
                }).catch((e) => {
                    useNotifyStore.getState().setNotification("error", "Error logging in.")
                })
                if (res) {
                    useAuthStore.getState().setAccess(res.data.access)
                }
            } catch (error) {
                console.error('Error fetching data: ', error)
            }

        }

    }
)

export default api