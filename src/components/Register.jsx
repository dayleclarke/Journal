import { useRef, useState, useEffect } from 'react'
import { FaUser, FaInfoCircle, FaCheck, FaTimes, FaSignInAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import axios from "../api/axios";


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = "/users/register"

const Register = () => {
  const usernameRef = useRef(); // Allows focus to be set on a user input area when the component loads.
  const errRef = useRef(); // Set focus on an error so it can be accounced by a screen reader for accessibility.

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false); // tied whether the name validates or not.
  const [usernameFocus, setUsernameFocus] = useState(false); // indicates whether the focus is on the input field or not.
  
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []); // sets the focus on the userName input field when the component loads. 

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]); // used to validate the userName input field. Runs whenever this field is updated. 

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    // console.log(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [username, pwd, matchPwd,]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if submit button enabled with a JS hack
    const v1 = USERNAME_REGEX.test(username)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry")
      return
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ email, username, password: pwd }),
        {
          headers: {"Content-Type" : "application/json"}
        }
      )
      setSuccess(true);
    } 

    catch (err) {
      if (!err?.response) {
        setErrMsg("No server response")
      } 
      else if (err.response?.status === 409) {
        setErrMsg("Username or Email Taken")
      }
      else {
        setErrMsg("Registration Failed")
      }
      errRef.current.focus()
    }
  }
  return (
    <>
      {success ? (
        <section className="container">
          <h2>Success!</h2>
          <p>Congratulations {username} you have successfully registered and now have access to make and manage your own private journal entries and contribute to the master collection of gratitudes and affirmations.</p>
        </section>
      ) : (
        <div className="container">
          <section className='form'>
          {/* used to hold an error if one exists. If there is an error message display the message otherwise hide it off-screen. When focus is on this element it will be accounced to the screen reader.  */}
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
            {errMsg}
          </p>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className= 'form-floating mt-3'>
              <input
                type='text'
                id= 'username'  // matchs with the htmlFor attribute on the label
                name='username'
                autoComplete='off'
                placeholder='Username'
                ref={usernameRef}
                onChange={(e) => setUsername(e.target.value)}
                aria-invalid={validUsername ? 'false' : 'true'}
                aria-describedby='usernameNote'
                onFocus={()=> setUsernameFocus(true)} // sets Username focus to true when the input element receives focus.
                onBlur={()=> setUsernameFocus(false)} // set Username focus to false when it loses focus.
                className='form-control'
                required 
              />
              <label htmlFor="username">
                Username:
                <span className={validUsername ? "valid": "hide"}>
                  <FaCheck />
                </span> 
                <span className={validUsername || !username ? "hide" : "invalid"}>
                  <FaTimes />
                </span> 
              </label>
            </div>
            <p id="usernameNote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores and hyphens allowed.
            </p>
            {/* Email Field */}
            <div className= 'form-floating mt-3'>
              <input
                type='text'
                id= 'email'  // matchs with the htmlFor attribute on the label
                name='email'
                autoComplete='off'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={validEmail ? 'false' : 'true'}
                aria-describedby='emailNote'
                onFocus={()=> setEmailFocus(true)}
                onBlur={()=> setEmailFocus(false)} 
                className='form-control'
                required 
              />
              <label htmlFor="email">
                Email:
                <span className={validEmail ? "valid": "hide"}>
                  <FaCheck />
                </span> 
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FaTimes />
                </span> 
              </label>
            </div>
            <p id="emailNote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              Please enter a valid email address.<br />
            </p>
            {/* Password Field */}
            <div className= 'form-floating mt-3'>
              <input
                type='password'
                id= 'pwd'  
                name='pwd'
                placeholder='Password'
                onChange={(e) => setPwd(e.target.value)}
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby='pwdnote'
                onFocus={()=> setPwdFocus(true)}
                onBlur={()=> setPwdFocus(false)}
                className='form-control'
                required 
              />
              <label htmlFor="pwd">
                Password:
                <span className={validPwd ? "valid": "hide"}>
                  <FaCheck />
                </span> 
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  <FaTimes />
                </span> 
              </label>
            </div>
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
            {/* Match Password Field */}
            <div className= 'form-floating mt-3'>
              <input
                type='password'
                id= 'confirm_pwd'  
                name='confirm_pwd'
                placeholder='Confirm Password'
                onChange={(e) => setMatchPwd(e.target.value)}
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby='pwdnote'
                onFocus={()=> setMatchPwdFocus(true)}
                onBlur={()=> setMatchPwdFocus(false)}
                className='form-control'
                required 
              />
              <label htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPwd? "valid": "hide"}>
                  <FaCheck />
                </span> 
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FaTimes />
                </span> 
              </label>
            </div>
            <p id="confirmnote" className={matchPwdFocus && !validMatch ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              Must match the first password input field.    
            </p>
            <button 
              disabled={!validUsername || !validPwd || !validMatch}
              className="btn btn-primary mt-3">Register</button>
          </form>
          </section>
          <p>
            Already registered?<br />
            <span className="line">
              <Link className="btn btn-small" to="/"><FaSignInAlt/> Log In</Link>
            </span>
          </p>
        </div>
      )}
    </>
  )
}

export default Register
// 

// const Register = () => {

//   

//   // const [user, setUser] = useState({
//   //   firstname: '',
//   //   lastName: '',
//   //   email:'',
//   //   password: '',
//   // });

//   // const handleChange = () => {
//   //   setUser({
//   //     ...user,
//   //     [e.target.name]: e.target.value
//   //   })
//   }

//   function submit(event){
//     event.preventDefault()
//   }
//   return (
//     <div className="container">
//       <section className='form'>
//         <form  onSubmit={submit}>Register
//           {/* First Name */}
//           <div className="form-floating">
//             <input
//               type='text'
//               onChange={handleChange}
//               id= 'firstName'
//               name='firstName'
//               placeholder='First name'
//               className='form-control'
//               required 
//             />
//             <label htmlFor="firstName" className="form-label">
//               First Name:
//             </label>
//           </div>
//           {/* Last Name */}
//           <div className="form-floating">
//             <input
//               type='text'
//               onChange={handleChange}
//               id= 'lastName'
//               name='lastName'
//               placeholder='Last name'
//               value= ""
//               className='form-control'
//               required 
//             />
//             <label htmlFor="lastName" className="form-label">
//               Last Name:
//             </label>
//           </div>
//           {/* Email */}
//           <div className="form-floating">
//             <input
//               type='text'
//               onChange={handleChange}
//               id= 'email'
//               name='email'
//               placeholder='Email'
//               value= ""
//               className='form-control'
//               required 
//             />
//             <label htmlFor="email" className="form-label">
//               Email:
//             </label>
//           </div>
//           {/* Password */}
//           <div className="form-floating">
//             <input
//               type='text'
//               onChange={handleChange}
//               id= 'password'
//               name='password'
//               placeholder='Password'
//               value= ""
//               className='form-control'
//               required 
//             />
//             <label htmlFor="password" className="form-label">
//               Password:
//             </label>
//           </div>
//           <button className="btn btn-primary mt-3">Register</button>
//         </form>
//       </section>
//     </div>
//   )


// export default Register
