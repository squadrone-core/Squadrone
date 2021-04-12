import * as types from './types';
import history from '../history';
import { getFlytLiveConfig, getConfig } from '../utils';
import axios from 'axios';
import {getFlight} from './flight';

const getNameSpaceRequest = () => {
    return { type: types.GET_NAME_SPACE_REQUEST }
};
const getNameSpaceFailure = () => {
    return { type: types.GET_NAME_SPACE_FAILURE }
};
const getNameSpaceSuccess = namespace => {
    return { type: types.GET_NAME_SPACE_SUCCESS, payload: namespace }
};
export const getNameSpace = (vehicleId) => async dispatch => {
    dispatch(getNameSpaceRequest());
    try {
        const res = await axios.get('https://dev.flytbase.com/rest/ros/get_global_namespace',getFlytLiveConfig(vehicleId));
        localStorage.setItem('namespace', res.data.param_info.param_value);
        dispatch(getNameSpaceSuccess(res.data.param_info.param_value));
    } catch (err) {
        dispatch(getNameSpaceFailure())
    }
};


const velocitySetRequest = () => {
    return { type: types.VELOCITY_SET_REQUEST }
};
const velocitySetFailure = () => {
    return { type: types.VELOCITY_SET_FAILURE }
};
const velocitySetSuccess = namespace => {
    return { type: types.VELOCITY_SET_SUCCESS, payload: namespace }
};
export const velocitySet = (msgdata) => async dispatch => {
    dispatch(velocitySetRequest());
    try {
        const namespace = localStorage.getItem('namespace');
        const res = await axios.post(`https://dev.flytbase.com/rest/ros/${namespace}/navigation/velocity_set`,
           msgdata,{headers: { 'Authorization': 'Token d528e637b79f8cb14fb075ed6acf21835d91bca2', VehicleID: 'UZsRL7nw', 'Content-Type': 'application/json' }});
        dispatch(velocitySetSuccess(res.data));
    } catch (err) {
        dispatch(velocitySetFailure())
    }
};


const positionHoldRequest = () => {
    return { type: types.POSITION_HOLD_REQUEST }
};
const positionHoldFailure = () => {
    return { type: types.POSITION_HOLD_FAILURE }
};
const positionHoldSuccess = data => {
    return { type: types.POSITION_HOLD_SUCCESS, payload: data }
};
export const positionHold = () => async dispatch => {
    dispatch(positionHoldRequest());
    try {
        const namespace = localStorage.getItem('namespace');
        const res = await axios.get(`https://dev.flytbase.com/rest/ros/${namespace}/navigation/position_hold`,getFlytLiveConfig());
        dispatch(positionHoldSuccess(res.data));
    } catch (err) {
        dispatch(positionHoldFailure())
    }
};

const changeControlRequest = () => {
    return { type: types.CHANGE_CONTROL_REQUEST }
};
const changeControlFailure = () => {
    return { type: types.CHANGE_CONTROL_FAILURE }
};
const changeControlSuccess = data => {
    return { type: types.CHANGE_CONTROL_SUCCESS, payload: data }
};
export const changeControl = (id) => async dispatch => {
    dispatch(changeControlRequest());
    try {
        const res = await axios.post(`/api/flights/${id}/change/control`, {},getConfig());
        dispatch(changeControlSuccess(res.data));
        dispatch(passControl(id,false));
    } catch (err) {
        dispatch(changeControlFailure())
    }
};
const passControlRequest = () => {
    return { type: types.PASS_CONTROL_REQUEST }
};
const passControlFailure = () => {
    return { type: types.PASS_CONTROL_FAILURE }
};
const passControlSuccess = data => {
    return { type: types.PASS_CONTROL_SUCCESS, payload: data }
};
export const passControl = (id,passEnabled) => async dispatch => {
    dispatch(passControlRequest());
    try {
        const res = await axios.post(`/api/flights/${id}/pass/control`,{passEnabled},getConfig());
        dispatch(passControlSuccess(res.data));
    } catch (err) {
        dispatch(passControlFailure())
    }
};
