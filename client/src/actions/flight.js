import * as types from './types';
import history from '../history';
import { getConfig, getFlytLiveConfig } from '../utils';
import axios from 'axios';

import { sendRequestForFlight } from './users';

const initiateFlightRequest = () => {
    return { type: types.INITIATE_FLIGHT_REQUEST }
};
const initiateFlightFailure = () => {
    return { type: types.INITIATE_FLIGHT_FAILURE }
};
const initiateFlightSuccess = flight => {
    return { type: types.INITIATE_FLIGHT_SUCCESS, payload: flight }
};
export const initiateFlight = ( drone,
                                passengers,
                                options,
                                location,
                                path,
                                droneStatus,
                                friends
) => async dispatch => {
    dispatch(initiateFlightRequest());
    try {
        const res = await axios.post('/api/flights', {
            drone,
            passengers,
            options,
            location,
            path,
            droneStatus
        },getConfig());
        if(options.usageType === "friends") {
            friends.map((friend) => {
                dispatch(sendRequestForFlight(friend._id, location, res.data._id));
            });
        }
        dispatch(initiateFlightSuccess(res.data));
        history.push(`/flights/${res.data._id}`);
    } catch (err) {
        dispatch(initiateFlightFailure())
    }
};

const attendFlightRequest = () => {
    return { type: types.ATTEND_FLIGHT_REQUEST }
};
const attendFlightFailure = () => {
    return { type: types.ATTEND_FLIGHT_FAILURE }
};
const attendFlightSuccess = flight => {
    return { type: types.ATTEND_FLIGHT_SUCCESS, payload: flight }
};
export const attendFlight = (droneId) => async dispatch => {
    dispatch(attendFlightRequest());
    try {
        const res = await axios.post('/api/flights/attend', {
            droneId
        },getConfig());
        history.push(`/flights/${res.data._id}`);
        dispatch(attendFlightSuccess(res.data));
    } catch (err) {
        dispatch(attendFlightFailure())
    }
};

const getFlightRequest = () => {
    return { type: types.GET_FLIGHT_REQUEST }
};
const getFlightFailure = () => {
    return { type: types.GET_FLIGHT_FAILURE }
};
const getFlightSuccess = flight => {
    return { type: types.GET_FLIGHT_SUCCESS, payload: flight }
};
export const getFlight = (id) => async dispatch => {
    dispatch(getFlightRequest());
    try {
        const res = await axios.get(`/api/flights/${id}`,getConfig());
        dispatch(getFlightSuccess(res.data));
    } catch (err) {
        dispatch(getFlightFailure())
    }
};

const setWayPointsRequest = () => {
    return { type: types.SET_WAY_POINTS_REQUEST }
};
const setWayPointsFailure = () => {
    return { type: types.SET_WAY_POINTS_FAILURE }
};
const setWayPointsSuccess = data => {
    return { type: types.SET_WAY_POINTS_SUCCESS, payload: data }
};
export const setWayPoints = (msgdata) => async dispatch => {
    dispatch(setWayPointsRequest());
    try {
        const namespace = localStorage.getItem('namespace');
        const res = await axios.post(`https://dev.flytbase.com/rest/ros/${namespace}/navigation/waypoint_set`,
            {
                waypoints: msgdata
            },{headers: { 'Authorization': 'Token d528e637b79f8cb14fb075ed6acf21835d91bca2', VehicleID: 'UZsRL7nw', 'Content-Type': 'application/json' }});
        dispatch(setWayPointsSuccess(res.data));
    } catch (err) {
        dispatch(setWayPointsFailure())
    }
};

const executeWayPointsRequest = () => {
    return { type: types.EXECUTE_WAY_POINTS_REQUEST }
};
const executeWayPointsFailure = () => {
    return { type: types.EXECUTE_WAY_POINTS_FAILURE }
};
const executeWayPointsSuccess = data => {
    return { type: types.EXECUTE_WAY_POINTS_SUCCESS, payload: data }
};
export const executeWayPoints = () => async dispatch => {
    dispatch(executeWayPointsRequest());
    try {
        const namespace = localStorage.getItem('namespace');
        const res = await axios.get(`https://dev.flytbase.com/rest/ros/${namespace}/navigation/waypoint_execute`,getFlytLiveConfig());
        dispatch(executeWayPointsSuccess(res.data));
    } catch (err) {
        dispatch(executeWayPointsFailure())
    }
};

