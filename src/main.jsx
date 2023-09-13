import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render( //Here I have moved the BrowserRouter wrapper into main. This allows me to use anything that requires a router in this case useNavigate. (All routing must be inside of BrowserRouter)
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
