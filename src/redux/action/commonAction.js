import AsyncStorage from "@react-native-async-storage/async-storage"
import { Api } from "../../screens/Api"
import { SET_TOKEN, SET_PROFILE, CREATE_ORDER, CONTACT_THERAPIST, UPDATE_CHILD_DETAILS, GET_USER } from "../constants"

const accessToken = AsyncStorage.getItem("token")

const setToken = (payload = "") => {
    return async (dispatch) => {
        dispatch({
            type: SET_TOKEN,
            payload
        })
        dispatch(getUserProfile(payload));
    }
}

const getUserProfile = (token, type) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${Api}/user/profile`, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    authorization: `Bearer ${token}`
                },
            })
            const responseJSON = await response.json()
            dispatch({
                type: SET_PROFILE,
                payload: responseJSON?.data
            })
        } catch (err) {
            console.log("err=>", err);
        }
    }
}

const getUser = (token, type) => {
    console.log("accessToke=>", accessToken);
    return async (dispatch) => {
        try {
            const response = await fetch(`${Api}/user/getUser`, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    authorization: `Bearer ${token}`
                },
            })
            const responseJSON = await response.json()
            console.log("response===>", responseJSON);
            dispatch({
                type: GET_USER,
                payload: responseJSON?.data
            })
        } catch (err) {
            console.log("err=>", err);
        }
    }
}

const createOrder = (formData) => {
    return {
        type: 'CREATE_ORDER',
        payload: formData
    }
}

const contactTherapist = (contacts) => {
    return {
        type: 'CONTACT_THERAPIST',
        payload: contacts
    }
}

export default {
    setToken, getUserProfile, createOrder, contactTherapist, getUser
}
