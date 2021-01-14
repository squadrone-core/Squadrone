import  * as types from '../actions/types';

const initialState = {
    isFetching: false,
    suggestions: [],
    suggestionsAll: [],
    request: {},
    flights: [],
    workReqs: [],
    openDrawer: false,
    friends: [],
    cities: [],
    landscapes: [],
    requests: [],
};

export default function(state = {...initialState}, action) {
    switch (action.type) {
        case types.SEARCH_FRIENDS_REQUEST:
            return { ...state, isFetching: true };
        case types.SEARCH_FRIENDS_SUCCESS:
            return { ...state, isFetching: false, suggestions: action.payload };
        case types.SEARCH_FRIENDS_FAILURE:
            return { ...state, isFetching: false };
        case types.SEARCH_USERS_REQUEST:
            return { ...state, isFetching: true };
        case types.SEARCH_USERS_SUCCESS:
            return { ...state, isFetching: false, suggestionsAll: action.payload };
        case types.SEARCH_USERS_FAILURE:
            return { ...state, isFetching: false };
        case types.FRIEND_FLIGHT_REQUEST:
            return { ...state, isFetching: true };
        case types.FRIEND_FLIGHT_SUCCESS:
            return { ...state, isFetching: false, request: action.payload };
        case types.FRIEND_FLIGHT_FAILURE:
            return { ...state, isFetching: false };
        case types.FRIEND_FRIEND_REQUEST:
            return { ...state, isFetching: true };
        case types.FRIEND_FRIEND_SUCCESS:
            return { ...state, isFetching: false, request: action.payload };
        case types.FRIEND_FRIEND_FAILURE:
            return { ...state, isFetching: false };
        case types.FRIEND_WORK_REQUEST:
            return { ...state, isFetching: true };
        case types.FRIEND_WORK_SUCCESS:
            return { ...state, isFetching: false, request: action.payload };
        case types.FRIEND_WORK_FAILURE:
            return { ...state, isFetching: false };
        case types.USER_RECENT_FLIGHTS_REQUEST:
            return { ...state, isFetching: true };
        case types.USER_RECENT_FLIGHTS_SUCCESS:
            return { ...state, isFetching: false, flights: action.payload };
        case types.USER_RECENT_FLIGHTS_FAILURE:
            return { ...state, isFetching: false };
        case types.USER_RECENT_WORK_REQS_REQUEST:
            return { ...state, isFetching: true };
        case types.USER_RECENT_WORK_REQS_SUCCESS:
            return { ...state, isFetching: false, workReqs: action.payload };
        case types.USER_RECENT_WORK_REQS_FAILURE:
            return { ...state, isFetching: false };
        case types.USER_FRIENDS_REQUEST:
            return { ...state, isFetching: true };
        case types.USER_FRIENDS_SUCCESS:
            return { ...state, isFetching: false, friends: action.payload };
        case types.USER_FRIENDS_FAILURE:
            return { ...state, isFetching: false };
        case types.TOGGLE_DRAWER_REQUEST:
            return { ...state, openDrawer: !state.openDrawer };
        case types.USER_FAV_CITIES_SUCCESS:
            return { ...state, isFetching: false, cities: action.payload, suggestions: [] };
        case types.USER_FAV_CITIES_FAILURE:
            return { ...state, isFetching: false };
        case types.USER_FAV_CITIES_REQUEST:
            return { ...state, isFetching: true };
        case types.USER_FAV_CITY_ADD_SUCCESS:
            return { ...state, isFetching: false };
        case types.USER_FAV_CITY_ADD_FAILURE:
            return { ...state, isFetching: false };
        case types.USER_FAV_CITY_ADD_REQUEST:
            return { ...state, isFetching: true };
        case types.USER_FAV_LANDS_SUCCESS:
            return { ...state, isFetching: false, landscapes: action.payload, suggestions: [] };
        case types.USER_FAV_LANDS_FAILURE:
            return { ...state, isFetching: false };
        case types.USER_FAV_LANDS_REQUEST:
            return { ...state, isFetching: true };
        case types.USER_FAV_LAND_ADD_SUCCESS:
            return { ...state, isFetching: false };
        case types.USER_FAV_LAND_ADD_FAILURE:
            return { ...state, isFetching: false };
        case types.USER_FAV_LAND_ADD_REQUEST:
            return { ...state, isFetching: true };
        case types.GET_USER_REQUESTS_SUCCESS:
            return { ...state, isFetching: false, requests: action.payload };
        case types.GET_USER_REQUESTS_FAILURE:
            return { ...state, isFetching: false };
        case types.GET_USER_REQUESTS_REQUEST:
            return { ...state, isFetching: true };
        default:
            return state;
    }
}
