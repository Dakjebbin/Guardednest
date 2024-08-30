import { Link } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import user from "./assets/user.png";
import xmark from "./assets/xmark.svg";
import "./style/dash.css";
import { useState, useEffect } from "react";

export default function Dash() {
  const [isNavActive, setNavActive] = useState(false);
  const [userData, setUserData] = useState("");
  const [imageData, setImageData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0.0);
  const [profit, setProfit] = useState(0.0);

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
    const token = window.localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3001/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.data === "token expired") {
          alert("Token expired, login again");
          window.localStorage.clear();
          window.location.href = "/login";
        } else {
          setUserData(data.data);
          setBalance(data.data.balance || 0); // Initialize balance
          setProfit(data.data.profit || 0); // Initialize profit
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchImageData = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/imageData", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        if (data.status === "ok") {
          setImageData(data.data);
        } else {
          console.error("Error fetching images:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchImageData();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/transactions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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

          // Update balance and profit using only the latest transaction
          if (fetchedTransactions.length > 0) {
            const transaction = fetchedTransactions[fetchedTransactions.length - 1];
            let newBalance = userData.balance || 0;
            let newProfit = userData.profit || 0;

            if (transaction.status.toLowerCase() === "success") {
              if (transaction.type.toLowerCase() === "profit") {
                newProfit += transaction.amount;
              } else if (transaction.type.toLowerCase() === "withdrawal") {
                newBalance -= transaction.amount;
              } else {
                newBalance += transaction.amount;
              }
            }

            setBalance(newBalance);
            setProfit(newProfit);
          }
        } else {
          console.error("Error fetching transactions:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransactions();
  }, [userData]); // Dependency on userData to ensure proper balance initialization

  return (
    <>
      <div className="container">
        <div className={`navigation ${isNavActive ? "active" : ""}`}>
          {/* Navigation code remains the same */}
        </div>

        <div className={`main ${isNavActive ? "active" : ""}`}>
          <div className="topbar">
            {/* Topbar code remains the same */}
          </div>

          <div className="user-content">
            <div className="cardBox">
              <div className="head">
                <div className="card">
                  <div className="tab-1">
                    <div className="cardName">Balance:</div>
                    <div className="numbers">${balance.toFixed(2)}</div>
                    <div className="bar-1">
                      <button>
                        <Link className="link" to={"./fund"}>
                          Fund
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="tab-2">
                    <div className="cardName">Profit:</div>
                    <div className="numbers">${profit.toFixed(2)}</div>
                    <div className="bar-2">
                      <button>
                        <Link className="link" to={"./user/transfer"}>
                          Transfer
                        </Link>
                      </button>
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
      </div>
    </>
  );
}
