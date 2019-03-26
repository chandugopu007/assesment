import { combineReducers } from 'redux';
import measurement from './metric';
import weatherLocation from './weatherLocation';

export const state = combineReducers({
    measurements: measurement,
    weatherLocation: weatherLocation
})