import mapKeys from 'lodash/mapKeys';
import  * as types from '../actions/types';

const initialState = {
    user: {},
    isAuthenticated: false,
    isFetching: false,
};

export default function(state = {...initialState}, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return { ...state, isFetching: true };
        case types.LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, isFetching: false, user: action.payload };
        case types.LOGIN_FAILURE:
            return { ...state, isFetching: false };
        case types.SIGN_UP_REQUEST:
            return { ...state, isFetching: true, isAuthenticated: false };
        case types.SIGN_UP_SUCCESS:
            return { ...state, isAuthenticated: true, isFetching: false, user: action.payload.user };
        case types.SIGN_UP_FAILURE:
            return { ...state, isFetching: false };
        case types.LOGOUT_SUCCESS:
            return { ...state, isFetching: false, isAuthenticated: false };
        default:
            return state;
    }
}
