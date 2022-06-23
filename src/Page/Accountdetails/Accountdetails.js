import React from 'react'
import "./Accountdetails.css"
import logo from "../../assest/logo.png"
import Navbar from '../../Components/Navbar/Navbar'
import { useEffect,useState } from 'react'
import axios from "axios"

const Accountdetails = () => {

  const [accountdetails, setaccountdetails] = useState([])
 
  useEffect(() => {
    getalldata()
  }, [])

  const userid = sessionStorage.getItem("accountnumber")
 

  var data = {
    accountnumber : userid
  }
  
  const getalldata =async () => {
  var response = await axios.post(`http://localhost:5001/account/acc`,data).then((res) => { return res.data})
  setaccountdetails(response)
  }
  

  return (
    <div>
          <Navbar />
        <div>
        <img src={logo} alt="ref__image" />
        <h1 className='heading'>Welcome {accountdetails.name}</h1>
        <h4>Your Account Number : {accountdetails.accountnumber} </h4>
        <h4>Your Account balance ₹ {accountdetails.balance}</h4>
    </div>
    </div>
  )
}

export default Accountdetails