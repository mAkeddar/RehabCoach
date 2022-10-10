import { CommonActions as NavigationActions } from '@react-navigation/native';

import Log from '../Utils/Log';
const log = new Log('Redux/ScreenTrackingMiddleware');

// gets the current screen from navigation state
const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
};

const screenTracking =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (
      action.type !== NavigationActions.NAVIGATE &&
      action.type !== NavigationActions.BACK
    ) {
      return next(action);
    }

    const currentScreen = getCurrentRouteName(getState().nav);
    const result = next(action);
    const nextScreen = getCurrentRouteName(getState().nav);
    if (nextScreen !== currentScreen) {
      try {
        log.debug(`NAVIGATING ${currentScreen} to ${nextScreen}`);
        log.action('GUI', 'ScreenChange', nextScreen);
      } catch (e) {
        log.warn(e);
      }
    }
    return result;
  };

export default screenTracking;
