import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import exemple from '@reducers/exemple';

const reducers = combineReducers({ exemple });
const persistConfig = { key: 'nomdelakeylocalstorage', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Nom du projet</title>
        </Head>

        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
