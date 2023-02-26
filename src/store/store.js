import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import eventsReducer from "./reducers/eventsReducer";



const rootReducer = combineReducers({
    events: eventsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;