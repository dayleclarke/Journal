import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// The entry point of the App
// React has its own internal DOM. When data is changed it updates the internal DOM. Then it does a DIFF between the intenral DOM and the actual browser DOM and copies across anything that has changed. Here we are creating a root react DOM node. React is a hierarchy of components.  Each component is responsible for rendering its own part of code. Here we are setting the HTML/DOM container where we want the REACT app to be displayed. We then call render and pass it some JSX code. This is the JSX we want to render in that <div>. We wrap the app component in Browser Router.  

ReactDOM.createRoot(document.getElementById('root')).render( //Here I have moved the BrowserRouter wrapper into main. This allows me to use anything that requires a router in this case useNavigate. (All routing must be inside of BrowserRouter)
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
