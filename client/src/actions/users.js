import * as types from './types';
import history from '../history';
import { getConfig } from '../utils';
import axios from 'axios';
import {notifyUser} from './message';


const searchFriendsRequest = () => {
    return { type: types.SEARCH_FRIENDS_REQUEST }
};
const searchFriendsFailure = () => {
    return { type: types.SEARCH_FRIENDS_FAILURE }
};
const searchFriendsSuccess = friends => {
    return { type: types.SEARCH_FRIENDS_SUCCESS, payload: friends }
};
export const searchFriends = (query) => async dispatch => {
    dispatch(searchFriendsRequest());
    try {
        const res = await axios.post('/api/users/friends', {
            query
        },getConfig());
        dispatch(searchFriendsSuccess(res.data));
    } catch (err) {
        dispatch(searchFriendsFailure())
    }
};

const searchUsersRequest = () => {
    return { type: types.SEARCH_USERS_REQUEST }
};
const searchUsersFailure = () => {
    return { type: types.SEARCH_USERS_FAILURE }
};
const searchUsersSuccess = users => {
    return { type: types.SEARCH_USERS_SUCCESS, payload: users }
};
export const searchUsers = (query) => async dispatch => {
    dispatch(searchUsersRequest());
    try {
        const res = await axios.post('/api/users/search', {
            query
        },getConfig());
        dispatch(searchUsersSuccess(res.data));
    } catch (err) {
        dispatch(searchUsersFailure())
    }
};

const sendRequestForFlightRequest = () => {
    return { type: types.FRIEND_FLIGHT_REQUEST }
};
const sendRequestForFlightFailure = () => {
    return { type: types.FRIEND_FLIGHT_FAILURE }
};
const sendRequestForFlightSuccess = request => {
    return { type: types.FRIEND_FLIGHT_SUCCESS, payload: request }
};
export const sendRequestForFlight = (to,forId, flightId) => async dispatch => {
    dispatch(sendRequestForFlightRequest());
    try {
        const res = await axios.post('/api/requests', {
            to,
            forId,
            flightId,
            type: 'flight'
        },getConfig());
        dispatch(sendRequestForFlightSuccess(res.data));
    } catch (err) {
        dispatch(sendRequestForFlightFailure())
    }
};

const sendRequestForFriendShipRequest = () => {
    return { type: types.FRIEND_FRIEND_REQUEST }
};
const sendRequestForFriendShipFailure = () => {
    return { type: types.FRIEND_FRIEND_FAILURE }
};
const sendRequestForFriendShipSuccess = request => {
    return { type: types.FRIEND_FRIEND_SUCCESS, payload: request }
};
export const sendRequestForFriendShip = (to) => async dispatch => {
    dispatch(sendRequestForFriendShipRequest());
    try {
        const res = await axios.post('/api/requests', {
          to,
          type: 'friend'
        },getConfig());
        dispatch(sendRequestForFriendShipSuccess(res.data));
    } catch (err) {
        dispatch(sendRequestForFriendShipFailure())
    }
};

const sendRequestForWorkRequest = () => {
    return { type: types.FRIEND_WORK_REQUEST }
};
const sendRequestForWorkFailure = () => {
    return { type: types.FRIEND_WORK_FAILURE }
};
const sendRequestForWorkSuccess = request => {
    return { type: types.FRIEND_WORK_SUCCESS, payload: request }
};
export const sendRequestForWork = (to,forId) => async dispatch => {
    dispatch(sendRequestForWorkRequest());
    try {
        const res = await axios.post('/api/requests', {
          to,
          forId,
          type: 'work'
        },getConfig());
        dispatch(sendRequestForWorkSuccess(res.data));
        notifyUser("success","request has been sent!")
    } catch (err) {
        dispatch(sendRequestForWorkFailure())
    }
};

const getRecentFlightsRequest = () => {
    return { type: types.USER_RECENT_FLIGHTS_REQUEST}
};
const getRecentFlightsFailure = () => {
    return { type: types.USER_RECENT_FLIGHTS_FAILURE }
};
const getRecentFlightsSuccess = flights => {
    return { type: types.USER_RECENT_FLIGHTS_SUCCESS, payload: flights }
};
export const getRecentFlights = (to) => async dispatch => {
    dispatch(getRecentFlightsRequest());
    try {
        const res = await axios.get('/api/users/recentFlights',getConfig());
        dispatch(getRecentFlightsSuccess(res.data));
    } catch (err) {
        dispatch(getRecentFlightsFailure())
    }
};

const getRecentWorkReqsRequest = () => {
    return { type: types.USER_RECENT_WORK_REQS_REQUEST}
};
const getRecentWorkReqsFailure = () => {
    return { type: types.USER_RECENT_WORK_REQS_FAILURE }
};
const getRecentWorkReqsSuccess = requests => {
    return { type: types.USER_RECENT_WORK_REQS_SUCCESS, payload: requests }
};
export const getRecentWorkReqs = (limit) => async dispatch => {
    dispatch(getRecentWorkReqsRequest());
    try {
        const res = await axios.get(`/api/users/recentWorkRequests/${limit}`, getConfig());
        dispatch(getRecentWorkReqsSuccess(res.data));
    } catch (err) {
        dispatch(getRecentWorkReqsFailure())
    }
};

