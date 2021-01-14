import { combineReducers } from 'redux';
import locationsReducer from './locationsReducer';
import authReducer from './auth';
import usersReducer from './users';
import messageReducer from './message';
import flightReducer from './flight';
import joystickReducer from './joystick';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
  router: routerReducer,
  locations: locationsReducer,
  users: usersReducer,
  flight: flightReducer,
  auth: authReducer,
  message: messageReducer,
  joystick: joystickReducer,
});
