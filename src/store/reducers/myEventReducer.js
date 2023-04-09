
const GET_MY_EVENTS = 'GET_MY_EVENTS';

const initialState = [{}];

const myEventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_EVENTS:
            return action.payload;
        default:
            return state
    }
}

export default myEventReducer