const getFriendsRequest = () => {
    return { type: types.USER_FRIENDS_REQUEST}
};
const getFriendsFailure = () => {
    return { type: types.USER_FRIENDS_FAILURE }
};
const getFriendsSuccess = friends => {
    return { type: types.USER_FRIENDS_SUCCESS, payload: friends }
};
export const getFriends = () => async dispatch => {
    dispatch(getFriendsRequest());
    try {
        const res = await axios.get('/api/users/friends', getConfig());
        dispatch(getFriendsSuccess(res.data.friends));
    } catch (err) {
        dispatch(getFriendsFailure())
    }
};

const updateWorkRequestRequest = () => {
    return { type: types.UPDATE_WORK_REQUEST_REQUEST}
};
const updateWorkRequestFailure = () => {
    return { type: types.UPDATE_WORK_REQUEST_FAILURE }
};
const updateWorkRequestSuccess = request => {
    return { type: types.UPDATE_WORK_REQUEST_SUCCESS, payload: request }
};
export const updateWorkRequest = (id,status) => async dispatch => {
    dispatch(updateWorkRequestRequest());
    try {
        const res = await axios.post(`/api/requests/${id}/status`, {
            status
        } , getConfig());
        dispatch(updateWorkRequestSuccess(res.data));
        if(res.type === "work") {
            dispatch(getRecentWorkReqs(5));
        } else {
            dispatch(getRequests());
        }
    } catch (err) {
        dispatch(updateWorkRequestFailure())
    }
};

const toggleDrawerRequest = () => {
    return { type: types.TOGGLE_DRAWER_REQUEST}
};
export const toggleDrawer = () => async dispatch => {
    dispatch(toggleDrawerRequest());
};

const getFavoriteCitiesRequest = () => {
    return { type: types.USER_FAV_CITIES_REQUEST}
};
const getFavoriteCitiesFailure = () => {
    return { type: types.USER_FAV_CITIES_FAILURE }
};
const getFavoriteCitiesSuccess = cities => {
    return { type: types.USER_FAV_CITIES_SUCCESS, payload: cities }
};
export const getFavoriteCities = () => async dispatch => {
    dispatch(getFavoriteCitiesRequest());
    try {
        const res = await axios.get('/api/users/favoriteCities', getConfig());
        dispatch(getFavoriteCitiesSuccess(res.data.favoriteCities));
    } catch (err) {
        dispatch(getFavoriteCitiesFailure())
    }
};

const addFavCityRequest = () => {
    return { type: types.USER_FAV_CITY_ADD_REQUEST}
};
const addFavCityFailure = () => {
    return { type: types.USER_FAV_CITY_ADD_FAILURE }
};
const addFavCitySuccess = user => {
    return { type: types.USER_FAV_CITY_ADD_SUCCESS, payload: user }
};
export const addFavCity = (city) => async dispatch => {
    dispatch(addFavCityRequest());
    try {
        const res = await axios.post('/api/users/addCity', {
            city
        } ,getConfig());
        dispatch(addFavCitySuccess(res.data));
        dispatch(getFavoriteCities());
        dispatch(notifyUser("success","city added"));
    } catch (err) {
        dispatch(addFavCityFailure())
    }
};

const getFavoriteLandscapesRequest = () => {
    return { type: types.USER_FAV_LANDS_REQUEST}
};
const getFavoriteLandscapesFailure = () => {
    return { type: types.USER_FAV_LANDS_FAILURE }
};
const getFavoriteLandscapesSuccess = lands => {
    return { type: types.USER_FAV_LANDS_SUCCESS, payload: lands }
};
export const getFavoriteLandscapes = () => async dispatch => {
    dispatch(getFavoriteLandscapesRequest());
    try {
        const res = await axios.get('/api/users/favoriteLandscapes', getConfig());
        dispatch(getFavoriteLandscapesSuccess(res.data.favoriteLandscapes));
    } catch (err) {
        dispatch(getFavoriteLandscapesFailure())
    }
};

const addLandscapeRequest = () => {
    return { type: types.USER_FAV_LAND_ADD_REQUEST}
};
const addLandscapeFailure = () => {
    return { type: types.USER_FAV_LAND_ADD_FAILURE }
};
const addLandscapeSuccess = user => {
    return { type: types.USER_FAV_LAND_ADD_SUCCESS, payload: user }
};
export const addLandscape = (landscape) => async dispatch => {
    dispatch(addLandscapeRequest());
    try {
        const res = await axios.post('/api/users/addLandscape', {
            landscape
        } ,getConfig());
        dispatch(addLandscapeSuccess(res.data));
        dispatch(getFavoriteLandscapes());
        dispatch(notifyUser("success","landscape added"));
    } catch (err) {
        dispatch(addLandscapeFailure())
    }
};

const getRequestsRequest = () => {
    return { type: types.GET_USER_REQUESTS_REQUEST}
};
const getRequestsFailure = () => {
    return { type: types.GET_USER_REQUESTS_FAILURE }
};
const getRequestsSuccess = requests => {
    return { type: types.GET_USER_REQUESTS_SUCCESS, payload: requests }
};
export const getRequests = () => async dispatch => {
    dispatch(getRequestsRequest());
    try {
        const res = await axios.get('/api/currentUser/requests',getConfig());
        dispatch(getRequestsSuccess(res.data));
    } catch (err) {
        dispatch(getRequestsFailure())
    }
};
