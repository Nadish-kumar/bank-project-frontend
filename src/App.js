import logo from './logo.svg';
import './App.css';
import Homepage from './Page/Homepage/Homepage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Createaccount from './Page/Createaccount/Createaccount';
import Defaultaccount from './Page/Defaultaccount/Defaultaccount';
import Mainpage from './Page/Mainpage/Mainpage';
import Deposit from './Page/Deposit/Deposit';
import Withdrawal from './Page/Withdrawal/Withdrawal';
import Balance from './Page/Balance/Balance';
import Transfer from './Page/Transfer/Transfer';
import Accountdetails from './Page/Accountdetails/Accountdetails';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/create" element={<Createaccount />} />
    <Route path="/default" element={<Defaultaccount />} />
    <Route path="/main" element={<Mainpage />} />
    <Route path="/deposit" element={<Deposit />} />
    <Route path="/Withdrawal" element={<Withdrawal />} />
    <Route path="/balance" element={<Balance />} />
    <Route path="/transfer" element={<Transfer />} />
    <Route path="/account" element={<Accountdetails />} />
    </Routes>
     
     </BrowserRouter>
    
    </div>
  );
}

export default App;
