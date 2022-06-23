import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./Transfer.css"
import logo from "../../assest/logo.png"
import { useState,useEffect } from 'react'
import axios from "axios"

const Transfer = () => {

    const [getdata, setgetdata] = useState([])
    const [deposit, setdeposit] = useState([])
   const [targetaccount, settargetaccount] = useState("")
   const [amount, setamount] = useState("")
   const [accnumber, setaccnumber] = useState("")

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
             setaccnumber(getdata.accountnumber)
             var getdeposit = await axios.post(`https://bankreference.herokuapp.com/transfer/detail`,iduser).then((res) => { return res.data})
             setdeposit(getdeposit)
             
           }

           var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

           var data = {
             accountnumber : userid,
             amount : amount,
             targetaccount : targetaccount,
             date : utc
           }


           const transferhandler =async () => {
            var current  ={
                accountnumber : targetaccount
              }
              var res = await axios.post(`https://bankreference.herokuapp.com/account/acc`,current).then((res) => { return res.data})
          if(res.accountnumber == targetaccount){
            if(getdata.balance > amount) {
                var response  = await axios.post(`https://bankreference.herokuapp.com/transfer`,data).then((res) => { return res.data})
                console.log(response)
                var updatebalance = getdata.balance - amount
                const updatedate = {
                  balance : updatebalance,
                  accountnumber : userid
                }
                
                console.log(updatedate)
                var update = await axios.put(`https://bankreference.herokuapp.com/account/update`,updatedate).then((res) => { return res.data})
                getfunctiondata()
                
               
            var addedamount = parseInt(res.balance) + parseInt(amount)
            var addedupgrade = {
              accountnumber : accnumber,
              balance : addedamount
            }
            var updateamount = await axios.put(`https://bankreference.herokuapp.com/account/added`,addedupgrade).then((res) => { return res.data})
            console.log(updateamount)
            }else{
                alert("Your balance is too low")
            }
          
          }else {
            alert("Pleasse enter the valid account number")
          }
       
           }
       
  return (
    <div>
        <Navbar />
        <div>
        <img src={logo} alt="ref__image" />
        <h1 className='heading'>Welcome {getdata.name}</h1>
        <h4>Transfer your Money ₹{getdata.balance}</h4>
        
        <label className='label__for'>Enter your Account No : </label>
        <input type="text" maxlength="4" size="4" value={accnumber} onChange={(e) => setaccnumber(e.target.value)}/>
      
    
        <label className='label__for'>Enter target Account No : </label>
        <input type="text" maxlength="4" size="4" value={targetaccount} onChange={(e) => settargetaccount(e.target.value)}/>
      
       
        <label className='label__for'>Enter amount : </label>
        <input type="text"  value={amount} onChange={(e) => setamount(e.target.value)}/>
        <button className='button__rect' onClick={transferhandler}>Transfer</button>
  
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