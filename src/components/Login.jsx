import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(()=> {
    userRef.current.focus();
  }, [])

  // Clear the error message if the user changes the email or pwd state
  useEffect(()=> {
    setErrMsg('');
  }, [email, pwd])

  const handleSubmit = async (event) => {
    event.preventDefault();

  }



  return (
    <>
      <div className="container">
        <p ref={errRef} className={errMsg ? "errmsg" :
        "offscreen"} aria-live='assertive'>
          {errMsg}
        </p>
        <section className='form'>
            <h2>Login <FaSignInAlt /></h2>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className= 'form-floating mt-3'>
                <input 
                  type="text"
                  name="email"
                  id="email"
                  placeholder='email address'
                  ref={userRef}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='form-control'
                  required
                />
                <label htmlFor='email'>Email</label>
              </div>
              {/* Password Field */}
              <div className= 'form-floating mt-3'>
                <input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder='Password'
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  className='form-control'
                  required
                />
                <label htmlFor='password'>Password</label>
              </div>
            <button className="btn btn-primary mt-3">Sign In</button>
            </form>
        </section>
        <p>
          Need an account?<br />
          <span>
          <Link className="btn btn-small" to="/register"><FaSignInAlt/> Register</Link>

          </span>
        </p>
      </div>
    </>
  )
}

export default Login