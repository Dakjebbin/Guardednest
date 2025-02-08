import { Link } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import cus1 from "../assets/customer01.jpg";
import "../style/dash.css";
import { useState} from "react";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Select() {
  const [isNavActive, setNavActive] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  const { userData } = useAuthContext();
    
  const baseUrl = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true
  
const handleLogout = async () => {
  try {
    const response = await axios.post(`${baseUrl}/auth/logout`, {
      withCredentials: true,
    })

    if (response.status === 200) {
      toast.success("Logout successful");
      window.location.assign("/") 
    } else{
      toast.error("An error occurred. Please try again");
    }
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      console.log(
         error?.response?.data
       );
     } else {
       console.log("reg error => ", error);
     }
  }
}



    function closeNavigation() {
      setNavActive(false);
    }
    return (
      <>
      {userData && (
        <div className="container">
        <div className={`navigation ${isNavActive ? "active" : ""}`}>
          <div className="navbar">
            <img className="logo1" src={logo1} alt="logo" />
            <img
              className="xmark"
              src={xmark}
              alt="logo"
              onClick={closeNavigation}
            />
          </div>

          <ul>
            <li>
              <Link to={`/user`}>
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/withdrawals`}>
                <span className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </span>
                <span className="title">Withdrawals</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/transactions`}>
                <span className="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span className="title">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/settings`}>
                <span className="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span className="title">Settings</span>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout}>
                <span className="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span className="title">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
          
        <div className={`main ${isNavActive ? "active" : ""}`}>
          <div className="topbar">
            <div className="toggle" onClick={toggleNavigation}>
            <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="black"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div>
             
          <div className="user1">
              <p>Welcome  {userData ? userData.fname : "User"}</p>
              <div className="user">
                <img src={cus1} alt="profile-photo" />
              </div>
              </div>
          </div>
          <div className="withdraw">
            <h2>Select Withdrawal Method</h2>
            <div className="method">
              <ul>
                <li>
                  <Link to={"./bank"} className="list">
                    Bank
                  </Link>
                </li>
                <li>
                  <Link to={"./crypto"} className="list">
                    Crypto
                  </Link>
                </li>
                <li>
                  <Link to={"./paypal"} className="list">
                    PayPal
                  </Link>
                </li>
                <li>
                  <Link to={"./cashapp"} className="list">
                    CashApp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
      )}
    </>
  );
}

export default Select;
