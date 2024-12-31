import { Link } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import { toast } from "react-toastify";

export default function Transactions() {
  const [isNavActive, setNavActive] = useState(false);
  const [imageData, setImageData] = useState([]);
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


  // useEffect(() => {
  //   fetch("http://localhost:3001/userData", {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       token: window.localStorage.getItem("token"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUserData(data.data);
  //       if (data.data === "token expired") {
  //         alert("Token expired login again");
  //         window.localStorage.clear();
  //         window.location.href = "/login";
  //       }
  //     });
  // }, []);

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
            "Access-Control-Allow-Origin": "*",
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
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>

            <div className="user1">
              {/* <p>Welcome {userData.fname}</p> */}
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
