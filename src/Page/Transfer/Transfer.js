import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./Transfer.css"
import logo from "../../assest/logo.png"
import { useState,useEffect } from 'react'
import axios from "axios"

const Transfer = () => {

    const [getdata, setgetdata] = useState([])
    const [deposit, setdeposit] = useState([])
    const [withdrawal, setwithdrawal] = useState([])

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
           
             var getdeposit = await axios.post(`https://bankreference.herokuapp.com/deposit/detail`,iduser).then((res) => { return res.data})
             setdeposit(getdeposit)
           }
       
  return (
    <div>
        <Navbar />
        <div>
        <img src={logo} alt="ref__image" />
        <h1 className='heading'>Welcome {getdata.name}</h1>
        <h4>Your Account balance ₹{getdata.balance}</h4>
    </div>
     <div className='table__transfer'>
        <table className='table'>
            <thead>
                <tr>
                    <th>From AC/NO</th>
                    <th>Target AC/No</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    deposit.map((item,index) => (
                        <tr>
                        <td>{item.accountnumber}</td>
                        <td>{item.targetaccount}</td>
                        <td>{item.amount}</td>
                        <td>success</td>
                    </tr>
                    ))
                }
        
            </tbody>
        </table>
     </div>
    </div>
  )
}

export default Transfer