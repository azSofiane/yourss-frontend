import '@styles/globals.scss'
import '@styles/antd-reset.scss'
import 'antd/dist/antd.css'

import { Helmet } from 'react-helmet'
import { Provider, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useState, useEffect } from 'react'

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import user from '@reducers/user'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Home from '@components/Home'

const reducers = combineReducers({ user })
const persistConfig = { key: 'yoursapp', storage, blacklist: ['_persist'] }

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

const persistor = persistStore(store)

function App({ Component, pageProps }) {
  const token = useSelector((state) => state.user.token)
  const [isToken, setIsToken] = useState(token)

  useEffect(() => {
    setIsToken(token)
  }, [token])

  return (
    <>
      <Helmet>
        <title>Yours</title>
        <body className="yoursapp" />
      </Helmet>

      {
        isToken ?
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        :
          <Home />
      }
    </>
  )
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App Component={Component} pageProps={pageProps} />
      </PersistGate>
    </Provider>
  )
}
