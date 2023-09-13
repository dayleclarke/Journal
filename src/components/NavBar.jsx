import React from 'react'
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-gradient"> 
    {/* Change all occurances of class to className because JSX combiles to JavaScript and class is a protected word in JS as it is used to define a class.  This class will change the background to be blue (bg-primary) with a gradient (bg-gradient) */}
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/" >
            Journal    
        </Link>
        {/* Change the <a> tags to a link component so that is swaps out components rather than creating a new network request to change the webpage Here we also change href to "to" */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active text-light" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/category">
                Select Category
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/entry/0">
                First Entry
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar