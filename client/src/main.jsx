import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import {store , persistor} from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react'
import { NotificationProvider } from './NotificationProvider.jsx'
import Notifications from './components/notifications.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationProvider>
          <App />
    </NotificationProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
