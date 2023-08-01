import '@styles/globals.scss'
import '@styles/antd-reset.scss'
import 'antd/dist/antd.css'
import Head from 'next/head'

import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

// todo - changer exemple par celui souhaitez
import user from '@reducers/user'

const reducers = combineReducers({ user })
const persistConfig = { key: 'nomdelakeylocalstorage', storage }

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

const persistor = persistStore(store)

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Helmet>
          <title>Yours</title>
          <body className="yoursapp" />
        </Helmet>

        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default App
