//Libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

//CSS
import "./css/App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

//App
import App from './App'

//Root render
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <App />
  </HashRouter>
)
