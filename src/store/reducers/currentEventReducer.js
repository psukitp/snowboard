
const GET_EVENT = 'GET_EVENT';

const initialState = [{}];

const currentEventReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_EVENT:
            return action.payload;
        default:
            return state
    }
}

export default currentEventReducer