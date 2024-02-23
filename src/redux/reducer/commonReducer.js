import { SET_PROFILE, SET_TOKEN, CREATE_ORDER, CONTACT_THERAPIST, GET_USER, PREDICTION_CHILD } from "../constants";

const initialState = {
    token: "",
    userDetails: {},
    // addChild: {},
    formData: {},
    createOrder: {},
    contactTherapist: {},
    getUser: {},
    getPredictionListChild: {}
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_PROFILE:
            // console.log("action.payload===>", action.payload);
            return {
                ...state,
                userDetails: action.payload
            }
        case CREATE_ORDER:
            return {
                ...state,
                createOrder: action.payload,
            }
        case CONTACT_THERAPIST:
            return {
                ...state,
                contactTherapist: action.payload
            }
        case GET_USER:
            // console.log("getUsing====>", action.payload);
            return {
                ...state,
                getUser: action.payload
            }
        case PREDICTION_CHILD:
            console.log(" ...state====>", action.payload);
            return {
                ...state,
                getPredictionListChild: action.payload
            }
        default:
            return state
    }
}

export default commonReducer