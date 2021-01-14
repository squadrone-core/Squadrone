import mapKeys from 'lodash/mapKeys';
import  * as types from '../actions/types';

const initialState = {
    locations: [],
    isFetching: false,
    suggestions: [],
    locationInfo: null,
    drones: [],
    weather: {},
    sound: null,
};

export default function(state = {...initialState}, action) {
    switch (action.type) {
        case types.SEARCH_LOCATION_REQUEST:
            return { ...state, isFetching: true };
        case types.SEARCH_LOCATION_SUCCESS:
            return { ...state, suggestions: action.payload, isFetching: false };
        case types.SEARCH_LOCATION_FAILURE:
            return { ...state, isFetching: false };
        case types.DRONE_LOCATIONS_REQUEST:
            return { ...state, isFetching: true, suggestions: []};
        case types.DRONE_LOCATIONS_SUCCESS:
            return { ...state, locations: action.payload, suggestions: [], isFetching: false };
        case types.DRONE_LOCATIONS_FAILURE:
            return { ...state, isFetching: false };
        case types.GET_LOCATION_REQUEST:
            return { ...state, isFetching: true};
        case types.GET_LOCATION_SUCCESS:
            return { ...state, isFetching: false, locationInfo: action.payload };
        case types.GET_LOCATION_FAILURE:
            return { ...state, isFetching: false };
        case types.GET_FREE_DRONES_REQUEST:
            return { ...state, isFetching: true};
        case types.GET_FREE_DRONES_SUCCESS:
            return { ...state, isFetching: false, drones: action.payload };
        case types.GET_FREE_DRONES_FAILURE:
            return { ...state, isFetching: false };
        case types.GET_WEATHER_REQUEST:
            return { ...state, isFetching: true };
        case types.GET_WEATHER_SUCCESS:
            return { ...state, isFetching: false, weather: action.payload };
        case types.GET_WEATHER_FAILURE:
            return { ...state, isFetching: false };
        case types.GET_SOUND_REQUEST:
            return { ...state, isFetching: true };
        case types.GET_SOUND_SUCCESS:
            return { ...state, isFetching: false, sound: action.payload };
        case types.GET_SOUND_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
}
