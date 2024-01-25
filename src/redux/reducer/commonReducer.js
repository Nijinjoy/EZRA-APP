
import { SET_PROFILE, SET_TOKEN } from "../constants";

const initialState = {
    token: "",
    userDetails: {}
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_PROFILE:
            console.log("action.payload==>", action.payload)
            return {
                ...state,
                userDetails: action.payload
            }
        default:
            return state
    }
}

export default commonReducer