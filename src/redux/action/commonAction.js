import { contact } from "../../assets/images"
import { Api } from "../../screens/Api"
import { SET_TOKEN, SET_PROFILE, ADD_CHILD, CREATE_ORDER, CONTACT_THERAPIST } from "../constants"


const setToken = (payload = "") => {
    return async (dispatch) => {
        dispatch({
            type: SET_TOKEN,
            payload
        })
    }
}

const getUserProfile = (token) => {
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

// const addChild = (childInfo) => {
//     return {
//         type: 'ADD_CHILD',
//         payload: childInfo,
//     };
// };

const addChild = (childInfo) => {
    return async (dispatch, getState) => {
        const { token } = getState().authReducer;
        dispatch({
            type: ADD_CHILD,
            payload: childInfo,
        });
        dispatch(getUserProfile(token));
    };
};

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
    setToken, getUserProfile, addChild, createOrder, contactTherapist
}
