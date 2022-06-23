import React from 'react'
import logo from "../../assest/logo.png"
import Navbar from '../../Components/Navbar/Navbar'
import { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const Balance = () => {
  const [account, setaccount] = useState("")
  const [open, setOpen] = useState(false);
  const [oneaccount, setoneaccount] = useState([])

  const handleClose = () => setOpen(false);

  const balancehandler = async() => {
    var data = {
      accountnumber : account
    }
    var response  =await axios.post(`https://bankreference.herokuapp.com/account/acc`,data).then((res) => { return res.data})
    setoneaccount(response)
    setOpen(true)
  }
  return (
    <div>
          <Navbar />
        <img src={logo} alt='logopic' />
        <h1 className='heading'>Account Balance </h1>
        <div className='labelref'>
        <label className='label__for'>Enter your Account No : </label>
        <input type="text" onChange={(e) => setaccount(e.target.value)}/>
        </div>
       
        <button className='button__rect' onClick={balancehandler}>Check Balance</button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome {oneaccount.name} 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your account balance is {oneaccount.balance}

          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Balance