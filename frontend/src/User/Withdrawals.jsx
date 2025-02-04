import { Link } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import cus1 from "../assets/customer01.jpg";
import "../style/dash.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/auth.context";
import { toast } from "react-toastify";
import axios from "axios";

function Withdraw() {
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { userData } = useAuthContext();
  // const navigate = useNavigate();

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  const baseUrl = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true


  
useEffect(() => {
  if (!userData || !userData._id) {
    toast.error("Please login to view this page");
    return;
  }

  // const fetchTransactions = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${baseUrl}/transaction/getTransact/${userData?._id}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     const filteredTransactions = response.data.data.filter(
  //       (transaction) => transaction.type.toLowerCase() === "withdrawal"
  //     );

  //     if (filteredTransactions.length === 0) {
  //       toast.error("No withdrawal transactions found");
  //     }

  //     setTransactions(filteredTransactions);
  //   } catch (error) {
  //     if (error instanceof axios.AxiosError) {
  //       console.log(error?.response?.data);
  //     } else {
  //       console.log("reg error => ", error);
  //     }
  //   }
  // };

  const withdrawalTransactions = async () => {
    try {
      const response = await axios.get(`${baseUrl}/withdrawal/fetchwithdrawals`,{
        withCredentials: true
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
  withdrawalTransactions();
}, [userData]);



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

  const statusLabels = {
    success: "Success",
    failed: "Failed",
    progress: "Ongoing",
    pending: "Pending",
  };


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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32-32z" />
              </svg>
            </div>

            <div className="user1">
              <p>Welcome  {userData ? userData.fname : "User"}</p>
              <div className="user">
                <img src={cus1} alt="profile-photo" />
              </div>
              </div>
          </div>
          <div className="withdraw">
            <Link to={"./select"} className="new">
              NEW WITHDRAWAL
            </Link>
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
                          <td>Payment Method</td>
                          <td>Amount</td>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction, index) => (
                          <tr key={index}>
                            <td className="flex gap-5">
                              {transaction.bank ? (<h1>Bank:-</h1>) : ""}
                              {transaction.paypal ? (<h1>Paypal:-</h1>) : ""}
                              {transaction.wallet ? (<h1>Wallet Address:-</h1>) : ""}
                              {transaction.cashtag ? (<h1>Cashapp:-</h1>) : ""}

                               {transaction.bank || transaction.paypal || transaction.wallet || transaction.cashtag} </td>
                            <td> ${transaction.amount} </td>
                            <td>
                              <span
                                className={`status ${transaction.status}`}
                              >
                                {statusLabels[
                                  transaction.status
                                ] || transaction.status}
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
      )}
    </>
  );
}

export default Withdraw;
