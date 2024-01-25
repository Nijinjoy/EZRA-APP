import { Api } from "../../screens/Api"
import { SET_TOKEN, SET_PROFILE } from "../constants"

export const setToken = (payload = "") => {
    console.log(payload)
    return {
        type: SET_TOKEN,
        payload
    }
}

export const getUserProfile = async (token) => {
    const response = await fetch(`${Api}/user/profile`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            authorization: `Bearer ${token}`
        },
    })
    const responseJSON = await response.json()
    console.log("responseJSON ==>", responseJSON)
    if (responseJSON.status) {
        dispatch({
            type: SET_PROFILE,
            currentUser: data?.data
        })
    }
    /* .then(response => response.json()).then(data => {
        dispatch({
            type: SET_PROFILE,
            currentUser: data?.data
        })
    }).catch((err) => console.log("err", err)) */
    return {}
}


