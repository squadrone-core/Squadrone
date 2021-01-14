import * as types from './types';



const notifyUserRequest = (variant,message) => {
    return { type: types.NOTIFY_USER_REQUEST, payload: {variant,message} }
};
const notifyUserSuccess = (variant,message) => {
    return { type: types.NOTIFY_USER_SUCCESS, payload: {variant,message} }
};
export const notifyUser = (variant,message) => async dispatch => {
    dispatch(notifyUserRequest(variant,message));
    dispatch(notifyUserSuccess(variant,message));
};


