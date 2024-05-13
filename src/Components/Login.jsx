import '../styles/login.css'
import { FaUser, FaLock } from "react-icons/fa"
import loginService from '../services/login'
import { useState, useEffect } from 'react'
import Cookies from "universal-cookie"
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (event) => {    
        setUsername(event.target.value)
    }
    
    const handlePassword = (event) => { 
        setPassword(event.target.value)
    }    

    const loginEvent = (event) => {
        event.preventDefault()
        loginService
            .login(username, password)
            .then(response => {
                const jwt_token = jwtDecode(response.accessToken)
                cookies.set("jwt_authorization", jwt_token, {
                    expires: new Date(jwt_token.exp * 1000),
                    sameSite: 'None',
                    secure: true
                })
                cookies.set("user", jwt_token.aud, {
                    expires: new Date(jwt_token.exp * 1000),
                    sameSite: 'None',
                    secure: true
                })

                if (cookies.get("user") !== null && cookies.get("jwt_authorization") !== null) {
                    navigate("/home")
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="wrapper">        
            <form onSubmit={loginEvent}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" value={username} onChange={handleUsername} placeholder="Username" required/>
                    <FaUser className='icon'/>
                </div>            
                <div className="input-box">
                    <input type="password" value={password} onChange={handlePassword} placeholder="Password" required/>
                    <FaLock className='icon'/>
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit" className="btn">Login</button>

                <div className="register-link">
                    <p>Don&apos;t have an account? <a href="/register">Register</a></p>
                </div>       
            </form>
        </div>
    )
}

export default Login