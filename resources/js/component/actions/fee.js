import { SET_FEE_INSTALLMENTS, SET_YEAR, SET_FEE_TYPE
    } from "../types";

import api from "../api"

export const setFeeInstallments = installments => ({
    type: SET_FEE_INSTALLMENTS,
    installments
});

export const setYear = years => ({
    type: SET_YEAR,
    years
});

export const setFeeTypeDispatch = feeType => ({
    type: SET_FEE_TYPE,
    feeType
})


export const setFeeInstallmentsDispatch = () => dispatch => 
    api.admin.fee.get_installments().then(data => {
        dispatch(setFeeInstallments(data.installments));
        return data.installments
    })

export const setYearDispatch = () =>  dispatch =>
    api.admin.get_years().then(data => {
        dispatch(setYear(data.years))
    })

export const setFeeType = () => dispatch =>
    api.admin.fee.get_fee_type().then(data => {
        dispatch(setFeeTypeDispatch(data.fee_types))
    })