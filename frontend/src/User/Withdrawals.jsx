import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState, useEffect } from "react";

function Withdraw() {
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  const statusLabels = {
    success: "Success",
    failed: "Failed",
    progress: "Ongoing",
    pending: "Pending",
  };




  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (!username) return;

  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/users/${username}`,
  //         {
  //           method: "GET",
  //           credentials: "include", // Include cookies
  //         }
  //       );

  //       const data = await response.json();
  //       if (data.status === "ok") {
  //         setUserData(data.data); // Set the user data with the fetched user info
  //       } else {
  //         console.error("Error fetching user data:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [username]);

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     const token = window.localStorage.getItem("token");
  //     if (!username) return;
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/transactions/${username}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch transactions");
  //       }

  //       const data = await response.json();
  //       if (data.status === "ok") {
  //         // Filter only withdrawal transactions
  //         const withdrawalTransactions = data.data.filter(transaction =>
  //           transaction.type.toLowerCase().includes("withdrawal")
  //         );
  //         setTransactions(withdrawalTransactions);
  //       } else {
  //         console.error("Error fetching transactions:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchTransactions();
  // }, [username]);


  function closeNavigation() {
    setNavActive(false);
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
              <Link>
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
              {/* <p>Welcome {userData ? userData.fname : "User"}</p> */}
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
    </>
  );
}

export default Withdraw;
