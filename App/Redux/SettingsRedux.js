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
  changeLanguage: ['language'],
  chooseCoach: ['coach'],
  completeTutorial: ['tutorialCompleted'],
});

export const SettingsActions = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  language: I18n.currentLocale(), // take over the recognized, or default if not recognized, language locale as initial state
  coach: null,
  tutorialCompleted: false,
  tutorialStep: null,
});

/* ------------- Reducers ------------- */

export const startup = (state, action) => {
  log.debug('Set language:', state.language);
  I18n.locale = state.language;
  moment.locale(state.language);

  return state;
};

export const changeLanguage = (state, { language }) => {
  let twoDigitLanguage = language.substr(0, 2);
  if (AppConfig.config.supportedLanguages.includes(twoDigitLanguage)) {
    log.debug('New language:', language);
    log.action('App', 'Language', language);
    return state.merge({
      language: language.substr(0, 2),
    });
  } else {
    log.debug('Did not set language', language);
    return state;
  }
};

export const chooseCoach = (state, { coach }) => {
  log.debug('New coach:', coach);
  log.action('App', 'Coach', coach);
  return state.merge({
    coach,
  });
};

export const completeTutorial = (state, { tutorialCompleted }) => {
  log.action('App', 'TutorialCompleted');
  return state.merge({
    tutorialCompleted,
  });
};

export const rememberTutorialStep = (state, { routeName }) => {
  if (!state.tutorialCompleted && routeName !== onboardingNav) {
    log.action('App', 'TutorialStep', routeName);
    return state.merge({
      tutorialStep: routeName,
    });
  } else {
    return state;
  }
};

/* ------------- Hookup Reducers To Actions ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [StartupActions.STARTUP]: startup,
  [Types.CHANGE_LANGUAGE]: changeLanguage,
  [Types.CHOOSE_COACH]: chooseCoach,
  [Types.COMPLETE_TUTORIAL]: completeTutorial,
  'Navigation/NAVIGATE': rememberTutorialStep,
});
