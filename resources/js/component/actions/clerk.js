import { SCHOOL_CLERKS} from "../types";


import api from "../api"

export const setClerks = clerks => ({
  type:SCHOOL_CLERKS,
  clerks
})
export const getClerksDispatch = () => dispatch => {
    api.admin.clerk.getAll().then(data => {
        const {clerk} = data
        dispatch(setClerks(clerk))
    });
}


