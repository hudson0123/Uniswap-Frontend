import axios from "axios";
import { useAuthStore } from "./store";

const base_url = "http://127.0.0.1:8000";
const setAccess = useAuthStore((state) => state.setAccess)

const api = axios.create({
    baseURL: base_url,
});

api.interceptors.request.use(
    (request) => {
        const token = useAuthStore((state) => state.access);
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status == 403 && !originalRequest._return) {
            originalRequest._retry = true

            try {
                const res = await axios.get(`${base_url}/api/token/refresh/`, {
                    data: {
                        "refresh": useAuthStore((state) => state.refresh)
                    }
                })
                if (res) {
                    setAccess(res.data.access)
                }
            } catch (error) {
                console.error('Error fetching data: ', error)
            }

        }

    }
)

export default api