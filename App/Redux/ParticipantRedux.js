import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { StartupActions } from '../Redux/StartupRedux';
import moment from 'moment';

import I18n from '../I18n/I18n';
import AppConfig from '../Config/AppConfig';

import Log from '../Utils/Log';
const log = new Log('Redux/SettingsRedux');

/* ------------- Actions and Action Creators ------------- */
const { Types, Creators } = createActions({
  setName: ['participantName'],
  setTyping: ['participantCanType'],
  setImpairment: ['participantCanWalk'],
  setExercises : ["patientExercises"]
});

export const SettingsActions = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  participantName: "",
  participantCanType: null,
  participantCanWalk: null,
  patientExercises:[{id:0,title:"Press add exercise",url:""}]
  
});

/* ------------- Reducers ------------- */

export const setName = (state, { participantName }) => {

  return state.merge({ 
    participantName
  });
  
};

export const setExercises = (state, { patientExercises }) => {
  
  return { 
    ...state,
    patientExercises: [...state.patientExercises, patientExercises]
}
}
export const setImpairment = (state, { participantCanWalk }) => {
  return state.merge({
    participantCanWalk,
  });
};
export const setTyping = (state, { participantCanType}) => {
  return state.merge({
    participantCanType,
  });
};

/* ------------- Hookup Reducers To Actions ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NAME]: setName,
  [Types.SET_IMPAIRMENT]: setImpairment,
  [Types.SET_TYPING]: setTyping,
  [Types.SET_EXERCISES]:setExercises
})
