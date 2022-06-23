import React from 'react'
import "../../Page/Defaultaccount/Defaultaccount.css"
import {Link} from 'react-router-dom'
import logo from "../../assest/logo.png"
import { useState,useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Defaultaccount = () => {
  
  const [accnumber, setaccnumber] = useState("")
  const [oneaccount, setoneaccount] = useState([])
  const navigate = useNavigate()

  const loginhandler = async() =>{
    var data = {
       accountnumber : accnumber
    }
    console.log(data)

  var response  =await axios.post(`http://localhost:5001/account/acc`,data).then((res) => { return res.data})
  setoneaccount(response)
  sessionStorage.setItem("accountnumber", response.accountnumber);
  if(response.accountnumber == accnumber){
    navigate("/main")
  }else{
    alert("Please Enter the valid Account Number")
  }
}

  return (
    <div>
          <div className='container'>
        <img src={logo} alt="logo__pic" />
        <h3 className='heading'>Welcome to our Bank</h3>
        <div className='labelref'>
        <label>Enter your Account no : </label>
        <input type="text" onChange={(e) =>setaccnumber(e.target.value)}/>
        </div>
        <div>
            <button className='button__rect' onClick={loginhandler}>Login</button>
        </div>
    </div>
    </div>
  )
}

export default Defaultaccount