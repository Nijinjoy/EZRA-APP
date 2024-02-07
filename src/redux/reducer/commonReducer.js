import { ADD_CHILD, SET_PROFILE, SET_TOKEN, CREATE_ORDER, CONTACT_THERAPIST, UPDATE_CHILD_DETAILS } from "../constants";

const initialState = {
    token: "",
    userDetails: {},
    addChild: {},
    formData: {},
    createOrder: {},
    contactTherapist: {}
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_PROFILE:
            return {
                ...state,
                userDetails: action.payload
            }
        case ADD_CHILD:
            console.log("action.payload===>", action.payload);
            return {
                ...state,
                addChild: action.payload
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
        default:
            return state
    }
}

export default commonReducer