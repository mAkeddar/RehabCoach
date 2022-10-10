import { persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import AsyncStorage from '@react-native-community/async-storage';

import AppConfig from '../Config/AppConfig';
import StartupActions from '../Redux/StartupRedux';
import HydrateActions from '../Redux/HydrateRedux';
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';
import JSONStorage from '../Utils/JSONStorage';

import Log from '../Utils/Log';
const log = new Log('Services/RehydrationServices');

function updateReducers(reduxStore: Object, encryptionKey) {
  const { encryptedReduxStorage, reduxStorageBlacklist } =
    AppConfig.config.storage;

  const startup = () => reduxStore.dispatch(StartupActions.startup());
  const signalStorageLoaded = () =>
    reduxStore.dispatch(HydrateActions.signalStorageLoaded(true));

  let reduxConfig = null;
  let encryptor = null;

  const useJSONStorage = !JSONStorage.isEmpty();

  if (encryptedReduxStorage) {
    // Encrypted storage
    log.debug('Creating encryptor...');
    encryptor = createEncryptor({
      secretKey: encryptionKey,
      onError: function (error) {
        log.error('Error with encryptor:', error);
      },
    });

    reduxConfig = {
      storage: useJSONStorage ? JSONStorage : AsyncStorage,
      blacklist: reduxStorageBlacklist,
      transforms: [immutablePersistenceTransform, encryptor],
    };
  } else {
    // UNencrypted storage
    reduxConfig = {
      storage: useJSONStorage ? JSONStorage : AsyncStorage,
      blacklist: reduxStorageBlacklist,
      transforms: [immutablePersistenceTransform],
    };
  }

  // Check for required reset of the store
  if (AppConfig.config.dev.purgeStoreAtStartup) {
    // Purge store
    persistStore(reduxStore, reduxConfig, () => {
      if (AppConfig.config.dev.purgeStoreAtStartup) {
        log.debug('Purging store...');
        reduxStore.dispatch({ type: 'RESET' });
      }

      signalStorageLoaded();
      startup();
    });
  } else {
    // Regular store startup
    persistStore(reduxStore, reduxConfig, () => {
      signalStorageLoaded();
      startup();
    });
  }
}

export default { updateReducers };
