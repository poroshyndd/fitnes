import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import store from './app/store'
import App from './App'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

const container = document.getElementById('root')
if (!container) throw new Error('#root not found')

const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
