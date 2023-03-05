import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import eventsReducer from "./reducers/eventsReducer";
import userReducer from "./reducers/userReducer";
import currentEventReducer from "./reducers/currentEventReducer"
import commentReducer from "./reducers/commentReducer";



const rootReducer = combineReducers({
    events: eventsReducer,
    user: userReducer,
    currentEvent: currentEventReducer,
    comments: commentReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;