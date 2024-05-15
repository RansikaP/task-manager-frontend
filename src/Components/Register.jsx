import { useState } from 'react'
import { FaUser, FaLock,FaAddressCard  } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  const navigateTo = useNavigate();
  
  const handleUsername = (event) => {    
    setUsername(event.target.value)
}

const handlePassword = (event) => { 
    setPassword(event.target.value)
}


const handleName = (event) => { 
  setName(event.target.value)
}
const navigateLoginPage = ()=>{
navigateTo('/login')
}
  const handleLoginClick = () => {
    console.log('here')

  };
  return (
      <div className="wrapper">        
          <form onSubmit={handleLoginClick}>
              <h1>Register</h1>
              <div className="input-box">
                  <input type="text" value={username} onChange={handleUsername} placeholder="Username" required/>
                  <FaUser className='icon'/>
              </div>            
              <div className="input-box">
                  <input type="text" value={password} onChange={handlePassword} placeholder="Password" required/>
                  <FaLock className='icon'/>
              </div>

              <div className="input-box">
                  <input type="name" value={name} onChange={handleName} placeholder="Name" required/>
                  <FaAddressCard className='icon'/>
              </div>

              <button type="submit" className="btn">Register</button>

              <div className="register-link">
                  <p>Already have an account? <a href="#" onClick={navigateLoginPage}>Login</a></p>
              </div>       
          </form>
      </div>
  )
}

export default Register