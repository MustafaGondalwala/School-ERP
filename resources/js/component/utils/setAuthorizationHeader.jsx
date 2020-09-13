
export default (token = null,user_type = null,school_id=null,year_id=null) => {
  if (token) { 
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Auth-User-Type'] =  user_type;
    axios.defaults.headers.common['Auth-School-Id'] =  school_id;
    axios.defaults.headers.common['Auth-School-Year'] =  year_id;
  } else {
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Auth-User-Type'];
    delete axios.defaults.headers.common['Auth-School-Id'];
    delete axios.defaults.headers.common['Auth-School-Year'];
  }
};