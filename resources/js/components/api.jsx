import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/user/login", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/user/register", { user }).then(res => res.data.user),
    }
}