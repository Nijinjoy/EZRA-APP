import { createStore, combineReducers, applyMiddleware } from "redux";
import commonReducer from "./reducer/commonReducer"
import thunkMiddleware from "redux-thunk"
// //mport { i18nState } from 'redux-i18n'
// import { createLogger } from 'redux-logger'
// import { createPromise } from 'redux-promise-middleware'

const rootReducer = combineReducers({
    commonReducer,
    // i18nState
})


// export default store = createStore(rootReducer/* , applyMiddleware(createPromise(), thunk, createLogger()) */);

export default function configureStore() {
    let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
    return store
}