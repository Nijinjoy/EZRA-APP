import { LOADER, tokens } from "../actions/Action";

const initialState = {
    getCourse: [],
    getRelatedCourse: [],
    getCurrentUserDetails: [],
    loading: false,
    storeLanguage: {}
}

const Reducers = (state = initialState, action) => {
    switch (action.type) {

        case LOADER:
            //console.log("action.payload", action.payload);
            return {
                ...state,
                loading: action.payload
            }
        case "LANGUAGE":
            return {
                ...state,
                LANGUAGE: action.LANGUAGE
            }

        case tokens:
            return {
                ...state,
                handleToken: action.handleToken
            }

        case "courseData":
            return {
                ...state,
                courseData: action.courseData
            }

        case "relatedCourse":
            return {
                ...state,
                relatedCourse: action.relatedCourse
            }
        case "currentUser":
            //console.log("action.currentUser", action.currentUser)
            return {
                ...state,
                currentUser: action.currentUser
            }

        default:
            return state;
    }
}
export default Reducers;

