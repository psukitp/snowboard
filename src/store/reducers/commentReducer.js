const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';


const initialState = [{}];

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;
        case ADD_COMMENT:
            const newComment = action.payload;
            console.log([{ ...state }, newComment])
            return [ ...state , newComment]
        default:
            return state;
    }
}

export default commentReducer;