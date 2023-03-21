

const SUCCESS = 'SUCCESS';
const PENDING = 'PENDING';
const FAILED = 'SUCCESS';


const initialState = [{
    status: 'success'
}];


const loadStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            return { status: 'success' };
        case PENDING:
            return { status: 'pending' };
        case FAILED:
            return { status: 'failed' };
        default:
            return state;
    }
}

export default loadStatusReducer;