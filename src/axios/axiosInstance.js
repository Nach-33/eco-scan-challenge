import axios from "axios"

export default function getInstance() {
    const defaultOptions = {
        baseURL: import.meta.env.VITE_APP_BACKEND_URI,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    // Create instance
    let instance = axios.create(defaultOptions);
    
    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('auth-token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });
    
    return instance;
}
