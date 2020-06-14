let api = axios
    
export default {
    user: {
        login: credential => api.post("/api/v1/login",{credential}).then(response => response.data.success),
        logout: () => api.post("/api/v1/logout").then(response => response.data)
    }

}