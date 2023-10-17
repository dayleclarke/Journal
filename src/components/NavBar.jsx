import React from 'react'
import {FaSignInAlt, FaHome, FaUser, FaIdBadge, FaBook, FaSignOutAlt} from "react-icons/fa"
import { Link } from "react-router-dom"
import logo from '../images/book-education-food-svgrepo-com.svg'


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-gradient"> 
      <div className="container-fluid">
      <Link className="navbar-brand text-light" to="/"><img className="logo" src={logo} alt="Image of Books" /> </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active text-light" aria-current="page" to="/"><FaHome />
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