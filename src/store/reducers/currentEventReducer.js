
const GET_EVENT = 'GET_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';

const initialState = [{}];

const currentEventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENT:
            return action.payload;
        case UPDATE_EVENT:
            const { title, description } = action.payload;
            console.log(title, description);
            console.log({ ...state, event_title: title, event_description: description })
            return { ...state, event_title: title, event_description: description }
        default:
            return state
    }
}

export default currentEventReducer