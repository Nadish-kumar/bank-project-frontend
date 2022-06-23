import React from 'react'
import "../Createaccount/Createaccount.css";
import logo from "../../assest/logo.png"
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from  "axios"

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

const Createaccount = () => {


  const [open, setOpen] = useState(false);
  const [accnumber, setaccnumber] = useState("")
  
  const handleClose = () => setOpen(false);

  const [name, setname] = useState("")
   const [balance, setbalance] = useState(1000)

  const vals = Math.floor(1000 + Math.random() * 9000);

  var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
console.log(utc)
 

  const openaccount =async () => {
 var data = {
  name : name,
  accountnumber : vals,
  balance : balance,
  date : utc
 }
 console.log(data)
 var response  =await axios.post(`http://localhost:5001/account`,data).then((res) => { return res.data}).catch((err) => { return err})
 setOpen(true)
 setaccnumber(response.accountnumber)
 sessionStorage.setItem("accountnumber", response.accountnumber);
  }
 

console.log(accnumber)
  return (
    <div className='container'>
        <img src={logo} alt="logo__pic" />
        <h3 className='heading'>Create a Account</h3>
        <div className='labelref'>
        <label>Enter your Name : </label>
        <input type="text" onChange={(e) => setname(e.target.value)}/>
        </div>
        <div>
            <button className='button__rect'  onClick={openaccount}>Create a Account</button>
        </div>
        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome {name} 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your account successfully created and account number is {accnumber}

          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Createaccount