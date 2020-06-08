export default {
    user: {
        login: credential => axios.post("/api/v1/login",{credential}).then(response => response.data.success),
        logout: () => axios.post("/api/v1/logout").then(response => response.data)
    }

}