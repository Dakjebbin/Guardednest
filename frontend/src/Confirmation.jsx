import { Link } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import cus1 from "./assets/customer01.jpg";
import "./style/dash.css";
import { useState, useEffect } from "react";

function Confirmation() {
  const [isNavActive, setNavActive] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function copyContent() {
    const inputField = document.getElementById("address");
    inputField.select();
    document.execCommand("copy");
  }

  const logOut = () => {
    window.localStorage.clear();
  };

  const [userData, setUserData] = useState("");
  

  useEffect(() => {
    fetch("http://localhost:3001/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
   
        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
    }, []);


    return (
      <>
        <div className="container">
        <div className={`navigation ${isNavActive ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="#">
                <span className="icon">
                  <img className="logo1" src={logo1} alt="logo" />
                </span>
                <span className="title"></span>
              </Link>
            </li>
            <li>
              <Link to={"/user"} activeClassName="active">
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title ">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/withdrawals"} >
                <span className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </span>
                <span className="title">Withdrawals</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/transactions"} >
                <span className="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span className="title">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/settings"} >
                <span className="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span className="title">Settings</span>
              </Link>
            </li>
            <li>
              <Link to={"/login"} onClick={logOut} >
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
              <div className="user">
                <img src={cus1} alt="profie-photo" />
              </div>
            </div>
          </div> 
           <div className="tab">
            <div className="bank">
              <div className="text5">
                <h2>Withdraw to CashApp</h2>
                <p>SEND 0.10789 BTC TO THE WALLET ADDRESS BELOW</p>
              </div>

              <div className="wallet">
                <span onClick={copyContent}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={'20px'}>
                    <path
                      d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 
                    0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  id="address"
                  value="bc1qk47jxm8rrec2um50ext8s4mqdjr7sp3lnrlzhh"
                />
              </div>
              <div className="buttons">
              <button className="btn3">UPLOAD PAYMENT PROOF</button> <br/>
              <button className="btn4">WAIT FOR CONFIRMATION</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmation;