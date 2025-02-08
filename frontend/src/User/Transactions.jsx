import { Link } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import cus1 from "../assets/customer01.jpg";
import "../style/dash.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import { toast } from "react-toastify";

export default function Transactions() {
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const { userData } = useAuthContext();
  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const statusLabels = {
    success: "Success",
    failed: "Failed",
    progress: "Ongoing",
    pending: "Pending",
  };

  
  const baseUrl = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true
  
 useEffect(() => {

  if (!userData || !userData._id) {
    toast.error("Please login to view this page");
    return
  } 
   
  const fetchTransactions = async () => {
    try {
  
      if (!transactions || transactions.length <= 0) {
        toast.error("No transactions found");
    }
  
     const response = await axios.get(`${baseUrl}/transaction/getTransact/${userData?._id}`,{
        withCredentials: true,
      })
  
      setTransactions(response.data.data)
      
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
  
  if (userData?._id) {
    fetchTransactions()
  }
  
  }, [userData])

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


  return (
    <>
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
              <Link to={`/user/`}>
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

          <div className="details">
            <div className="cardHeader">
              <div className="recentTransact">
                {transactions.length === 0 ? (
                  <p className="noTransact">No Transactions</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <td>Transaction</td>
                        
                        <td>Amount</td>
                        <td>Status</td>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td> {transaction.type} </td>
                          <td> ${transaction.amount} </td>
                          <td>
                            <span
                              className={`status ${transaction.status.toLowerCase()}`}
                            >
                              {statusLabels[transaction.status.toLowerCase()] ||
                                transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
