import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import eventsReducer from "./reducers/eventsReducer";
import userReducer from "./reducers/userReducer";
import currentEventReducer from "./reducers/currentEventReducer"
import commentReducer from "./reducers/commentReducer";
import resaleReducer from "./reducers/resaleReducer";
import productTypesReducer from "./reducers/productTypesReducer";
import loadStatusReducer from "./reducers/loadStatusReducer";
import currentResaleAdReducer from "./reducers/currentResaleAdReducer";



const rootReducer = combineReducers({
    events: eventsReducer,
    user: userReducer,
    currentEvent: currentEventReducer,
    comments: commentReducer,
    resales: resaleReducer,
    productTypes: productTypesReducer,
    loadStatus: loadStatusReducer,
    currentResale: currentResaleAdReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;