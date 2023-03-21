const GET_EVENTS = 'GET_EVENTS';


const initialState = [{}];


const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return action.payload;
        default:
            return state;
    }
}

export default eventsReducer;