import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import eventsReducer from "./reducers/eventsReducer";
import userReducer from "./reducers/userReducer";



const rootReducer = combineReducers({
    events: eventsReducer,
    user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;