import axios from "axios";

export default (token = null,user_type = null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  	axios.defaults.headers.common['Auth-User-Type'] =  user_type;
  } else {
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Auth-User-Type'];
  }
};