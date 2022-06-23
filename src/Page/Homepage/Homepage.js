import React from 'react'
import logo from "../../assest/logo.png"
import "../Homepage/Homepage.css"
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='container'>
        <img className='pic__ref' src={logo} alt="logoimage" />
        <div>
          <Link to="/create">
            <button className='button__rect'>Create a account</button>
            </Link>
            <Link to="/default">
            <button className='button__rect'>Already have a account</button>
            </Link>
        </div>
    </div>
  )
}

export default Homepage