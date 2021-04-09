import  * as types from '../actions/types';

const initialState = {
    isFetching: false,
    flight: {},
};

export default function(state = {...initialState}, action) {
    switch (action.type) {
        case types.INITIATE_FLIGHT_REQUEST:
            return { ...state, isFetching: true };
        case types.INITIATE_FLIGHT_SUCCESS:
            return { ...state, flight: action.payload };
        case types.INITIATE_FLIGHT_FAILURE:
            return { ...state, isFetching: false };
        case types.ATTEND_FLIGHT_REQUEST:
            return { ...state, isFetching: true };
        case types.ATTEND_FLIGHT_SUCCESS:
            return { ...state };
        case types.ATTEND_FLIGHT_FAILURE:
            return { ...state, isFetching: false };
        case types.GET_FLIGHT_REQUEST:
            return { ...state, isFetching: true };
        case types.GET_FLIGHT_SUCCESS:
            return { ...state, flight: action.payload };
        case types.GET_FLIGHT_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
}
