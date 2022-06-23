import React from 'react'
import "./Deposit.css"
import logo from "../../assest/logo.png"
import Navbar from '../../Components/Navbar/Navbar'
import { useState,useEffect } from 'react'
import axios from "axios"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { alignProperty } from '@mui/material/styles/cssUtils'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Deposit = () => {
  const [accnumber, setaccnumber] = useState("")
  const [amount, setamount] = useState("")
  const [getdata, setgetdata] = useState([])
  const [open, setOpen] = useState(false);
  const [count, setcount] = useState([]);
  const [targetaccount, settargetaccount] = useState([])
  

  useEffect(() => {
getfunctiondata ()
  }, [])

  const handleClose = () => setOpen(false);
  

  var userid = sessionStorage.getItem("accountnumber")

  var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

  var data = {
    accountnumber : userid,
    amount : amount,
    targetaccount : accnumber,
    date : utc
  }

  const getfunctiondata =async() => {
   var iduser = {
      accountnumber : userid
    }
    var getdate = await axios.post(`http://localhost:5001/account/acc`,iduser).then((res) => { return res.data})
    setgetdata(getdate)
    var dates = {
      date : utc
    }
    var response = await axios.post(`http://localhost:5001/deposit/date`,dates).then((res) => { return res.data})
    setcount(response)
  }
  
  
  const deposithandler = async() => {
    var current  ={
      accountnumber : accnumber
    }
    var res = await axios.post(`http://localhost:5001/account/acc`,current).then((res) => { return res.data})

 if(res.accountnumber == accnumber) {
  
  if(getdata.balance > amount){
    if(count.length <= 3){
      if(amount >= 500 && amount <= 50000){
        var response  = await axios.post(`http://localhost:5001/deposit`,data).then((res) => { return res.data})
        console.log(response)
        var updatebalance = getdata.balance - amount
        const updatedate = {
          balance : updatebalance,
          accountnumber : userid
        }
        
        console.log(updatedate)
        var update = await axios.put(`http://localhost:5001/account/update`,updatedate).then((res) => { return res.data})
        getfunctiondata()
        setOpen(true)
       
    var addedamount = parseInt(res.balance) + parseInt(amount)
    var addedupgrade = {
      accountnumber : accnumber,
      balance : addedamount
    }
    var updateamount = await axios.put(`http://localhost:5001/account/added`,addedupgrade).then((res) => { return res.data})
    console.log(updateamount)
      }else if(amount >= 500 ){
        alert("the maxminum deposit amount is 50000")
   }else{
        alert("the mininum deposit amount is 500")
      }
    
    }else{
      alert("Your deposit limit is over")
    }
  
   }else {
    alert("Your account balance is too low")
   }
 }else{
  alert("Please enter the valid account number")
 }
  
 

    
    



  }
  return (
    <div>
        <Navbar />
        <img src={logo} alt='logopic' />
        <h1 className='heading'>Deposit your amount here</h1>
        <div className='labelref'>
        <label className='label__for'>Enter your Account No : </label>
        <input type="text" value={accnumber} onChange={(e) => setaccnumber(e.target.value)}/>
        </div>
        <div>
            <label className='label__for'>Enter the Amount :</label>
            <input type="number" value={amount} onChange={(e) => setamount(e.target.value)}/>
        </div>
        <button className='button__rect' onClick={deposithandler}>Deposit</button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome {getdata.name} 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your deposit successfull. And your Balance is  {getdata.balance}

          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Deposit