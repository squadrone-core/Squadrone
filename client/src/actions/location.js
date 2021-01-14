import * as types from './types';
import history from '../history';
import { getConfig } from '../utils';
import axios from 'axios';
const searchLocationRequest = () => {
    return { type: types.SEARCH_LOCATION_REQUEST }
};
const searchLocationFailure = () => {
    return { type: types.SEARCH_LOCATION_FAILURE }
};
const searchLocationSuccess = locations => {
    return { type: types.SEARCH_LOCATION_SUCCESS, payload: locations }
};
export const searchLocation = (query) => async dispatch => {
    dispatch(searchLocationRequest());
    try {
        const res = await axios.post('/api/locations/search', {
            query
        },getConfig());
        dispatch(searchLocationSuccess(res.data));
    } catch (err) {
        dispatch(searchLocationFailure())
    }
};

const getLocationsWithDronesRequest = () => {
    return { type: types.DRONE_LOCATIONS_REQUEST }
};
const getLocationsWithDronesFailure = () => {
    return { type: types.DRONE_LOCATIONS_FAILURE }
};
const getLocationsWithDronesSuccess = locations => {
    return { type: types.DRONE_LOCATIONS_SUCCESS, payload: locations }
};
export const getLocationsWithDrones = () => async dispatch => {
    dispatch(getLocationsWithDronesRequest());
    try {
        const res = await axios.get('/api/locations/withDrones',getConfig());
        dispatch(getLocationsWithDronesSuccess(res.data));
    } catch (err) {
        dispatch(getLocationsWithDronesFailure())
    }
};

const getLocationInfoRequest = () => {
    return { type: types.GET_LOCATION_REQUEST }
};
const getLocationInfoFailure = () => {
    return { type: types.GET_LOCATION_FAILURE }
};
const getLocationInfoSuccess = location => {
    return { type: types.GET_LOCATION_SUCCESS, payload: location }
};
export const getLocationInfo = (id) => async dispatch => {
    dispatch(getLocationInfoRequest());
    try {
        const res = await axios.get(`/api/locations/${id}`,getConfig());
        dispatch(getLocationInfoSuccess(res.data));
    } catch (err) {
        dispatch(getLocationInfoFailure())
    }
};

const getAvailableDronesRequest = () => {
    return { type: types.GET_FREE_DRONES_REQUEST }
};
const getAvailableDronesFailure = () => {
    return { type: types.GET_FREE_DRONES_FAILURE }
};
const getAvailableDronesSuccess = drones => {
    return { type: types.GET_FREE_DRONES_SUCCESS, payload: drones }
};
export const getAvailableDrones = (lng,lat) => async dispatch => {
    dispatch(getAvailableDronesRequest());
    try {
        const res = await axios.get(`/api/dronesNear?lat=${lat}&lng=${lng}`,getConfig());
        dispatch(getAvailableDronesSuccess(res.data));
    } catch (err) {
        dispatch(getAvailableDronesFailure())
    }
};

const getWeatherRequest = () => {
    return { type: types.GET_WEATHER_REQUEST }
};
const getWeatherFailure = () => {
    return { type: types.GET_WEATHER_FAILURE }
};
const getWeatherSuccess = weather => {
    return { type: types.GET_WEATHER_SUCCESS, payload: weather }
};
export const getWeather = (lat,lng) => async dispatch => {
    dispatch(getWeatherRequest());
    try {

        const res = await axios.post(`/api/weatherDroneIn`,{lat,lng},getConfig());
        console.log(res);
        // const des = res.data.observations.location[0].observation[0].description.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        // const result = {...res.data.observations.location[0].observation[0],description: des.replace(/\s{2,}/g," ")};
        dispatch(getWeatherSuccess(res.data.observations.location[0].observation[0]));

    } catch (err) {
        dispatch(getWeatherFailure())
    }
};

const getSoundRequest = () => {
    return { type: types.GET_SOUND_REQUEST }
};
const getSoundFailure = () => {
    return { type: types.GET_SOUND_FAILURE }
};
const getSoundSuccess = sound => {
    return { type: types.GET_SOUND_SUCCESS, payload: sound }
};
export const getSound = (id) => async dispatch => {
    dispatch(getSoundRequest());
    try {

        const res = await axios({url:`/api/tracks/${id}`,method: 'GET',responseType: 'blob',headers: {
            'Content-Type': 'multipart/form-data'
        }});
        const url = window.URL.createObjectURL(new Blob([res.data], {type : 'audio/mp3'}));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'file.mp3'); //or any other extension
        // document.body.appendChild(link);
        // link.click();
        dispatch(getSoundSuccess(url));
    } catch (err) {
        dispatch(getSoundFailure())
    }
};
