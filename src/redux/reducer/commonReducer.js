import { SET_PROFILE, SET_TOKEN, CREATE_ORDER, CONTACT_THERAPIST, GET_USER, /* ADD_CHILD */ } from "../constants";

const initialState = {
    token: "",
    userDetails: {},
    // addChild: {},
    formData: {},
    createOrder: {},
    contactTherapist: {},
    getUser: {}
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            // console.log("token.payload===>", action.payload);
            return {
                ...state,
                token: action.payload
            }
        case SET_PROFILE:
            console.log("action.payload===>", action.payload);
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
            console.log("getUsing====>", action.payload);
            return {
                ...state,
                getUser: action.payload
            }
        // case ADD_CHILD:
        //     console.log("action.payload===>", action.payload);
        //     return {
        //         ...state,
        //         addChild: action.payload
        //     }
        default:
            return state
    }
}

export default commonReducer