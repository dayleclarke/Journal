import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from "../useAuth"


const Home = () => {
  const { Auth, setAuth } = useAuth();
  console.log(Auth)
  const logout = async () => {
    setAuth({})
  }
  return (
    <div className="container">
      <h2>Welcome</h2>
      <button className="btn btn-primary mt-3" onClick={logout}>Sign Out</button>
    </div>
  )
}

export default Home