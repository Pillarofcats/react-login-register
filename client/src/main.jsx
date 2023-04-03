//Libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
//Store Context Provder
import StoreContextProvider from "./StoreContextProvider"

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

//App
import App from './App'

//Root render
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </HashRouter>
)
