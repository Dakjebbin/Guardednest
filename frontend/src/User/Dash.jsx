import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";

export default function Dash() {
  const [isNavActive, setNavActive] = useState(false);
  const [userData, setUserData] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0.0);
  const [profit, setProfit] = useState(0.0);
  const { username } = useParams();
  const navigate = useNavigate();

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

  const logOut = async () => {

    try {
      const response = await fetch("http://localhost:3001/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ balance, profit }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        console.log("Balance and profit saved successfully.");
      } else {
        console.error("Error saving balance and profit:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    window.localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return; // Ensure that a username is available
      try {
        const response = await fetch(`http://localhost:3001/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        if (data.status === "ok") {
          setUserData(data.data);
        } else {
          console.error("Error fetching user data:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUserData();
  }, [username]);
  

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!username) return;
      try {
        const response = await fetch(`http://localhost:3001/transactions/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        if (data.status === "ok") {
          const fetchedTransactions = data.data;
          setTransactions(fetchedTransactions);
  
          let newBalance = balance || 0;
          let newProfit = profit || 0;
  
          fetchedTransactions.forEach((transaction) => {
            if (transaction.status.toLowerCase() === "success") {
              if (transaction.type.toLowerCase() === "profit") {
                newProfit += transaction.amount;
              } else if (transaction.type.toLowerCase() === "withdrawal") {
                newBalance -= transaction.amount;
              } else {
                newBalance += transaction.amount;
              }
            }
          });
  
          setBalance(newBalance);
          setProfit(newProfit);
        } else {
          console.error("Error fetching transactions:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTransactions();
  }, [username, balance, profit]);
  
  

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
              <Link to={"/user/withdrawals"}>
                <span className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </span>
                <span className="title">Withdrawals</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/transactions"}>
                <span className="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span className="title">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/settings"}>
                <span className="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span className="title">Settings</span>
              </Link>
            </li>
            <li>
              <Link to={"/login"} onClick={logOut}>
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
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>

            <div className="user1">
              <p>Welcome {userData.fname}</p>
            </div>
          </div>

          <div className="user-content">
            <div className="cardBox">
              <div className="head">
                <div className="card">
                  <div className="tab-1">
                    <div className="cardName">Balance:</div>
                    <div className="numbers">${balance.toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="bar-1">
                        <Link className="link" to={"./fund"}>
                        <button className="fund">
                        <svg className="plus" xmlns="http://www.w3.org/2000/svg" width={"30px"} viewBox="0 0 448 512" >
                        <path fill="#999" 
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 
                        32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 
                        17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 
                        32-32s-14.3-32-32-32l-144 0 0-144z"/>
                        </svg> Fund Account
                      </button>  
                        </Link>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="tab-2">
                    <div className="cardName">Profit:</div>
                    <div className="numbers">${profit.toFixed(2)}</div>
                    <div className="bar-2">
                      
                        <Link className="link" to={"./transfer"}>
                          <button className="fund">Transfer

                          </button>
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
