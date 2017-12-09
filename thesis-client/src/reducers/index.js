import { combineReducers } from 'redux';
import trips from './trips-reducer';
import activeTrip from './active-trip-reducer';
import createTrip from './create-trip-reducer';
import user from './user-reducer';
import navigation from './navigation-reducer';
import loginButton from './login-button-reducer';
import userLocation from './user-location-reducer';
import mapRegion from './map-region-reducer';
import routeCoords from './update-route-coords';


export default combineReducers({
  routeCoords,
  mapRegion,
  userLocation,
  trips,
  activeTrip,
  createTrip,
  user,
  navigation,
  loginButton,
});