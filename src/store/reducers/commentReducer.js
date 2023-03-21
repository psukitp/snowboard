const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';


const initialState = [{}];

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            console.log(action.payload)
            return action.payload;
        case ADD_COMMENT:
            const newComment = action.payload;
            return [ ...state , newComment]
        default:
            return state;
    }
}

export default commentReducer;