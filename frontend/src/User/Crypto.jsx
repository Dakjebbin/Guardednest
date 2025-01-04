import { Link } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import cus1 from "../assets/customer01.jpg";
import "../style/dash.css";
import { useState } from "react";
import { useAuthContext } from "../context/auth.context";

export default function Crypto() {
  const [isNavActive, setNavActive] = useState(false);
  const { userData } = useAuthContext();
  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }


  const [amount, setAmount] = useState("");
  const [wallet, setWalletAddress] = useState("");

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
              <p>Welcome  {userData ? userData.fname : "User"}</p>
              <div className="user">
                <img src={cus1} alt="profile-photo" />
              </div>
              </div>
          </div>
          <div className="tab">
            <div className="bank">
              <div className="text5">
                <h2>Withdraw to Crypto</h2>
              </div>

              <form action="">
                <label htmlFor="crypt">Crypto Currency</label>
                <br />
                <select name="" id="crypt">
                  <option value=""></option>
                  <option value="Bitcoin BTC">Bitcoin BTC</option>
                  <option value="Ethereum ETH">Ethereum ETH</option>
                  <option value="Tether USDT">Tether USDT</option>
                </select>
                <br />
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="wallet">Wallet Address</label>
                <input
                  type="text"
                  id="wallet"
                  value={wallet}
                  required
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <button type="button" className="go">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

