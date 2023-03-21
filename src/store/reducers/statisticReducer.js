const GET_EVENTS_STATISTIC = 'GET_EVENTS_STATISTIC';
const GET_COMMENTS_STATISTIC = 'GET_COMMENTS_STATISTIC';


const initialState = {
    events: [],
    comments: []
};

const statisticReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS_STATISTIC:
            return { ...state, events: action.payload };
        case GET_COMMENTS_STATISTIC:
            return { ...state, comments: action.payload };
        default:
            return state;
    }
}

export default statisticReducer;