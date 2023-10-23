import React from 'react'
import {FaSignInAlt, FaHome, FaSun, FaUser, FaIdBadge, FaBook, FaSignOutAlt, FaPalette} from "react-icons/fa"
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import logo from '../images/book-education-food-svgrepo-com.svg'


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-gradient"> 
      <div className="container-fluid">
      <Link className="navbar-brand text-light" to="/"><img className="logo" src={logo} alt="Image of Books" /> </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" aria-current="page" to="/"><FaHome className= "m-2"/>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/affirmations"><FaPalette className= "m-2"/>
                Affirmations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/category"><FaSun className= "m-2"/>
                Select Category
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/register"><FaUser className= "m-2"/>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/login"><FaUser className= "m-2"/>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar