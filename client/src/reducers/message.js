import mapKeys from 'lodash/mapKeys';
import  * as types from '../actions/types';

const initialState = {
    message: "",
    variant: ""
};

export default function(state = {...initialState}, action) {
    switch (action.type) {
        case types.LOGIN_FAILURE:
            return { ...state, message: action.payload, variant: "error" };
        case types.LOGIN_SUCCESS:
            return { ...state, message: "", variant: "" };
        case types.LOGIN_REQUEST:
            return { ...state, message: "", variant: "" };
        case types.NOTIFY_USER_REQUEST:
            return { ...state, message: "", variant: "" };
        case types.NOTIFY_USER_SUCCESS:
            return { ...state, message: action.payload.message, variant: action.payload.variant };
        case types.SIGN_UP_SUCCESS:
            return { ...state,  message: "You have been registered successfully!", variant: "success" };
        case types.SIGN_UP_FAILURE:
            return { ...state, message: action.payload, variant: "error" };
        case types.SIGN_UP_REQUEST:
            return { ...state, message: "", variant: "" };
        case types.LOGOUT_SUCCESS:
            return { ...state, message: "Logout successful!", variant: "success"  };
        default:
            return state;
    }
}
