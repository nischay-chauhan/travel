import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import {store , persistor} from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react'
// import { NotificationProvider } from './NotificationProvider.jsx' // Removed
// import Notifications from './components/notifications.jsx' // This component might also be removed or refactored later

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <NotificationProvider> // Removed */}
          <App />
        {/* </NotificationProvider> // Removed */}
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
