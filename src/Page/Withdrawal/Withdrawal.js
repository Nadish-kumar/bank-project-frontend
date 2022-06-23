import React from 'react'
import "./Withdrawal.css"
import logo from "../../assest/logo.png"
import Navbar from '../../Components/Navbar/Navbar'
import { useState,useEffect } from 'react'
import axios from "axios"
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

const Withdrawal = () => {
  const [amount, setamount] = useState("")
  const [accamount, setaccamount] = useState("")
  const [getdata, setgetdata] = useState([])
  const [open, setOpen] = useState(false);
  const [count, setcount] = useState([]);

  const handleClose = () => setOpen(false);
  var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

  useEffect(() => {
    getfunctiondata ()
      }, [])
  var userid = sessionStorage.getItem("accountnumber")

  var data = {
    accountnumber : userid,
    amount : amount,
     date : utc
  }


      const getfunctiondata =async() => {
        var iduser = {
           accountnumber : userid
         }
         var getdate = await axios.post(`http://localhost:5001/account/acc`,iduser).then((res) => { return res.data})
         setgetdata(getdate)
         setaccamount(getdate.accountnumber)
         var dates = {
          date : utc
        }
        var response = await axios.post(`http://localhost:5001/with/date`,dates).then((res) => { return res.data})
        setcount(response)
        }

console.log(getdata)

  const withdrawalhandler =async () => {
    if(getdata.balance > amount) {
       if(count.length <= 3){
           if(amount >=1000 && amount <= 25000){
            var response  = await axios.post(`http://localhost:5001/with`,data).then((res) => { return res.data})
            console.log(response)
            var updatebalance = getdata.balance - parseInt(amount)
            const updatedate = {
              balance : updatebalance,
              accountnumber : userid
            }
            var update = await axios.put(`http://localhost:5001/account/update`,updatedate).then((res) => { return res.data})
            getfunctiondata()
            setOpen(true)
           }else if(amount >= 1000) {
            alert("The maxminum withdrawal amount is 25000")
           }else {
            alert("The minimum withdrawal amount is 1000")
           }
       } else {
        alert("Your withdrawal limit is over")
       }
    } else {
      alert("The balance in your account is too low")
    }
  }
  return (
    <div>
          <Navbar />
        <img src={logo} alt='logopic' />
        <h1 className='heading'>Withdrawal your amount</h1>
        <div className='labelref'>
        <label className='label__for'>Enter your Account No : </label>
        <input type="text" value={accamount} onChange={(e) => setaccamount(e.target.value)}/>
        </div>
        <div>
            <label className='label__for'>Enter the Amount :</label>
            <input type="number" onChange={(e) => setamount(e.target.value)} />
        </div>
        <button className='button__rect' onClick={withdrawalhandler}>Withdrawal</button>
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

export default Withdrawal