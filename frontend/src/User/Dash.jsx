import { Link } from "react-router-dom";
import cus1 from "../assets/customer01.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import xmark from "../assets/xmark.svg";
import logo1 from "../assets/logosmall.png";
import "../style/dash.css";
import { useAuthContext } from "../context/auth.context";
import { toast } from "react-toastify";
import axios from "axios";
// import Withdraw from "./Withdrawals";

export default function Dash() {
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [profit, setProfit] = useState(0);
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  // const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASEURL;
  useEffect(() => {
    if (!userData || !userData._id) {
      toast.error("Please login to view this page");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transaction/getTransact/${userData?._id}`,
          {
            withCredentials: true,
          }
        );

        const transactionData = response?.data?.data || [];

        if (transactionData.length === 0) {
          toast.error("No transactions found");
        }

        // **Filter only successful deposits for balance**
        const successfulDeposits = transactionData.filter(
          (transaction) =>
            transaction.type?.trim() === "Deposit" &&
            transaction.status?.trim() === "Success"
        );

        const totalBalance = successfulDeposits.reduce(
          (acc, deposit) => acc + deposit.amount,
          0
        );

        // **Filter only successful profits for profit calculation**
        const successfulProfits = transactionData.filter(
          (transaction) =>
            transaction.type?.trim() === "Profit" &&
            transaction.status?.trim() === "Success"
        );

        const totalProfit = successfulProfits.reduce(
          (acc, profit) => acc + profit.amount,
          0
        );

        setTransactions(transactionData);
        setBalance(totalBalance);
        setProfit(totalProfit); // <-- Make sure `setProfit` is defined
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error response:", error?.response?.data);
        } else {
          console.log("Error:", error);
        }
      }
    };

    if (userData?._id) {
      fetchTransactions();
    }
  }, [userData, baseUrl]);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const statusLabels = {
    success: "Success",
    failed: "Failed",
    pending: "Pending",
  };

  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Logout successful");
        navigate("/login");
      } else {
        toast.error("An error occurred. Please try again");
      }
    } catch (error) {
      console.error("Logout error:", error?.response?.data || error);
    }
  };

  // Helper function to format the MongoDB timestamp to a short format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    return `${day}/${month}/${year}`;
  };

  const tIcons = {
    Deposit: (
<svg xmlns="http://www.w3.org/2000/svg" width={"50px"} viewBox="0 0 384 512"><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
    ),
    Withdraw: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ff0000" d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
    ),
    Profit: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#005eff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
    )
  }
  
  if (!userData) return null;
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
                <Link to={"/user"}>
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
                <p>Welcome {userData ? userData.fname : "User"}</p>
                <div className="user">
                  <img src={cus1} alt="profile-photo" />
                </div>
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
                        {userData?.balance?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="bar-1">
                        <Link to="/user/fund">
                          <button className="fund">
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
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="tab-2">
                      <div className="cardName">Profit:</div>
                      <div className="numbers">
                        ${userData?.profit?.toFixed(2)}
                      </div>
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
                      <div className="tableWrapper">
                  { /*     <table>
                          <tbody>
                            {transactions.map((transaction, index) => (
                              <tr key={index}>
                                <td> {transaction.type} </td>
                                <td> ${transaction.amount} </td>

                                <tr></tr>
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
                        </table> */}

                        {transactions.map((transaction, index) => (
                          <div key={index} className="transaction">
                            <div className="t-icon">
                            {tIcons[transaction.type] || (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"20px"}>
                                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 272H112c-13.3 0-24-10.7-24-24s10.7-24 24-24h288c13.3 0 24 10.7 24 24s-10.7 24-24 24z"/>
                              </svg>
                              )}
                            </div>

                            <div className="p-1">
                              <h3> {transaction.type} </h3>
                              <p>{formatDate(transaction.createdAt)}</p>
                            </div>

                            <div className="p-2">
                              <h2> ${transaction.amount} </h2>
                              <p>
                                <span
                                  className={`status ${transaction.status.toLowerCase()}`}
                                >
                                  {statusLabels[
                                    transaction.status.toLowerCase()
                                  ] || transaction.status}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
