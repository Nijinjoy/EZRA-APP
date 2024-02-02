import { ADD_CHILD, SET_PROFILE, SET_TOKEN, CREATE_ORDER, CONTACT_THERAPIST } from "../constants";

const initialState = {
    token: "",
    userDetails: {},
    addChild: {},
    formData: {},
    createOrder: {},
    contactTherapist: {}
}

const commonReducer = (state = initialState, action) => {
    // console.log("token.payload==>", action.payload)
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
            console.log("createOrder.payload===>", action.payload)
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
            // console.log("createOrder.payload===>", action.payload)
            return {
                ...state,
                contactTherapist: action.payload
            }
        default:
            return state
    }
}


export default commonReducer