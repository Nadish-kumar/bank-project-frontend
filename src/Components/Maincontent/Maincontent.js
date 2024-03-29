import React from 'react'
import "./Maincontent.css"
import logo from "../../assest/logo.png"
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from "axios"

const Maincontent = () => {
  const [getdata, setgetdata] = useState([])
  useEffect(() => {
    getfunctiondata ()
      }, [])

      var userid = sessionStorage.getItem("accountnumber")

      const getfunctiondata =async() => {
        var iduser = {
           accountnumber : userid
         }
         var getdate = await axios.post(`https://bankreference.herokuapp.com/account/acc`,iduser).then((res) => { return res.data})
         setgetdata(getdate)
       
     
       }
  return (
    <>
    <div>
        <img src={logo} alt="ref__image" />
        <h1 className='heading'>Welcome {getdata.name}</h1>
        <h4>Happy to see you Again</h4>
    </div>
    <div className='main__box'>
        <Link to="/deposit">
      <button className='button__rec'>Deposit</button>
      </Link>
      <Link to="/balance">
      <button className='button__rec'>Balance</button>
      </Link>
      <Link to="/Withdrawal">
      <button className='button__rec'>Withdrawal</button>
      </Link>
      <Link to="/transfer">
      <button className='button__rec'>Transaction</button>
      </Link>
      <Link to="/account">
      <button className='button__rec'>Account details</button>
      </Link>
    </div>
    </>
  )
}

export default Maincontent