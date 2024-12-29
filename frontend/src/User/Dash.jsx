import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState} from "react";
import xmark from "../assets/xmark.svg";
import logo1 from "../assets/logosmall.png";
import "../style/dash.css";
import { useAuthContext } from "../context/auth.context";
import { toast } from "react-toastify";
import axios from "axios";


export default function Dash() {
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);  
  const { username } = useParams();  
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
    progress: "Processing",
    pending: "Pending",
  };

if (!userData) {
  toast.error("Please login to view this page");
  return
}  

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

console.log(userData);
 
  // Helper function to format the MongoDB timestamp to a short format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
 

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
              <Link to={"/user"}>
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${username}/withdrawals`}>
                <span className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </span>
                <span className="title">Withdrawals</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${username}/transactions`}>
                <span className="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span className="title">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${username}/settings`}>
                <span className="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span className="title">Settings</span>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout} >
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32-32z" />
              </svg>
            </div>

            <div className="user1">
              {/* Check if userData is available before displaying */}
              <p>Welcome {userData.fname}</p>
            </div>
          </div>
          <div className="user-content">
            <div className="cardBox">
              <div className="head">
                <div className="card">
                  <div className="tab-1">
                    <div className="cardName">Balance:</div>
                    <div className="numbers">
                      $
                      {userData.balance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="bar-1">
                      <button className="fund" >
                        <svg
                          className="plus"
                          xmlns="http://www.w3.org/2000/svg"
                          width={"30px"}
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#999"
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 
                        32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 
                        17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 
                        32-32s-14.3-32-32-32l-144 0 0-144z"
                          />
                        </svg>{" "}
                        Fund Account
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="tab-2">
                    <div className="cardName">Profit:</div>
                    <div className="numbers">${userData.profit.toFixed(2)}</div>
                    <div className="bar-2">
                      <Link className="link" to={"./transfer"}>
                        <button className="fund">Transfer</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="details">
              <div className="cardHeader">
                <h2>Transactions</h2>
                <div className="recentTransact">
                  {transactions.length === 0 ? (
                    <p className="noTransact">No Transactions</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <td>Type</td>
                          <td>Amount</td>
                          <td>Status</td>
                          <td>Date Created</td>
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
                                {statusLabels[
                                  transaction.status.toLowerCase()
                                ] || transaction.status}
                              </span>
                            </td>
                            <td>{formatDate(transaction.createdAt)}</td>
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
      </div>
    </>
  );
}
