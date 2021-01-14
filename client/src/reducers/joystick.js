import  * as types from '../actions/types';

const initialState = {
    isFetching: false,
    namespace: null,
    velocityData: null,
    holdPositionResult: null,
    flight: null
};

export default function(state = {...initialState}, action) {
    switch (action.type) {
        case types.GET_NAME_SPACE_REQUEST:
            return { ...state, isFetching: true };
        case types.GET_NAME_SPACE_SUCCESS:
            return { ...state, namespace: action.payload };
        case types.GET_NAME_SPACE_FAILURE:
            return { ...state, isFetching: false };
        case types.VELOCITY_SET_REQUEST:
            return { ...state, isFetching: true };
        case types.VELOCITY_SET_SUCCESS:
            return { ...state, velocityData: action.payload };
        case types.VELOCITY_SET_FAILURE:
            return { ...state, isFetching: false };
        case types.POSITION_HOLD_REQUEST:
            return { ...state, isFetching: true };
        case types.POSITION_HOLD_SUCCESS:
            return { ...state, holdPositionResult: action.payload };
        case types.POSITION_HOLD_FAILURE:
            return { ...state, isFetching: false };
        case types.CHANGE_CONTROL_REQUEST:
            return { ...state, isFetching: true };
        case types.CHANGE_CONTROL_SUCCESS:
            return { ...state, isFetching: false, flight: action.payload };
        case types.CHANGE_CONTROL_FAILURE:
            return { ...state, isFetching: false };
        case types.PASS_CONTROL_REQUEST:
            return { ...state, isFetching: true };
        case types.PASS_CONTROL_SUCCESS:
            return { ...state,  isFetching: false, flight: action.payload};
        case types.PASS_CONTROL_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
}
