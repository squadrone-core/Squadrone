import axios from 'axios';
import * as types from './types';
import history from '../history';

const getTokenRequest = () => {
    return { type: types.GET_DIAL_TOKEN_REQUEST }
};
const getTokenFailure = () => {
    return { type: types.GET_DIAL_TOKEN_FAILURE }
};
export const getTokenSuccess = user => {
    return { type: types.GET_DIAL_TOKEN_SUCCESS, payload: user}
};
export const getToken = (email, password) => async dispatch => {
    dispatch(getTokenRequest());
    try {
        const res = await axios.get('/api/token');
        dispatch(getTokenSuccess(res.data));
    } catch (err) {
        dispatch(getTokenFailure())
    }
};
