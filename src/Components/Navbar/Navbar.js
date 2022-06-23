import React from 'react'
import "./Navbar.css"
import logo from "../../assest/logo.png"
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const homehandler = () => {
    navigate("/main")
  }
  const logouthandler =() => {
    sessionStorage.clear()
    navigate("/")
  }
  return (
    <div className='container__box'>
      <div>
    <img src={logo} alt="logoimage" className="nav__pic" />
    </div>
   
      <ul>
 
        <li onClick={homehandler}>Home</li>
      
   
        <li onClick={logouthandler}>Logout</li>
        
      </ul>
    
    </div>
  )
}

export default Navbar