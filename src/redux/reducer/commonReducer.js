import { ADD_CHILD, SET_PROFILE, SET_TOKEN, CREATE_ORDER } from "../constants";

const initialState = {
    token: "",
    userDetails: {},
    addChild: { name: '', gender: '', dob: '' },
    formData: { name: '', gmail: 'gmail' }
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
            // console.log("action.payload==>", action.payload)
            return {
                ...state,
                userDetails: action.payload
            }
        case ADD_CHILD:
            return {
                ...state,
                addChild: action.payload
            }
        case CREATE_ORDER:
            return {
                ...state,
                createOrder: action.payload,
            }
        default:
            return state
    }
}

export default commonReducer