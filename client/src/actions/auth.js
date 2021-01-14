import axios from 'axios';
import * as types from './types';
import history from '../history';
import {notifyUser} from './message';

const loginRequest = () => {
   return { type: types.LOGIN_REQUEST }
};
const loginFailure = (err) => {
   return { type: types.LOGIN_FAILURE, payload: err }
};
export const loginSuccess = user => {
   return { type: types.LOGIN_SUCCESS, payload: user}
};
export const login = (email, password) => async dispatch => {
    dispatch(loginRequest());
    try {
        const res = await axios.post('/auth/login', {
            password,
            email
        });
        history.push('/');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user._id);
        dispatch(loginSuccess(res.data));
    } catch (err) {

        // notifyUser("error",err.message);
        dispatch(loginFailure(err.message))
    }
};
const signupRequest = () => {
    return { type: types.SIGN_UP_REQUEST }
};
const signupFailure = (err) => {
    return { type: types.SIGN_UP_FAILURE, payload: err }
};
const signupSuccess = user => {
    return { type: types.SIGN_UP_SUCCESS, payload: user }
};
export const signup = (email, password, country, age, role) => async dispatch => {
    dispatch(signupRequest());
    try {
            const res = await axios.post('/auth/signup', {
                password,
                email,
                country,
                age,
                role
            });
            history.push('/');
            dispatch(signupSuccess(res.data.user));

    } catch (err) {
        let errMsg = err.message;
        if(err.message.includes('500')) {
            errMsg = "duplicate email!";
        }
        if(err.statusCode === 400) {
            errMsg = "email and pass required";
        }
        dispatch(signupFailure(errMsg))
    }
};

export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS,
        payload: {},
    };
}
export const logout = () => async dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(logoutSuccess())
};
