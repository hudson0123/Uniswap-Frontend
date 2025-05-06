import axios from "axios";

const base_url = "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: base_url,
});

api.interceptors.request.use(
    (config) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NjQ1ODYyLCJpYXQiOjE3NDY1NTk0NjIsImp0aSI6IjdhNjI4NWE2YWYxOTQ4YjZhMzRiYjhhM2FiNDg3MDZmIiwidXNlcl9pZCI6Mn0.XcbYqu6H_z2KndwhnEJAu6fThXfAeLFQ76mL3vGp3cI"
        if ( token ) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error)
    }
);

export default api